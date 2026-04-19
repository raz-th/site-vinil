'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setFavorites([]);
            setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(doc(db, "users", user.uid), (snap) => {
            if (snap.exists()) {
                setFavorites(snap.data().favorites || []);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);


    const updateFirestoreFavorites = async (newFavorites) => {
        if (!user) return;
        try {
            await setDoc(doc(db, "users", user.uid), {
                favorites: newFavorites
            }, { merge: true });

        } catch (error) {
            console.error("Eroare la actualizarea favoritelor:", error);
        }
    };

    const toggleFavorite = async (product) => {
        if (!user || !product) return;

        const isAlreadyFavorite = favorites.find(item => item.id === product.id);
        let newFavorites;

        if (isAlreadyFavorite) {
            newFavorites = favorites.filter(item => item.id !== product.id);
        } else {
            const favItem = {
                id: String(product.id || ""),
                title: product.title || "Titlu indisponibil",
                artist: product.artist || "Artist necunoscut",
                price: product.price || 0,
                imageUrl: product.images[0].uri || "",
                format: product.format || "Vinil"
            };

            if (!favItem.id) {
                console.error("Eroare: Produsul nu are un ID valid și nu poate fi adăugat la favorite.");
                return;
            }

            newFavorites = [...favorites, favItem];
        }

        setFavorites(newFavorites);
        await updateFirestoreFavorites(newFavorites);
    };

    const removeFromFavorites = async (productId) => {
        const newFavorites = favorites.filter(item => item.id !== productId);
        setFavorites(newFavorites);
        await updateFirestoreFavorites(newFavorites);
    };

    const isFavorite = (productId) => {
        return favorites.some(item => item.id === String(productId));
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            loading,
            toggleFavorite,
            removeFromFavorites,
            isFavorite,
            favoritesCount: favorites.length
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);