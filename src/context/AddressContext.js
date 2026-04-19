'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { useAuth } from "./AuthContext";

const AddressContext = createContext(null);

export const AddressProvider = ({ children }) => {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setAddresses([]);
            setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(doc(db, "users", user.uid), (snap) => {
            if (snap.exists()) {
                setAddresses(snap.data().addresses || []);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const updateFirestoreAddresses = async (newAddresses) => {
        if (!user) return;
        try {
            await setDoc(doc(db, "users", user.uid), { 
                addresses: newAddresses 
            }, { merge: true });
        } catch (err) {
            console.error("Eroare salvare adrese:", err);
        }
    };

    const addAddress = async (address) => {
        const id = Date.now().toString(); // Generăm un ID unic local
        const newAddress = { ...address, id, isDefault: addresses.length === 0 };
        const newAddresses = [...addresses, newAddress];
        await updateFirestoreAddresses(newAddresses);
    };

    const removeAddress = async (id) => {
        const newAddresses = addresses.filter(addr => addr.id !== id);
        // Dacă am șters adresa implicită, o setăm pe prima rămasă ca default
        if (addresses.find(a => a.id === id)?.isDefault && newAddresses.length > 0) {
            newAddresses[0].isDefault = true;
        }
        await updateFirestoreAddresses(newAddresses);
    };

    const setDefaultAddress = async (id) => {
        const newAddresses = addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        }));
        await updateFirestoreAddresses(newAddresses);
    };

    return (
        <AddressContext.Provider value={{ 
            addresses, loading, addAddress, removeAddress, setDefaultAddress,
            defaultAddress: addresses.find(a => a.isDefault) || null
        }}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddresses = () => useContext(AddressContext);