import { defineStore } from "pinia";
import { db } from '@/firebase/config'
import { collection, getDocs, addDoc, serverTimestamp, query, where, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';

export const useInteractionStore = defineStore('interaction', {
    state: () => ({
        interactionInfo: [],
    }),
    getters: {
        getInteractionInfo: (state) =>[...state.interactionInfo],
    },
    actions: {
        async registerInteraction(userid, registered, contentid, categoria, liked, shared){
            console.log("registerInteraction called with userid:", userid, "contentid:", contentid);

            const interactionCollection = collection(db, "user_content_interaction");
            const q = query(interactionCollection, where("userid", "==", userid), where("contentid", "==", contentid));
            const querySnapshot = await getDocs(q);
            let docData = {
                interactionid: uuidv4(),
                userid,
                registered,
                contentid,
                categoria,
                date: serverTimestamp(), // The timestamp on the server
                liked,
                shared
            };
        
            if (querySnapshot.empty) {
                // No existe una interacción para este usuario y contenido, crea una nueva
                try {
                    const docRef = await addDoc(interactionCollection, docData);
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            } else {
                // Ya existe una interacción, actualízala
                querySnapshot.forEach(async (doc) => {
                    docData = {...doc.data(), ...docData};
                    try {
                        await updateDoc(doc.ref, docData);
                        console.log("Document updated with ID: ", doc.id);
                    } catch (e) {
                        console.error("Error updating document: ", e);
                    }
                });
            }
        },
        async getInteraction(userid, contentid) {
            const interactionCollection = collection(db, "user_content_interaction");
            const q = query(interactionCollection, where("userid", "==", userid), where("contentid", "==", contentid));
            const querySnapshot = await getDocs(q);
        
            if (!querySnapshot.empty) {
                return querySnapshot.docs[0];
            }
            return null;
        },
        async updateInteraction(userId, contentId, category, like, share) {
            console.log("updateInteraction called with userid:", userId, "contentid:", contentId);
            const interaction = await this.getInteraction(userId, contentId);
        
            if (interaction) {
                // Si la interacción ya existe, la actualizamos
                const docData = {
                    userid: userId,
                    contentid: contentId,
                    categoria: category,
                    liked: interaction.data().liked || like, // Mantén el like existente si ya existe
                    shared: (interaction.data().shared || 0) + (share ? 1 : 0), // Incrementa los shares si el usuario comparte
                };
        
                try {
                    await updateDoc(interaction.ref, docData);
                    console.log("Document updated with ID: ", interaction.id);
                } catch (e) {
                    console.error("Error updating document: ", e);
                }
            } else {
                // Si la interacción no existe, la creamos
                await this.registerInteraction(userId, true, contentId, category, like, share ? 1 : 0);
            }
        },          
    }
})