'use client';
import { FaRegUser } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoadingPage from "@/components/Loading/LoadingPage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { updateProfile } from "firebase/auth";
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
    const { user, userData } = useAuth();
    const router = useRouter()

    useEffect(() => {
        if (user && userData) {
            setName(user.displayName);
            setPhone(userData.phone || "")
        }
    }, [user, userData])

    const salveaza = async () => {
        console.log(user, name, phone)
        if (user && name.trim() !== "") {
            try {
                await updateProfile(user, { displayName: name.trim() });

                const userDocRef = doc(db, 'users', user.uid);
                await updateDoc(userDocRef, {
                    displayName: name.trim(),
                    phone: phone.trim()
                });
                setSe_editeaza(false);
            } catch (error) {
                console.error(error);
            }

        }
    }

    const anulare = () => {
        setSe_editeaza(false);
        if (user && userData) {
            setName(user.displayName);
            setPhone(userData.phone || "");
        }
    }
    // return <LoadingPage/>
    if (!user || !userData) return null;

    return (
        <>
            {/* <div className='mainHeader'>
                <h3>Setări Profil</h3>
                <p>Gestionează informațiile personale și preferințele de securitate.</p>
            </div> */}
            <div className="accountSetGrid">
                <div className="mainCard_header">
                    <p>Statistica Colecționarului</p>
                    <div className="fadedLine"/>
                </div>
                <div className='mainCard2'>
                     <div className="statisticsContent">
                            <div>
                                <h2>{userData.comenzi?.length || 0}</h2>
                                <p>Comenzi Totale</p>
                            </div>
                            <div>
                                <h2>{userData.wishlist?.length || 0}</h2>
                                <p>Viniluri Salvate</p>
                            </div>
                            {/* <div>
                                <h2>3</h2>
                                <p>Comenzi Totale</p>
                            </div>
                            <div>
                                <h2>5</h2>
                                <p>Comenzi Totale</p>
                            </div> */}
                        </div>
                </div>
                 <div className="mainCard_header">
                    <p>Date personale</p>
                    <div className="fadedLine"/>
                </div>
                <div className='mainCard'>
                    {/* <div className="mainCard_header">
                        <p><FaRegUser /> Date personale</p>
                    </div> */}
                    <CustomInput onChange={(e) => setName(e)} placeholder={"ex: Ion Popescu"} readOnly={!se_editeaza} label={"NUME COMPLET"} type={'text'} value={name} />
                    <CustomInput placeholder={"ex: popescu@gmail.com"} readOnly={true} label={"ADRESĂ EMAIL"} type={'text'} value={user.email} />
                    <CustomInput onChange={(e) => setPhone(e)} placeholder={"ex: 0712345678"} readOnly={!se_editeaza} label={"TELEFON"} type={'phone'} value={phone} />
                    <div style={{ display: 'flex', gap: 10 }}>
                        {se_editeaza && (<button className="edit_btn" style={{ background: "#780000" }} onClick={() => { anulare() }}>Anulează</button>)}
                        <button className="edit_btn" onClick={() => se_editeaza ? salveaza() : setSe_editeaza(true)}>{se_editeaza ? "Salvează" : "Editează"}</button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ClientProfile;
