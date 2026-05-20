'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // <--- Importul tău personalizat
import { useAuth } from "./AuthContext";

const AddressContext = createContext(null);

export const AddressProvider = ({ children }) => {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Încarcă adresele când utilizatorul se conectează
    useEffect(() => {
        if (!user) {
            setAddresses([]);
            setLoading(false);
            return;
        }

        const fetchAddresses = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('profiles')
                    .select('addresses')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;

                if (data) {
                    setAddresses(data.addresses || []);
                }
            } catch (err) {
                console.error("Eroare la preluarea adreselor:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [user]);

    // Salvează modificările în câmpul JSONB din tabela public.profiles
    const updateSupabaseAddresses = async (newAddresses) => {
        if (!user) return;
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ addresses: newAddresses })
                .eq('id', user.id);

            if (error) throw error;

            // Actualizăm și starea locală instant
            setAddresses(newAddresses);
        } catch (err) {
            console.error("Eroare salvare adrese în Supabase:", err.message);
        }
    };

    const addAddress = async (address) => {
        const id = Date.now().toString(); 
        const newAddress = { ...address, id, isDefault: addresses.length === 0 };
        const newAddresses = [...addresses, newAddress];
        await updateSupabaseAddresses(newAddresses);
    };

    const removeAddress = async (id) => {
        let newAddresses = addresses.filter(addr => addr.id !== id);
        
        // Dacă am șters adresa implicită, o setăm pe prima rămasă ca default
        const wasDefault = addresses.find(a => a.id === id)?.isDefault;
        if (wasDefault && newAddresses.length > 0) {
            newAddresses = newAddresses.map((addr, idx) => ({
                ...addr,
                isDefault: idx === 0
            }));
        }
        await updateSupabaseAddresses(newAddresses);
    };

    const setDefaultAddress = async (id) => {
        const newAddresses = addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        }));
        await updateSupabaseAddresses(newAddresses);
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