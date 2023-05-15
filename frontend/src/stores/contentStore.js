import { defineStore } from "pinia";
import { db, storage } from '@/firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import { ref, getDownloadURL } from "firebase/storage";

export const useContentStore = defineStore('content', {
    state: () => ({
        allRsContent: [],
        allCrContent: [],
        allProgramasContent: [],
        allAvContent: [],
        allSrContent: [],
        allArgContent: [],
        allNarContent: [],
        allPerContent: [],

        radioSamanContent: [],
        circularContent: [],
        programasContent: [],

        topTrendingRsContent: [],
        topTrendingCrContent: [],

        audiovisualContent: [],
        sonoroContent: [],
        argContent: [],
        narContent: [],
        perContent: [],
        selectedType: 'all',
    }),

    getters: {
        getRadioSamanContent: (state) =>[...state.radioSamanContent],
        getCircularContent: (state) =>[...state.circularContent],
        getTopTrendingRsContent: (state) => [...state.topTrendingRsContent],
        getTopTrendingCrContent: (state) => [...state.topTrendingCrContent],
        getProgramasContent: (state) => [...state.programasContent],
        getAudiovisualContent: (state) => [...state.audiovisualContent],
        getSonoroContent: (state) => [...state.sonoroContent],
        getArgContent: (state) => [...state.argContent],
        getNarContent: (state) => [...state.narContent],
        getPerContent: (state) => [...state.perContent],
    },

    mutators: {
        setSelectedType(state, type) {
            state.selectedType = type;
        },
    },

    actions: {
        async getRsData() {
            const collectionRef = collection(db, "/contenidos/rs/contenidos_rs");
            const contentSnapshot = await getDocs(collectionRef);
    
            const rsContent = contentSnapshot.docs.map(doc => doc.data());
            this.radioSamanContent = this.sortByDateContent(rsContent);
            this.allRsContent = [...this.radioSamanContent];
    
            // Añade esta línea para asignar los contenidos más populares a topTrendingRsContent
            this.topTrendingRsContent = getTopTrendingContents(this.allRsContent);
        },

        async getProgramasData(){
            const collectionRef = collection(db, "/contenidos/rs/programas_rs");
            const contentSnapshot = await getDocs(collectionRef);
        
            const programasContent = contentSnapshot.docs.map(doc => doc.data());
            this.programasContent = programasContent;
            this.allProgramasContent = [...programasContent]; // Agrega esta línea
        },

        getContentById(id) {
            console.log("Searching for episode with ID:", id);
            const allContent = [
                ...this.allRsContent,
                ...this.allCrContent,
            ];
            console.log("All content:", allContent);
            const filteredEpisodes = allContent.filter(
                (content) => id.toLowerCase() === content.id.toLowerCase()
            );
            console.log("Filtered episodes:", filteredEpisodes);
            return filteredEpisodes.length > 0 ? { ...filteredEpisodes[0] } : null;
        },

        async getCrData(){
            const collectionRef = collection(db, "/contenidos/c/contenidos_c");
            const contentSnapshot = await getDocs(collectionRef);

            const cContent = contentSnapshot.docs.map(doc => doc.data());
            this.circularContent = this.sortByDateContent(cContent)
            this.allCrContent = [...this.circularContent];

            this.audiovisualContent = filterContentByMediaType(this.circularContent, 'audiovisual');
            this.allAvContent = [...this.audiovisualContent];
            this.sonoroContent = filterContentByMediaType(this.circularContent, 'sonoro');
            this.allSrContent = [...this.sonoroContent];
            this.argContent = filterWrittenContentBySubcategory(filterContentByMediaType(this.circularContent, 'escrito'), 'arg');
            this.allArgContent = [...this.argContent];
            this.narContent = filterWrittenContentBySubcategory(filterContentByMediaType(this.circularContent, 'escrito'), 'nar');
            this.allNarContent = [...this.narContent];
            this.perContent = filterWrittenContentBySubcategory(filterContentByMediaType(this.circularContent, 'escrito'), 'per');
            this.allPerContent = [...this.perContent];
            this.topTrendingCrContent = getTopTrendingContents(this.allCrContent);
        },

        async fetchMediaUrl(path) {
            const storageRef = ref(storage, path);
            try {
                const url = await getDownloadURL(storageRef);
                return url;
            } catch (error) {
                console.log(error);
                return null;
            }
        },

        setSelectedType(type) {
            this.selectedType = type;
        },

        filterContentByType(contentArray) {
            return contentArray.filter(content => {
                if (this.selectedType === 'all') {
                    return true;
                }
                return content.type === this.selectedType;
            });
        },

        sortByDateContent(contentArray){
            return contentArray
                .sort((a, b) => convertDate(b.metadatos.fecha) - convertDate(a.metadatos.fecha))
        },

        updateContentList(category, order) {
            // Filtra por tipo
            let filteredRsContent = this.filterContentByType(this.allRsContent);
            let filteredCContent = this.filterContentByType(this.allCrContent);
            let filteredProgramasContent = this.filterContentByType(this.allProgramasContent);

            let filteredAudiovisualContent = this.filterContentByType(this.allAvContent);
            let filteredSonoroContent = this.filterContentByType(this.allSrContent);
            let filteredArgContent = this.filterContentByType(this.allArgContent);
            let filteredNarContent = this.filterContentByType(this.allNarContent);
            let filteredPerContent = this.filterContentByType(this.allPerContent);
        
            // Filtra los contenidos según la categoría seleccionada (si se proporciona).
            if (category) {
                filteredRsContent = filteredRsContent.filter(content => content.categoria.some(cat => cat === category));
                filteredCContent = filteredCContent.filter(content => content.categoria.some(cat => cat === category));
                filteredProgramasContent = filteredProgramasContent.filter(content => content.categoria.some(cat => cat === category));

                filteredAudiovisualContent = filteredAudiovisualContent.filter(content => content.categoria.some(cat => cat === category));
                filteredSonoroContent = filteredSonoroContent.filter(content => content.categoria.some(cat => cat === category));
                filteredArgContent = filteredArgContent.filter(content => content.categoria.some(cat => cat === category));
                filteredNarContent = filteredNarContent.filter(content => content.categoria.some(cat => cat === category));
                filteredPerContent = filteredPerContent.filter(content => content.categoria.some(cat => cat === category));
            }
        
            // Ordena los contenidos según el criterio seleccionado.
            const sortFunction = (a, b) => {
                if (order === 'masVistos') {
                    return b.views - a.views;
                } else if (order === 'masGustados') {
                    return b.likes - a.likes;
                } else if (order === 'masCompartidos') {
                    return b.shares - a.shares;
                }
            };
        
            filteredRsContent.sort(sortFunction);
            filteredCContent.sort(sortFunction);

            filteredAudiovisualContent.sort(sortFunction);
            filteredSonoroContent.sort(sortFunction);
            filteredArgContent.sort(sortFunction);
            filteredNarContent.sort(sortFunction);
            filteredPerContent.sort(sortFunction);
        
            // Limita la lista a los primeros 9 contenidos.
            this.radioSamanContent = filteredRsContent.slice(0, 9);
            this.circularContent = filteredCContent.slice(0, 9);
            this.programasContent = filteredProgramasContent;

            this.audiovisualContent = filteredAudiovisualContent;
            this.sonoroContent = filteredSonoroContent;
            this.argContent = filteredArgContent;
            this.narContent = filteredNarContent;
            this.perContent = filteredPerContent;
        },
        
    }
})

function convertDate(dateString) {
    const monthNames = {
        ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
        jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11
    };

    const [monthStr, year] = dateString.split(" ");
    const month = monthNames[monthStr.toLowerCase()];
    return new Date(year, month);
}

function calculateTrendScore(content) {
    const viewScore = content.views * 5;
    const likeScore = content.likes * 3;
    const shareScore = content.shares * 1;

    return viewScore + likeScore + shareScore;
}

function getTopTrendingContents(contents) {
    const sortedContents = [...contents].sort((a, b) => {
        return calculateTrendScore(b) - calculateTrendScore(a);
    });

    return sortedContents.slice(0, 9);
}

function filterContentByMediaType(contentArray, mediaType) {
    return contentArray.filter(content => content.tipo === mediaType);
}

function filterWrittenContentBySubcategory(contentArray, subcategory) {
    return contentArray.filter(content => content.metadatos.subcategoria === subcategory);
}