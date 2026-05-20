'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; 
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // Încarcă coșul de cumpărături din profilul utilizatorului
    useEffect(() => {
        if (!user) {
            setCart([]);
            setLoading(false);
            return;
        }

        const fetchCart = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('profiles')
                    .select('cart')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;

                if (data) {
                    setCart(data.cart || []);
                }
            } catch (err) {
                console.error("Eroare la preluarea coșului:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [user]);

    // Actualizează coloana jsonb 'cart' din tabela public.profiles
    const updateSupabaseCart = async (newCart) => {
        if (!user) return;
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ cart: newCart })
                .eq('id', user.id);

            if (error) throw error;
        } catch (err) {
            console.error("Eroare salvare coș în Supabase:", err.message);
        }
    };

    const addToCart = async (product) => {
        const existing = cart.find(item => item.productId === product.productId);
        let newCart;
        
        if (existing) {
            newCart = cart.map(item =>
                item.productId === product.productId
                    ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                    : item
            );
        } else {
            newCart = [...cart, { ...product, quantity: product.quantity || 1 }];
        }
        

        setCart(newCart);
        await updateSupabaseCart(newCart);
    };

    const removeFromCart = async (productId) => {
        const newCart = cart.filter(item => item.productId !== productId);
        setCart(newCart);
        await updateSupabaseCart(newCart);
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) return removeFromCart(productId);
        const newCart = cart.map(item =>
            item.productId === productId ? { ...item, quantity } : item
        );
        setCart(newCart);
        await updateSupabaseCart(newCart);
    };

    const clearCart = async () => {
        setCart([]);
        await updateSupabaseCart([]);
    };


    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = subtotal === 0 ? 0 : subtotal >= 200 ? 0 : 15;
    const total = subtotal + shippingCost;

    return (
        <CartContext.Provider value={{
            cart, loading, cartCount,
            subtotal, shippingCost, total,
            addToCart, removeFromCart, updateQuantity, clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);