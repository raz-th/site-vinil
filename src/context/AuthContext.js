'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // <--- Importul tău personalizat
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // 1. Verificăm sesiunea inițială la încărcarea paginii
        const initializeAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    setUser(session.user);
                    await fetchUserData(session.user.id);
                }
            } catch (err) {
                console.error("Eroare inițializare auth:", err.message);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        // 2. Ascultăm modificările stării de autentificare (Sign In, Sign Out, Token Refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                setUser(session.user);
                await fetchUserData(session.user.id);
            } else {
                setUser(null);
                setUserData(null);
            }
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // Funcție ajutătoare pentru a aduce datele extinse din tabela 'profiles'
    const fetchUserData = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) throw error;
            if (data) {
                setUserData(data);
            }
        } catch (err) {
            console.error("Eroare la preluarea datelor de profil:", err.message);
        }
    };

    const logout = async () => {
        const confirmed = window.confirm("Ești sigur că vrei să te deconectezi?");
        if (!confirmed) return;

        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            
            router.push('/');
        } catch (err) {
            console.error("Eroare la deconectare:", err.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, userData, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);