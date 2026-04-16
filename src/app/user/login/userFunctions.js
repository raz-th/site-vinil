import {
    doc,
    setDoc,
    serverTimestamp,
    getDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';

export const createUserProfile = async (user, additionalData = {}) => {
    const userDocRef = doc(db, 'users', user.uid);

    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
        try {
            await setDoc(userDocRef, {
                uid: user.uid,
                displayName: user.displayName || additionalData.fullName || 'Utilizator',
                email: user.email,
                photoURL: user.photoURL || null,
                createdAt: serverTimestamp(),
                role: 'customer',
                preferences: {
                    newsletter: false,
                    favoriteGenres: []
                },
                wishlist: [],
                cart: [],
                ...additionalData
            });
            console.log("Document Firestore creat cu succes.");
        } catch (err) {
            console.error("Eroare la crearea documentului Firestore:", err);
        }
    }
};