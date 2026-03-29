'use client';
import { useState } from 'react';
import './ProfilPage.css';

const IconUser = () => (
  <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const IconPackage = () => (
  <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
);
const IconMapPin = () => (
  <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IconSettings = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);
const IconLogOut = () => (
  <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);
const IconPlus = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round' }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const IconDisc = () => (
  <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round' }}><circle cx="24" cy="24" r="20"/><circle cx="24" cy="24" r="8"/><circle cx="24" cy="24" r="2"/></svg>
);

// ── date mock ──
const user = {
  name: 'Alexandru Ionescu',
  email: 'alex.ionescu@email.com',
  phone: '0721 234 567',
  memberSince: 'Ianuarie 2024',
  initials: 'AI',
};

const comenzi = [
  { id: '#VN-2024-001', date: '12 Mar 2024', status: 'livrat', items: '3 produse', total: '189.99 Lei' },
  { id: '#VN-2024-002', date: '28 Feb 2024', status: 'procesare', items: '1 produs', total: '64.99 Lei' },
  { id: '#VN-2024-003', date: '10 Ian 2024', status: 'livrat', items: '5 produse', total: '312.50 Lei' },
  { id: '#VN-2023-048', date: '22 Dec 2023', status: 'anulat', items: '2 produse', total: '94.00 Lei' },
];

const wishlistItems = [
  { id: 1, artist: 'Pink Floyd', title: 'The Dark Side of the Moon', price: '149.99 Lei', img: null },
  { id: 2, artist: 'Miles Davis', title: 'Kind of Blue', price: '134.99 Lei', img: null },
  { id: 3, artist: 'Led Zeppelin', title: 'Led Zeppelin IV', price: '119.99 Lei', img: null },
  { id: 4, artist: 'Nina Simone', title: 'I Put a Spell on You', price: '89.99 Lei', img: null },
];

const adrese = [
  {
    id: 1, default: true,
    name: 'Acasă',
    text: 'Str. Mihai Eminescu nr. 14, Ap. 3\nSector 2, București\n020074',
  },
  {
    id: 2, default: false,
    name: 'Serviciu',
    text: 'Bd. Unirii nr. 56, Et. 4\nSector 3, București\n030821',
  },
];

const tabs = [
  { id: 'cont', label: 'Date cont', icon: <IconUser /> },
  { id: 'comenzi', label: 'Comenzi', icon: <IconPackage /> },
  { id: 'wishlist', label: 'Wishlist', icon: <IconHeart /> },
  { id: 'adrese', label: 'Adrese', icon: <IconMapPin /> },
  { id: 'setari', label: 'Setări', icon: <IconSettings /> },
];

// ── sectiuni ──

const SectiuneCont = () => (
  <div>
    <div className="profileSectionHeader">
      <h2 className="profileSectionTitle">Date cont</h2>
      <span className="profileSectionLine" />
    </div>
    <div className="profileFormGrid">
      <div className="profileFormGroup">
        <label className="profileLabel">Prenume</label>
        <input className="profileInput" defaultValue="Alexandru" />
      </div>
      <div className="profileFormGroup">
        <label className="profileLabel">Nume</label>
        <input className="profileInput" defaultValue="Ionescu" />
      </div>
      <div className="profileFormGroup">
        <label className="profileLabel">Email</label>
        <input className="profileInput" type="email" defaultValue={user.email} />
      </div>
      <div className="profileFormGroup">
        <label className="profileLabel">Telefon</label>
        <input className="profileInput" defaultValue={user.phone} />
      </div>
      <div className="profileFormGroup full">
        <label className="profileLabel">Parolă nouă</label>
        <input className="profileInput" type="password" placeholder="Lasă gol pentru a păstra parola actuală" />
      </div>
      <div className="profileFormGroup full">
        <label className="profileLabel">Confirmă parola</label>
        <input className="profileInput" type="password" placeholder="Repetă parola nouă" />
      </div>
    </div>
    <button className="profileSaveBtn">Salvează modificările</button>
  </div>
);

const SectiuneComenzi = () => (
  <div>
    <div className="profileSectionHeader">
      <h2 className="profileSectionTitle">Comenzile mele</h2>
      <span className="profileSectionLine" />
    </div>
    {comenzi.length === 0 ? (
      <div className="emptyState">
        <IconDisc />
        <p>Nu ai plasate nicio comandă încă.</p>
        <a href="/toate/genere" className="emptyStateBtn">Explorează colecția</a>
      </div>
    ) : (
      <div className="ordersList">
        {comenzi.map((o) => (
          <div key={o.id} className="orderCard">
            <div className="orderCardHeader">
              <span className="orderNum">{o.id}</span>
              <span className="orderDate">{o.date}</span>
              <span className={`orderStatus ${o.status}`}>{o.status}</span>
            </div>
            <div className="orderCardBody">
              <span className="orderItems">{o.items}</span>
              <span className="orderTotal">{o.total}</span>
              <button className="orderViewBtn">Vezi detalii →</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const SectiuneWishlist = () => {
  const [items, setItems] = useState(wishlistItems);
  return (
    <div>
      <div className="profileSectionHeader">
        <h2 className="profileSectionTitle">Wishlist</h2>
        <span className="profileSectionLine" />
      </div>
      {items.length === 0 ? (
        <div className="emptyState">
          <IconDisc />
          <p>Wishlist-ul tău este gol.</p>
          <a href="/toate/genere" className="emptyStateBtn">Adaugă produse</a>
        </div>
      ) : (
        <div className="wishlistGrid">
          {items.map((item) => (
            <div key={item.id} className="wishlistCard">
              {item.img
                ? <img src={item.img} alt={item.title} className="wishlistImg" />
                : <div className="wishlistImg" style={{ background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconDisc /></div>
              }
              <div className="wishlistInfo">
                <p className="wishlistArtist">{item.artist}</p>
                <p className="wishlistTitle">{item.title}</p>
                <p className="wishlistPrice">{item.price}</p>
              </div>
              <button
                className="wishlistRemoveBtn"
                onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}
              >
                Elimină din wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SectiuneAdrese = () => (
  <div>
    <div className="profileSectionHeader">
      <h2 className="profileSectionTitle">Adresele mele</h2>
      <span className="profileSectionLine" />
    </div>
    <div className="addressGrid">
      {adrese.map((a) => (
        <div key={a.id} className={`addressCard ${a.default ? 'default' : ''}`}>
          {a.default && <span className="addressDefaultBadge">Implicită</span>}
          <p className="addressName">{a.name}</p>
          <p className="addressText">{a.text}</p>
          <div className="addressActions">
            <button className="addressActionBtn edit">Editează</button>
            {!a.default && <button className="addressActionBtn delete">Șterge</button>}
          </div>
        </div>
      ))}
      <button className="addAddressBtn">
        <IconPlus />
        Adaugă adresă
      </button>
    </div>
  </div>
);

const ToggleRow = ({ label, desc, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="settingsRow">
      <div>
        <div className="settingsRowLabel">{label}</div>
        {desc && <div className="settingsRowDesc">{desc}</div>}
      </div>
      <label className="toggle">
        <input type="checkbox" checked={checked} onChange={() => setChecked(v => !v)} />
        <span className="toggleTrack" />
      </label>
    </div>
  );
};

const SectiuneSetari = () => (
  <div>
    <div className="profileSectionHeader">
      <h2 className="profileSectionTitle">Setări</h2>
      <span className="profileSectionLine" />
    </div>

    <div className="settingsGroup">
      <p className="settingsGroupTitle">Notificări email</p>
      <ToggleRow label="Noutăți și lansări" desc="Primești email când apar produse noi" defaultChecked={true} />
      <ToggleRow label="Oferte și reduceri" defaultChecked={true} />
      <ToggleRow label="Status comandă" desc="Actualizări despre livrare" defaultChecked={true} />
      <ToggleRow label="Newsletter lunar" />
    </div>

    <div className="settingsGroup">
      <p className="settingsGroupTitle">Confidențialitate</p>
      <ToggleRow label="Profil public" desc="Alți utilizatori îți pot vedea colecția" />
      <ToggleRow label="Istoricul vizualizărilor" defaultChecked={true} />
    </div>

    <div className="settingsGroup">
      <p className="settingsGroupTitle">Cont</p>
      <div className="settingsRow">
        <div>
          <div className="settingsRowLabel">Șterge contul</div>
          <div className="settingsRowDesc">Acțiune ireversibilă</div>
        </div>
        <button style={{ background: 'none', border: '1px solid #5c4430', color: '#7a6248', padding: '6px 14px', borderRadius: 2, cursor: 'pointer', fontSize: 13, fontFamily: "'Crimson Text', serif", transition: 'color 0.15s, border-color 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#e24b4a'; e.currentTarget.style.borderColor = '#e24b4a'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#7a6248'; e.currentTarget.style.borderColor = '#5c4430'; }}
        >
          Șterge
        </button>
      </div>
    </div>

    <button className="logoutBtn">
      Deconectare
    </button>
  </div>
);

// ── componenta principala ──
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('cont');

  const sectiuni = {
    cont: <SectiuneCont />,
    comenzi: <SectiuneComenzi />,
    wishlist: <SectiuneWishlist />,
    adrese: <SectiuneAdrese />,
    setari: <SectiuneSetari />,
  };

  return (
    <div className="profilePage">
      <div className="profileInner">

        {/* ── sidebar ── */}
        <aside className="profileSidebar">
          <div className="profileCard">
            <div className="profileAvatar">{user.initials}</div>
            <p className="profileName">{user.name}</p>
            <p className="profileEmail">{user.email}</p>
            <p className="profileMemberSince">Membru din {user.memberSince}</p>
          </div>

          <nav className="profileNav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`profileNavBtn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            <div className="profileNavDivider" />
            <button className="profileNavBtn" style={{ color: '#7a6248' }}>
              <IconLogOut />
              Deconectare
            </button>
          </nav>
        </aside>

        {/* ── continut ── */}
        <main>
          {sectiuni[activeTab]}
        </main>

      </div>
    </div>
  );
}