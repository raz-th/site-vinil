'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; 
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

        const fetchFavorites = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('profiles')
                    .select('wishlist')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;

                if (data) {
                    setFavorites(data.wishlist || []);
                }
            } catch (err) {
                console.error("Eroare la preluarea favoritelor:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [user]);


    const updateSupabaseFavorites = async (newFavorites) => {
        if (!user) return;
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ wishlist: newFavorites })
                .eq('id', user.id);

            if (error) throw error;
        } catch (error) {
            console.error("Eroare la actualizarea favoritelor în Supabase:", error.message);
        }
    };

    const toggleFavorite = async (product) => {
        if (!user || !product) return;

        const productIdStr = String(product.id || "");
        const isAlreadyFavorite = favorites.find(item => item.id === productIdStr);
        let newFavorites;

        if (isAlreadyFavorite) {
            newFavorites = favorites.filter(item => item.id !== productIdStr);
        } else {

            const favItem = {
                id: productIdStr,
                title: product.title || "Titlu indisponibil",
                artist: product.artist || "Artist necunoscut",
                price: product.price || 0,
                imageUrl: product.cover_image || product.thumb || "",
                format: product.format || "Vinil"
            };

            if (!favItem.id) {
                console.error("Eroare: Produsul nu are un ID valid și nu poate fi adăugat la favorite.");
                return;
            }

            newFavorites = [...favorites, favItem];
        }

        setFavorites(newFavorites);
        await updateSupabaseFavorites(newFavorites);
    };

    const removeFromFavorites = async (productId) => {
        const newFavorites = favorites.filter(item => item.id !== String(productId));
        setFavorites(newFavorites);
        await updateSupabaseFavorites(newFavorites);
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