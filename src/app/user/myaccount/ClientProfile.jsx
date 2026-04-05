'use client';
import { FaRegUser } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import React from 'react';
import { useAuth } from '@/context/AuthContext';

const CustomInput = ({
    label,
    type,
    placeholder,
    icon,
    value,
    onChange,
    required = true,
    name,
}) => {
    return (
        <div className="input-group">
            <label className="input-label">{label}</label>
            <div className="input-wrapper">
                <input
                    type={type}
                    placeholder={placeholder}
                    className="custom-input"
                    required={required}
                    value={value}
                    onChange={onChange}
                    name={name}
                />
            </div>
        </div>
    );
};


const ClientProfile = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <>
            <div className='mainHeader'>
                <h3>Setări Profil</h3>
                <p>Gestionează informațiile personale și preferințele de securitate.</p>
            </div>
            <div className="accountSetGrid">
                <div className='mainCard'>
                    <div className="mainCard_header">
                        <p><FaRegUser /> Date personale</p>
                    </div>
                    <CustomInput label={"NUME COMPLET"} type={'text'} value={user.displayName} />
                    <CustomInput label={"ADRESĂ EMAIL"} type={'text'} value={user.email} />
                    <CustomInput label={"TELEFON"} type={'phone'}  />
                </div>
                <div className='mainCard'>
                    <div className="mainCard_header">
                        <p><IoStatsChart /> Statistica Colecționarului</p>

                        <div className="statisticsContent">
                            <div>
                                <h2>12</h2>
                                <p>Comenzi Totale</p>
                            </div>
                            <div>
                                <h2>28</h2>
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
                </div>
            </div>
        </>
    );
}

export default ClientProfile;
