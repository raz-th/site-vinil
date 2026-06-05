'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoadingPage from "@/components/Loading/LoadingPage";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import CustomInput from '@/components/Drawers/ProfileEditDrawer/CustomInput';
import ProfileEditDrawer from '@/components/Drawers/ProfileEditDrawer/ProfileEditDrawer';


const ClientProfile = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const { user, userData, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (user && userData) {
            setName(userData.full_name || userData.display_name || "");
            setPhone(userData.phone || "");
        }
    }, [user, userData]);


    const handleProfileUpdate = async ({ name: updatedName, phone: updatedPhone }) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: updatedName,
                    display_name: updatedName,
                    phone: updatedPhone
                })
                .eq('id', user.id);

            if (error) throw error;


            setName(updatedName);
            setPhone(updatedPhone);
            
            router.refresh();
            return true; 
        } catch (error) {
            console.error("Eroare la actualizarea profilului:", error.message);
            return false;
        }
    };

    if (loading) return <LoadingPage />;
    if (!user || !userData) return null;

    return (
        <div className="accountSetGrid">
            {/* STATISTICI */}
            <div className="mainCard_header">
                <p>Statistica Colecționarului</p>
                <div className="fadedLine" />
            </div>
            <div className='mainCard2'>
                <div className="statisticsContent">
                    <div>
                        <h2>{userData?.comenzi?.length || 0}</h2>
                        <p>Comenzi Totale</p>
                    </div>
                    <div>
                        <h2>{userData?.wishlist?.length || 0}</h2>
                        <p>Viniluri Salvate</p>
                    </div>
                </div>
            </div>
            
            {/* DATE PERSONALE */}
            <div className="mainCard_header">
                <p>Date personale</p>
                <div className="fadedLine" />
            </div>
            <div className='mainCard'>
                <CustomInput readOnly={true} label={"NUME COMPLET"} type={'text'} value={name} />
                <CustomInput readOnly={true} label={"ADRESĂ EMAIL"} type={'text'} value={user?.email || ''} />
                <CustomInput readOnly={true} label={"TELEFON"} type={'phone'} value={phone || 'Nespecificat'} />
                
                <div style={{ display: 'flex', marginTop: '10px' }}>

                    <ProfileEditDrawer 
                        initialName={name} 
                        initialPhone={phone} 
                        onSave={handleProfileUpdate} 
                    />
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;