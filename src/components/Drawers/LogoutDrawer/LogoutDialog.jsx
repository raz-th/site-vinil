import React from 'react';
import { Drawer } from 'vaul';
import { FaSignOutAlt } from 'react-icons/fa';
import './LogoutDialog.css'; // Fișierul nou creat

const LogoutDialog = ({ onLogout, className }) => {
    return (
        <Drawer.Root dismissible={true}>
            <Drawer.Trigger asChild>
                <button className={className || "logout-btn"}>
                    <FaSignOutAlt className="dropdown-icon" />
                    <span>Ieșire</span>
                </button>
            </Drawer.Trigger>
            <Drawer.Portal>
                 <Drawer.Overlay className="ld-overlay" />
                 <Drawer.Content className="ld-content" aria-describedby={undefined}>
                    <div className="ld-container">
                        <div className="ld-handle" />
                        
                        <div className="ld-header">
                            <Drawer.Title className="ld-title">Sigur dorești să ieși?</Drawer.Title>
                            <p className="ld-description">
                                Va trebui să te reconectezi pentru a accesa colecția ta de viniluri favorite și comenzile active.
                            </p>
                        </div>
                        
                        <div className="ld-actions">
                            <button onClick={onLogout} className="ld-btn-primary">
                                Da, deconectează-mă
                            </button>
                            <Drawer.Close asChild>
                                <button className="ld-btn-secondary">
                                    Rămâi în cont
                                </button>
                            </Drawer.Close>
                        </div>
                    </div>
                 </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}

export default LogoutDialog;