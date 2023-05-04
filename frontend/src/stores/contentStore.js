import { defineStore } from "pinia";
import { db } from '@/firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export const useContentStore = defineStore('content', {
    state: () => ({
        allRsContent: [],
        allCrContent: [],
        radioSamanContent: [],
        circularContent: [],
    }),

    getters: {
        getRadioSamanContent: (state) =>[...state.radioSamanContent],
        getCircularContent: (state) =>[...state.circularContent]
    },

    actions: {
        async getRsData(){
            const collectionRef = collection(db, "/contenidos/rs/contenidos_rs");
            const contentSnapshot = await getDocs(collectionRef);

            const rsContent = contentSnapshot.docs.map(doc => doc.data());
            console.log(rsContent)
            this.radioSamanContent = this.sortByDateContent(rsContent)
            this.allRsContent = [...this.radioSamanContent];
        },

        async getCrData(){
            const collectionRef = collection(db, "/contenidos/c/contenidos_c");
            const contentSnapshot = await getDocs(collectionRef);

            const cContent = contentSnapshot.docs.map(doc => doc.data());
            this.circularContent = this.sortByDateContent(cContent)
            this.allCrContent = [...this.circularContent];
        },

        sortByDateContent(contentArray){
            return contentArray
                .sort((a, b) => convertDate(b.metadatos.fecha) - convertDate(a.metadatos.fecha))
        },

        updateContentList(category, order) {
            // Utiliza el contenido original almacenado en el estado.
            let filteredRsContent = [...this.allRsContent];
            let filteredCContent = [...this.allCrContent];
        
            // Filtra los contenidos según la categoría seleccionada (si se proporciona).
            if (category) {
                filteredRsContent = filteredRsContent.filter(content => content.categoria.some(cat => cat === category));
                filteredCContent = filteredCContent.filter(content => content.categoria.some(cat => cat === category));
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