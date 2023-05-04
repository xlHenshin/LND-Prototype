import { defineStore } from "pinia";
import { db } from '@/firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export const useContentStore = defineStore('content', {
    state: () => ({
        allRsContent: [],
        allCrContent: [],
        allProgramasContent: [],
        radioSamanContent: [],
        circularContent: [],
        programasContent: [],
        topTrendingRsContent: [],
        selectedType: 'all',
    }),

    getters: {
        getRadioSamanContent: (state) =>[...state.radioSamanContent],
        getCircularContent: (state) =>[...state.circularContent],
        getTopTrendingRsContent: (state) => [...state.topTrendingRsContent],
        getProgramasContent: (state) => [...state.programasContent],
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
            console.log(this.topTrendingRsContent)
        },

        async getProgramasData(){
            const collectionRef = collection(db, "/contenidos/rs/programas_rs");
            const contentSnapshot = await getDocs(collectionRef);
        
            const programasContent = contentSnapshot.docs.map(doc => doc.data());
            this.programasContent = programasContent;
            this.allProgramasContent = [...programasContent]; // Agrega esta línea
        },

        async getCrData(){
            const collectionRef = collection(db, "/contenidos/c/contenidos_c");
            const contentSnapshot = await getDocs(collectionRef);

            const cContent = contentSnapshot.docs.map(doc => doc.data());
            this.circularContent = this.sortByDateContent(cContent)
            this.allCrContent = [...this.circularContent];
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
        
            // Filtra los contenidos según la categoría seleccionada (si se proporciona).
            if (category) {
                filteredRsContent = filteredRsContent.filter(content => content.categoria.some(cat => cat === category));
                filteredCContent = filteredCContent.filter(content => content.categoria.some(cat => cat === category));
                filteredProgramasContent = filteredProgramasContent.filter(content => content.categoria.some(cat => cat === category));
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
        
            // Limita la lista a los primeros 9 contenidos.
            this.radioSamanContent = filteredRsContent.slice(0, 9);
            this.circularContent = filteredCContent.slice(0, 9);
            this.programasContent = filteredProgramasContent;
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
    console.log("Contenidos recibidos en getTopTrendingContents:", contents);
    const sortedContents = [...contents].sort((a, b) => {
        return calculateTrendScore(b) - calculateTrendScore(a);
    });

    return sortedContents.slice(0, 9);
}