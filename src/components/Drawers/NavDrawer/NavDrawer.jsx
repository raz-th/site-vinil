'use client';
import { genuri_muzicale } from '@/config/site';
import React, { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { FaChevronRight, FaRegUser, FaSignOutAlt } from 'react-icons/fa';
import { IoClose, IoMenu } from "react-icons/io5";
import { CgBox } from 'react-icons/cg';
import { usePathname, useRouter } from 'next/navigation';
import LogoutDialog from '@/components/Drawers/LogoutDrawer/LogoutDialog';
import { TransitionLink } from '@/components/TransitionLink';

const formatari = [
    { label: "Toate", href: "toate" },
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
    <svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /></svg>
);

const IconChevron = ({ open }) => (
    <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', stroke: 'currentColor', fill: 'none', strokeWidth: 2, strokeLinecap: 'round' }}>
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const NavDrawer = ({ user, userData, logout }) => {
    const nav = useRouter();
    const pathname = usePathname() || '';
    const pathSegments = pathname.split('/').filter(Boolean);

    const currentFormat = pathSegments[0] || '';
    const currentGenre = pathSegments[2] || '';

    const getActiveIndex = () => {
        const index = formatari.findIndex(item => item.href === currentFormat);
        return index !== -1 ? index : null;
    };

    const [openDrawerItem, setOpenDrawerItem] = useState(getActiveIndex);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        setOpenDrawerItem(getActiveIndex());
        setDrawerOpen(false);
    }, [pathname]);

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
                                        {/* Replaced Profil Button */}
                                        <TransitionLink
                                            href="/user/myaccount"
                                          
                                            className="heroActionBtn"
                                        >
                                            <FaRegUser color='var(--accent2)' size={20} />
                                            Profil
                                        </TransitionLink>

                                        {/* Replaced Comenzi Button */}
                                        <TransitionLink
                                            href="/user/myaccount/orders"
                                           
                                            className="heroActionBtn"
                                        >
                                            <CgBox color='var(--accent2)' size={20} />
                                            Comenzi
                                        </TransitionLink>

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

                                    {/* Replaced Intră Button */}
                                    <TransitionLink
                                        href="/user/login"
                                        className="heroLoginBtn"
                                        onClick={() => setDrawerOpen(false)}
                                    >
                                        Intră
                                    </TransitionLink>
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

                                        <TransitionLink
                                            href={`/${v.href}/genere`}

                                            className={`navDrawerSubLink ${currentFormat === v.href && !currentGenre ? 'navDrawerSubAll' : ''}`}
                                        >
                                            Toate
                                        </TransitionLink>
                                        {genuri_muzicale && Object.keys(genuri_muzicale).map((g, j) => (
                                            <TransitionLink
                                                key={j}

                                                href={`/${v.href}/genere/${g}`}
                                                className={`navDrawerSubLink ${currentFormat === v.href && currentGenre === g ? 'navDrawerSubAll' : ''}`}
                                            >
                                                {genuri_muzicale[g].label}
                                            </TransitionLink>
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