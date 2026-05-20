'use client';
import { FaRegUser } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoadingPage from "@/components/Loading/LoadingPage";
import { supabase } from "@/lib/supabase"; // <--- Importul tău personalizat
import { useRouter } from "next/navigation";

const CustomInput = ({
    label,
    type,
    placeholder,
    readOnly = true,
    value,
    onChange,
    required = true,
    name,
}) => {
    return (
        <div className="input-group">
            <label className="input-label">{label}</label>
            <div className="input-wrapper" style={readOnly ? {} : { borderBottom: 'var(--accent2) 1px solid' }}>
                <input
                    type={type}
                    placeholder={readOnly ? "" : placeholder}
                    className="custom-input"
                    required={required}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    name={name}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
};

const ClientProfile = () => {
    const [se_editeaza, setSe_editeaza] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const { user, userData, loading } = useAuth();
    const router = useRouter();

    // Redirecționare dacă utilizatorul nu este conectat (după ce s-a terminat verificarea sesiunii)
    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    // Sincronizare stări locale cu datele din Supabase Auth & Profiles
    useEffect(() => {
        if (user && userData) {
            setName(userData.full_name || userData.display_name || "");
            setPhone(userData.phone || "");
        }
    }, [user, userData]);

    const salveaza = async () => {
        if (user && name.trim() !== "") {
            try {
                // Actualizăm tabela public.profiles din Supabase
                const { error } = await supabase
                    .from('profiles')
                    .update({
                        full_name: name.trim(),
                        display_name: name.trim(),
                        phone: phone.trim()
                    })
                    .eq('id', user.id);

                if (error) throw error;

                setSe_editeaza(false);
                
                // Opțional: Reîmprospătează pagina sau contextul pentru a vedea datele noi reflectate instant
                router.refresh();
            } catch (error) {
                console.error("Eroare la actualizarea profilului:", error.message);
            }
        }
    };

    const anulare = () => {
        setSe_editeaza(false);
        if (user && userData) {
            setName(userData.full_name || userData.display_name || "");
            setPhone(userData.phone || "");
        }
    };

    // Afișează scheletul de încărcare dacă datele sunt în curs de preluare
    if (loading) {
        return <LoadingPage />;
    }

    if (!user || !userData) return null;

    return (
        <>
            <div className="accountSetGrid">
                <div className="mainCard_header">
                    <p>Statistica Colecționarului</p>
                    <div className="fadedLine" />
                </div>
                <div className='mainCard2'>
                    <div className="statisticsContent">
                        <div>
                            {/* Folosește structura ta de comenzi; dacă e masiv JSONB sau tabelă legată, fallback la array.length */}
                            <h2>{userData?.comenzi?.length || 0}</h2>
                            <p>Comenzi Totale</p>
                        </div>
                        <div>
                            {/* În scriptul inițial, favoritele au fost denumite 'wishlist' în tabelă */}
                            <h2>{userData?.wishlist?.length || 0}</h2>
                            <p>Viniluri Salvate</p>
                        </div>
                    </div>
                </div>
                
                <div className="mainCard_header">
                    <p>Date personale</p>
                    <div className="fadedLine" />
                </div>
                <div className='mainCard'>
                    <CustomInput 
                        onChange={(e) => setName(e)} 
                        placeholder={"ex: Ion Popescu"} 
                        readOnly={!se_editeaza} 
                        label={"NUME COMPLET"} 
                        type={'text'} 
                        value={name} 
                    />
                    <CustomInput 
                        placeholder={"ex: popescu@gmail.com"} 
                        readOnly={true} 
                        label={"ADRESĂ EMAIL"} 
                        type={'text'} 
                        value={user?.email || ''} 
                    />
                    <CustomInput 
                        onChange={(e) => setPhone(e)} 
                        placeholder={"ex: 0712345678"} 
                        readOnly={!se_editeaza} 
                        label={"TELEFON"} 
                        type={'phone'} 
                        value={phone} 
                    />
                    
                    <div style={{ display: 'flex', gap: 10 }}>
                        {se_editeaza && (
                            <button className="edit_btn" style={{ background: "#780000" }} onClick={anulare}>
                                Anulează
                            </button>
                        )}
                        <button className="edit_btn" onClick={() => se_editeaza ? salveaza() : setSe_editeaza(true)}>
                            {se_editeaza ? "Salvează" : "Editează"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientProfile;