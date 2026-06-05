'use client';
import React, { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { IoMdClose } from 'react-icons/io';
import CustomInput from './CustomInput';
import './ProfileDrawer.css';
import useIsMobile from '@/components/useIsMobile';

const ProfileEditDrawer = ({ initialName, initialPhone, onSave }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempName, setTempName] = useState(initialName);
    const [tempPhone, setTempPhone] = useState(initialPhone);
    const isMobile = useIsMobile()

    useEffect(() => {
        if (isOpen) {
            setTempName(initialName);
            setTempPhone(initialPhone);
        }
    }, [isOpen, initialName, initialPhone]);

    const handleSubmit = async () => {
        if (tempName.trim() === "") return;
        
        const succes = await onSave({ name: tempName.trim(), phone: tempPhone.trim() });
        if (succes) {
            setIsOpen(false);
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
        setTempName(initialName);
        setTempPhone(initialPhone);
    };

    return (
        <Drawer.Root open={isOpen} onOpenChange={setIsOpen} dismissible={true} >
            <Drawer.Trigger asChild>
                <button className="edit_btn">
                    Editează profilul
                </button>
            </Drawer.Trigger>
            <Drawer.Portal >
                <Drawer.Overlay className="pd-overlay" onClick={handleCancel} />
                <Drawer.Content className="pd-content" >
                    <div className="pd-container">
                        
     
                        <div className="pd-handle" />
                        
                        <div className="pd-header">
                            <Drawer.Title className="pd-title">
                                Modificare profil
                            </Drawer.Title>
                            <button className="pd-close-btn" onClick={handleCancel} aria-label="Închide">
                                <IoMdClose size={18} />
                            </button>
                        </div>
                        
                        <Drawer.Description className="pd-description">
                            Actualizează datele contului tău de colecționar.
                        </Drawer.Description>
                        
                        <div className="pd-form-body">
                            <CustomInput 
                                onChange={(val) => setTempName(val)} 
                                placeholder="ex: Ion Popescu" 
                                readOnly={false} 
                                label="NUME COMPLET" 
                                type="text" 
                                value={tempName} 
                            />
                            <CustomInput 
                                onChange={(val) => setTempPhone(val)} 
                                placeholder="ex: 0712345678" 
                                readOnly={false} 
                                label="TELEFON" 
                                type="phone" 
                                value={tempPhone} 
                            />
                        </div>
                        
                        <div className="pd-actions">
                            <button onClick={handleSubmit} className="pd-btn-primary">
                                Salvează modificările
                            </button>
                            <button onClick={handleCancel} className="pd-btn-secondary">
                                Anulează
                            </button>
                        </div>

                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default ProfileEditDrawer;