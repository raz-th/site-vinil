'use client';
import { genuri_muzicale } from '@/config/site';
import React, { useState } from 'react';
import { Drawer } from 'vaul';
import { FaChevronRight, FaRegUser, FaSignOutAlt } from 'react-icons/fa';
import { IoClose, IoMenu } from "react-icons/io5";
import { CgBox } from 'react-icons/cg';
import { useRouter } from 'next/navigation';
import LogoutDialog from '@/components/Drawers/LogoutDrawer/LogoutDialog';

const formatari = [
    { label: "Viniluri", href: "vinil" },
    { label: "CD-uri", href: "cd" },
    { label: "Casete audio", href: "casete" },
    { label: "DVD", href: "dvd" },
    { label: "Blu-ray", href: "bluray" },
    { label: "Minidisc", href: "minidisc" },
    { label: "Box set", href: "boxset" },
    { label: "SACD", href: "sacd" },
];



const IconMenu = () => (
    <svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
);

const IconChevron = ({ open }) => (
    <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', stroke: 'currentColor', fill: 'none', strokeWidth: 2, strokeLinecap: 'round' }}>
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const NavDrawer = ({ user, userData, logout }) => {
    const nav = useRouter();
    const [openDrawerItem, setOpenDrawerItem] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawerItem = (i) => {
        setOpenDrawerItem(prev => prev === i ? null : i);
    };

    return (
        <Drawer.Root
            direction="right"
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            modal={true}

        >
            <Drawer.Trigger className='navHamburger navActionBtn'>
                {drawerOpen ? <IoClose /> : <IoMenu />}
            </Drawer.Trigger>

            <Drawer.Portal>
                <Drawer.Overlay className='NavDrawerOverlay' />
                <Drawer.Content aria-describedby={undefined} className='NavDrawerContent' >
                    <Drawer.Title className="sr-only">Meniu Navigare</Drawer.Title>
                    <div aria-hidden className="drawerHandle" />
                    <div className="NavDrawerScrollArea" >
                        <div className='navDrawerHero'>
                            {/* <FaChevronRight onClick={() => setDrawerOpen(false)} color={'var(--accent1)'} size={20} /> */}
                            {user ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', width: '100%' }}>
                                    <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                                        {user.photoURL ? (
                                            <img className='ic' style={{ padding: 0 }} src={user.photoURL} alt="Avatar" />
                                        ) : (
                                            <div className='ic'><FaRegUser /></div>
                                        )}
                                        <div className="heroUserInfo">
                                            <h3>{userData?.full_name || userData?.display_name || user?.email?.split('@')[0]}</h3>
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', width: '100%', gap: 10, justifyContent: 'space-between' }}>
                                        <button
                                            onClick={() => { nav.push("/user/myaccount"); setDrawerOpen(false); }}
                                            className="heroActionBtn"
                                        >
                                            <FaRegUser color='var(--accent2)' size={20} />
                                            Profil
                                        </button>
                                        <button
                                            onClick={() => { nav.push("/user/orders"); setDrawerOpen(false); }}
                                            className="heroActionBtn"
                                        >
                                            <CgBox color='var(--accent2)' size={20} />
                                            Comenzi
                                        </button>
                                        <LogoutDialog className="heroActionBtn" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', gap: 15, alignItems: 'center', width: '100%' }}>
                                        <div className='ic'>
                                            <FaRegUser size={20} />
                                        </div>
                                        <div className="heroGuestInfo">
                                            <p>Intră în universul tău muzical.</p>
                                            <span>Autentifică-te sau creează un cont</span>
                                        </div>
                                    </div>
                                    <button className="heroLoginBtn" onClick={() => { nav.push("/user/login"); setDrawerOpen(false); }}>
                                        Intră
                                    </button>
                                </>
                            )}
                        </div>

                        {/* ── LISTA DE CATEGORII ── */}
                        <ul className="navDrawerList" >
                            {formatari.map((v, i) => (
                                <li key={i} className="navDrawerSection">
                                    <button
                                        className="navDrawerLink navDrawerToggle"
                                        onClick={() => toggleDrawerItem(i)}
                                        aria-expanded={openDrawerItem === i}
                                    >
                                        {v.label}
                                        <IconChevron open={openDrawerItem === i} />
                                    </button>

                                    {/* subgenuri */}
                                    <div className={`navDrawerSub ${openDrawerItem === i ? 'open' : ''}`}>
                                        <a href={`/${v.href}/genere`} className="navDrawerSubLink navDrawerSubAll">
                                            Toate
                                        </a>
                                        {genuri_muzicale && Object.keys(genuri_muzicale).map((g, j) => (
                                            <a key={j} href={`/${v.href}/genere/${g}`} className="navDrawerSubLink">
                                                {genuri_muzicale[g].label}
                                            </a>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}

export default NavDrawer;