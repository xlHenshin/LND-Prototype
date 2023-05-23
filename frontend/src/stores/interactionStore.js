import { defineStore } from "pinia";
import { db } from '@/firebase/config'
import { collection, getDocs, addDoc, serverTimestamp, query, where, updateDoc, doc, getDoc, increment } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';

export const useInteractionStore = defineStore('interaction', {
    state: () => ({
        interactionInfo: [],
    }),
    getters: {
        getInteractionInfo: (state) =>[...state.interactionInfo],
    },
    actions: {
        async registerInteraction(userid, registered, contentid, categoria, interactionType){
            const interactionCollection = collection(db, "user_content_interaction");
            const q = query(interactionCollection, where("userid", "==", userid), where("contentid", "==", contentid));
            const querySnapshot = await getDocs(q);
            let docData = {
                interactionid: uuidv4(),
                userid,
                registered,
                contentid,
                categoria,
                date: serverTimestamp(),
                liked: interactionType === 'like',
                shared: interactionType === 'share'
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
            await this.updateCategoryProfile(userid, categoria, interactionType);
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
        async updateInteraction(userId, contentId, category, interactionType) {
            const interaction = await this.getInteraction(userId, contentId);
        
            if (interaction) {
                const docData = {
                    userid: userId,
                    contentid: contentId,
                    categoria: category,
                    liked: interactionType === 'like' ? true : interaction.data().liked,
                    shared: interactionType === 'share' ? increment(1) : interaction.data().shared,
                };
        
                try {
                    await updateDoc(interaction.ref, docData);
                    console.log("Document updated with ID: ", interaction.id);
                } catch (e) {
                    console.error("Error updating document: ", e);
                }
            } else {
                // Si la interacción no existe, la creamos
                await this.registerInteraction(userId, true, contentId, category, interactionType);
            }
            await this.updateCategoryProfile(userId, category, interactionType);
        },

        async updateCategoryProfile(userId, categories, interactionType) {
            const userRef = doc(db, "users", userId);
            const userSnapshot = await getDoc(userRef);
        
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
        
                categories.forEach(async (category) => {
                    let categoryData = userData.category_profile[category];
                    // Update category data
                    if (interactionType === 'like') categoryData.likes += 1;
                    if (interactionType === 'share') categoryData.shares += 1;
                    if (interactionType === 'view') categoryData.views += 1;
                });
                
                let totalInteractions = 0;
        
                // Calculate the total interactions for all categories
                Object.keys(userData.category_profile).forEach((cat) => {
                    const catData = userData.category_profile[cat];
                    totalInteractions += (catData.views * 2) + (catData.likes * 3) + catData.shares;
                });
        
                // Recalculate scores based on the new total interactions
                let scoreSum = 0;
                Object.keys(userData.category_profile).forEach((cat) => {
                    const catData = userData.category_profile[cat];
                    const catInteractions = (catData.views * 2) + (catData.likes * 3) + catData.shares;
                    catData.score = (catInteractions / totalInteractions) * 100;
                    scoreSum += catData.score;
                });
        
                // Ensure the sum of all category scores is 100
                const scoreAdjustment = 100 - scoreSum;
                categories.forEach(category => {
                    userData.category_profile[category].score += scoreAdjustment / categories.length;
                });
        
                await updateDoc(userRef, { category_profile: userData.category_profile });
            } else {
                console.log(`No user found with id: ${userId}`);
            }
        },
        async updateContentInteraction(contentId, medio, interactionType) {
            // Determina la colección de contenidos correcta basada en el campo 'medio'
            let contentCollectionPath = '';
            switch(medio) {
                case 'rs':
                    contentCollectionPath = 'contenidos/rs/contenidos_rs';
                    break;
                case 'c':
                    contentCollectionPath = 'contenidos/c/contenidos_c';
                    break;
                default:
                    console.log('Medio desconocido: ', medio);
                    return;
            }
        
            // Actualiza las estadísticas de interacción en tiempo real en el documento de contenido correspondiente
            const contentDocRef = doc(db, `${contentCollectionPath}/${contentId}`);
            
            if (interactionType === 'view') {
                const incrementViews = increment(1);
                await updateDoc(contentDocRef, {views: incrementViews});
            }
        
            if (interactionType === 'like') {
                const incrementLikes = increment(1);
                await updateDoc(contentDocRef, {likes: incrementLikes});
            }
        
            if (interactionType === 'share') {
                const incrementShares = increment(1);
                await updateDoc(contentDocRef, {shares: incrementShares});
            }
        }                                             
    }
})