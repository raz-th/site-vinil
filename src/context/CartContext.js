'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setCart([]);
            setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(doc(db, "users", user.uid), (snap) => {
            if (snap.exists()) {
                setCart(snap.data().cart || []);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const updateFirestoreCart = async (newCart) => {
        if (!user) return;
        await updateDoc(doc(db, "users", user.uid), { cart: newCart });
    };

    const addToCart = async (product) => {
        const existing = cart.find(item => item.productId === product.productId);
        let newCart;
        if (existing) {
            newCart = cart.map(item =>
                item.productId === product.productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            newCart = [...cart, { ...product, quantity: 1 }];
        }
        setCart(newCart);
        await updateFirestoreCart(newCart);
    };

    const removeFromCart = async (productId) => {
        const newCart = cart.filter(item => item.productId !== productId);
        setCart(newCart);
        await updateFirestoreCart(newCart);
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) return removeFromCart(productId);
        const newCart = cart.map(item =>
            item.productId === productId ? { ...item, quantity } : item
        );
        setCart(newCart);
        await updateFirestoreCart(newCart);
    };

    const clearCart = async () => {
        setCart([]);
        await updateFirestoreCart([]);
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