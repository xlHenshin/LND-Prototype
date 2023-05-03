import { defineStore } from "pinia";
import { db } from '@/firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export const useContentStore = defineStore('content', {
    state: () => ({
        radioSamanContent: [],
    }),

    getters: {
        getRadioSamanContent: (state) =>[...state.radioSamanContent]
    },

    actions: {
        async getRsData(){
            const collectionRef = collection(db, "/contenidos/rs/contenidos_rs");
            console.log("Referencia creada: ", collectionRef)
            const contentSnapshot = await getDocs(collectionRef);
            console.log("Snapshot obtenido : ", collectionRef)

            const rsContent = contentSnapshot.docs.map(doc => doc.data());
            console.log("Contenido mapeado: ", rsContent)
            this.radioSamanContent=rsContent
        },
    }
})