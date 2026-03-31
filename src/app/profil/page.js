'use client';

import React, { useState } from 'react';
import './ProfilPage.css';

// ── Sub-components ──────────────────────────────────────────

const NavIcon = ({ d, extraPath }) => (
    <svg viewBox="0 0 24 24" strokeWidth="1.8" className="nav-icon">
        <path d={d} />
        {extraPath && <path d={extraPath} />}
    </svg>
);

const Toast = ({ message, visible }) => (
    <div className={`toast ${visible ? 'show' : ''}`}>{message}</div>
);

const VinylAvatar = ({ initials }) => (
    <div className="avatar-wrap">
        <div className="vinyl-disc">
            <div className="avatar-photo">{initials}</div>
        </div>
    </div>
);

const StatCell = ({ num, label }) => (
    <div className="stat-cell">
        <span className="stat-num">{num}</span>
        <span className="stat-label">{label}</span>
    </div>
);

const SectionCard = ({ title, action, children, delay }) => (
    <div className={`section-card fade-in ${delay || ''}`}>
        <div className="section-header">
            <span className="section-title">{title}</span>
            {action}
        </div>
        {children}
    </div>
);

const InfoField = ({ label, value }) => (
    <div className="info-field">
        <div className="info-label">{label}</div>
        <div className="info-value">{value}</div>
    </div>
);

const DiscIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const OrderRow = ({ title, meta, price, status }) => {
    const statusClass = {
        Expediat: 'status-expediat',
        Livrat: 'status-livrat',
        'În procesare': 'status-procesare',
    }[status] || '';

    return (
        <div className="order-row">
            <div className="order-thumb-placeholder"><DiscIcon /></div>
            <div className="order-info">
                <div className="order-title">{title}</div>
                <div className="order-meta">{meta}</div>
            </div>
            <div className="order-price">{price}</div>
            <div className={`order-status ${statusClass}`}>{status}</div>
        </div>
    );
};

const FavItem = ({ title, artist, bgGradient, discColor, onAdd }) => (
    <div className="fav-item" onClick={onAdd}>
        <div className="fav-cover">
            <div style={{ position: 'absolute', inset: 0, background: bgGradient }} />
            <div className="disc-inner" style={{ position: 'relative', zIndex: 1, background: discColor || '#c8571a' }} />
        </div>
        <div className="fav-title">{title}</div>
        <div className="fav-artist">{artist}</div>
    </div>
);

const AddressCard = ({ name, lines, isDefault, onEdit, onSetDefault, onDelete }) => (
    <div className={`address-card ${isDefault ? 'default' : ''}`}>
        {isDefault && <span className="address-default-badge">Principală</span>}
        <div className="address-name">{name}</div>
        <div className="address-lines">
            {lines.map((l, i) => <span key={i}>{l}<br /></span>)}
        </div>
        <div className="address-actions">
            <button className="address-btn" onClick={onEdit}>Editează</button>
            {isDefault
                ? <button className="address-btn" style={{ color: '#888' }} onClick={onDelete}>Șterge</button>
                : <button className="address-btn" style={{ color: 'var(--accent-gold)' }} onClick={onSetDefault}>Setează principală</button>
            }
        </div>
    </div>
);

// ── Data ────────────────────────────────────────────────────

const ORDERS = [
    { title: 'ABBA – Love Songs', meta: 'Comandă #7841 · 22 Mar 2026 · Vinil LP', price: '89,00 Lei', status: 'Expediat' },
    { title: "Elvis Presley – You'll Never Walk Alone", meta: 'Comandă #7802 · 14 Mar 2026 · Vinil LP', price: '120,00 Lei', status: 'Livrat' },
    { title: 'Janis Joplin – Pearl', meta: 'Comandă #7769 · 5 Mar 2026 · Vinil LP', price: '145,00 Lei', status: 'Livrat' },
    { title: 'Julio Iglesias – De Niña a Mujer', meta: 'Comandă #7740 · 25 Feb 2026 · Vinil LP', price: '75,00 Lei', status: 'În procesare' },
];

const FAVORITES = [
    { title: 'Uriah Heep', artist: 'Demons and Wizards', bgGradient: 'radial-gradient(circle at 30% 30%, #4a3a3a,#111)' },
    { title: 'ZZ Top', artist: 'Afterburner', bgGradient: 'radial-gradient(circle at 70% 30%, #2a3a4a,#111)' },
    { title: 'Edith Piaf', artist: 'Inoubliable', bgGradient: 'radial-gradient(circle at 50% 70%, #3a2a1a,#111)', discColor: '#b8922a' },
    { title: 'Eurythmics', artist: 'Revenge', bgGradient: 'radial-gradient(circle at 30% 70%, #1a3a2a,#111)', discColor: '#2a8a5a' },
];

const ADDRESSES = [
    {
        name: 'Alexandru Munteanu',
        lines: ['Str. Florilor nr. 14, Ap. 3', 'Sector 2, București', '020021, România', '+40 721 234 567'],
        isDefault: true,
    },
    {
        name: 'Serviciu',
        lines: ['Bd. Magheru nr. 32', 'Sector 1, București', '010332, România', '+40 721 234 567'],
        isDefault: false,
    },
];

const FOOTER_COLS = [
    { title: 'Magazin', links: ['Noutăți', 'Cele mai vândute', 'Oferte vinil', 'Pre-comenzi'] },
    { title: 'Servicii clienți', links: ['Întrebări frecvente', 'Informații livrare', 'Returnări', 'Contact'] },
    { title: 'Genuri', links: ['Rock', 'Jazz & Blues', 'Soul & Funk', 'Hip-Hop', 'Clasică', 'Muzică Românească'] },
    { title: 'Despre noi', links: ['Povestea noastră', 'Artiști parteneri', 'Blog', 'Termeni și condiții'] },
];

// ── Main Page ────────────────────────────────────────────────

const Page = () => {
    const [toast, setToast] = useState({ visible: false, message: '' });

    const showToast = (message) => {
        setToast({ visible: true, message });
        setTimeout(() => setToast(t => ({ ...t, visible: false })), 2600);
    };

    return (
        <div className="profilePage">
            <div className="profilePageInner">


                {/* BREADCRUMB */}
                {/* <div className="breadcrumb">
        <a href="#">Acasă</a>
        <span>›</span>
        <strong>Contul meu</strong>
      </div> */}
                <nav className="breadcrumb">
                    <a href="/">Acasă</a>
                    <span>/</span>
                    <a >Profil</a>
                </nav>

                {/* PAGE GRID */}
                <div className="page">

                    {/* SIDEBAR */}
                    <aside className="sidebar">
                        <div className="profile-card fade-in">
                            <div className="profile-header">
                                <VinylAvatar initials="DM" />
                                <div>
                                    <div className="profile-name">David Marinescu</div>
                                    <div className="profile-since">Colecționar din 2019</div>
                                </div>
                            </div>
                            <div className="profile-stats">
                                <StatCell num="47" label="Viniluri" />
                                <StatCell num="12" label="Comenzi" />
                                <StatCell num="23" label="Favorite" />
                            </div>
                        </div>

                        <div className="sidebar-nav fade-in delay-1">
                            <div className="sidebar-nav-title">Navigare cont</div>
                            {[
                                { label: 'Date personale', icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>, active: true },
                                { label: 'Comenzile mele', icon: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></>, badge: '2' },
                                { label: 'Lista de dorințe', icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /> },
                                { label: 'Adresele mele', icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></> },
                                { label: 'Metode de plată', icon: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></> },
                            ].map(({ label, icon, active, badge }) => (
                                <a key={label} href="#" className={active ? 'active' : ''}>
                                    <svg viewBox="0 0 24 24" strokeWidth="1.8" className="nav-icon">{icon}</svg>
                                    {label}
                                    {badge && <span className="nav-badge">{badge}</span>}
                                </a>
                            ))}
                            <a href="#" style={{ color: '#c0746a' }}>
                                <svg viewBox="0 0 24 24" strokeWidth="1.8" className="nav-icon">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Deconectare
                            </a>
                        </div>
                    </aside>

                    {/* MAIN */}
                    <main className="main-content">

                        {/* Date personale */}
                        <SectionCard
                            title="Date personale"
                            action={<button className="edit-btn" onClick={() => showToast('Editare activată!')}>Editează</button>}
                        >
                            <div className="info-grid">
                                <InfoField label="Prenume" value="David" />
                                <InfoField label="Nume" value="Marinescu" />
                                <InfoField label="Email" value="david.mari@email.ro" />
                                <InfoField label="Telefon" value="+40 721 234 567" />
                                <InfoField label="Data nașterii" value="14 Martie 1988" />
                                <InfoField label="Gen preferat" value="Rock / Jazz & Blues" />
                            </div>
                        </SectionCard>

                        {/* Comenzi recente */}
                        <SectionCard
                            title="Comenzi recente"
                            delay="delay-1"
                            action={<a href="#" className="section-link">Vezi toate →</a>}
                        >
                            {ORDERS.map((o, i) => <OrderRow key={i} {...o} />)}
                        </SectionCard>

                        {/* Favorite */}
                        <SectionCard
                            title="Lista de dorințe"
                            delay="delay-2"
                            action={<a href="#" className="section-link">Vezi toate →</a>}
                        >
                            <div className="favorites-grid">
                                {FAVORITES.map((f, i) => (
                                    <FavItem key={i} {...f} onAdd={() => showToast('Adăugat în coș!')} />
                                ))}
                            </div>
                        </SectionCard>

                        {/* Adrese */}
                        <SectionCard
                            title="Adresele mele"
                            delay="delay-3"
                            action={<button className="edit-btn" onClick={() => showToast('Adresă nouă adăugată!')}>+ Adaugă</button>}
                        >
                            <div className="address-block">
                                {ADDRESSES.map((addr, i) => (
                                    <AddressCard
                                        key={i}
                                        {...addr}
                                        onEdit={() => showToast('Editare adresă!')}
                                        onSetDefault={() => showToast('Setată ca principală!')}
                                        onDelete={() => showToast('Adresă ștearsă!')}
                                    />
                                ))}
                            </div>
                        </SectionCard>

                    </main>
                </div>

            </div>
        </div>
    );
};

export default Page;