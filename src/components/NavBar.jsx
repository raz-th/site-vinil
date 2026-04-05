'use client';
import { useCallback, useEffect, useState } from 'react';
import { genuri_muzicale, nume } from '../config/site';
import './NavBar.css';
import { useRouter } from 'next/navigation';
import { FaRegUser, FaSignOutAlt, FaBoxOpen, FaHeart } from "react-icons/fa";

import { CgBox } from "react-icons/cg";
import { useAuth } from '@/context/AuthContext';

const IconSearch = () => (
  <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" /></svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
);
const IconCart = () => (
  <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const IconMenu = () => (
  <svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const IconChevron = ({ open }) => (
  <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', stroke: 'currentColor', fill: 'none', strokeWidth: 2, strokeLinecap: 'round' }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const formatari = [
  { label: "Viniluri", href: "vinil" },
  { label: "CD-uri", href: "cd" },
  { label: "Casete audio", href: "casete" },
  { label: "DVD", href: "dvd" },
  { label: "Blu-ray", href: "bluray" },
];


const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check(); // initial
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
};
const NavBar = ({ cartCount = 0, wishlistCount = 0, hiden }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [openDrawerItem, setOpenDrawerItem] = useState(null);
  const nav = useRouter()
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();

  useEffect(() => { console.log(user) }, [user])
  // const controlNavbar = useCallback(() => {
  //   try {
  //     if (typeof window !== 'undefined') {
  //       if (window.scrollY > lastScrollY) { setIsVisible(false); setDrawerOpen(false); }
  //       else setIsVisible(true);
  //       setLastScrollY(window.scrollY);
  //       const winScroll = document.documentElement.scrollTop;
  //       const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  //       setScrollWidth((winScroll / height) * 100);
  //     }
  //   } catch (err) { }
  // }, [lastScrollY]);

  // useEffect(() => {
  //   window.addEventListener('scroll', controlNavbar);
  //   return () => window.removeEventListener('scroll', controlNavbar);
  // }, [controlNavbar]);

  const toggleDrawerItem = (i) => {
    setOpenDrawerItem(prev => prev === i ? null : i);
  };

  const navigateMobil = (to) =>{
    nav.push(to);
    setDrawerOpen(false)
  }



  return (
    <header className={`navBarContainer ${isVisible ? '' : 'nav-hidden'} ${hiden ? "vrajala" : ""}`}>
      <div className="navBarContent">
        <h1 className="nume_logo"><a href='/'>Vinil.ro</a></h1>

        {/* ── navigatie desktop ── */}
        <ul className="navLinks">
          {formatari.map((v, i) => (
            <li key={i}>
              <a href={`/${v.href}/genere`} className='button'>
                {v.label} <span className="dropArrow">▾</span>
              </a>
              <div className="dropdown">
                <div className='dropdown_content'>
                  <a href={`/${v.href}/genere`}>Toate</a>
                  {Object.keys(genuri_muzicale).map((g, j) => (
                    <a key={j} href={`/${v.href}/genere/${g}`} className="dropdownItem">
                      {genuri_muzicale[g].label}
                    </a>
                  ))}
                </div>
              </div>
            </li>
          ))}
          {/* <li><a href="#">Noutăți</a></li>
          <li><a href="#">Oferte</a></li>
          <li><a href="#">Artiști</a></li> */}
        </ul>

        {/* ── actiuni dreapta ── */}
        <div className="navActions">
          <div className={`navSearch ${searchOpen ? 'open' : ''}`}>
            <button className="navActionBtn" onClick={() => !isMobile ? setSearchOpen(v => !v) : nav.push("/search")} aria-label="Caută">
              <IconSearch />
            </button>
            <input
              type="text"
              placeholder="Artist, titlu, an..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchVal.trim()) {
                  nav.push(`/search?q=${encodeURIComponent(searchVal)}`);
                }
                if (e.key === 'Escape') setSearchOpen(false);
              }}
              autoFocus={searchOpen}
            />
          </div>

          <button className="navActionBtn" aria-label="Wishlist">
            <IconHeart />
            {wishlistCount > 0 && <span className="navBadge">{wishlistCount}</span>}
          </button>

          <button className="navActionBtn" aria-label="Coș">
            <IconCart />
            {cartCount > 0 && <span className="navBadge">{cartCount}</span>}
          </button>

          <ul className="navLinks">
            <li className='noHover'>
              <a href={user ? "/user/myaccount" : "/user/login"} className='button'>
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="nav-avatar" />
                ) : (
                  <FaRegUser size={20} />
                )}
              </a>

              <div className="dropdown" style={{ right: '0%', left: 'unset', top: "calc(100% + 8px)" }}>
                <div className='dropdown_content'>
                  {user ? (
                    // --- VARIANTĂ LOGAT ---
                    <>
                      <div className="user-info-header">
                        <p className="user-name">{user.displayName || 'Utilizator'}</p>
                        <p className="user-email">{user.email}</p>
                      </div>
                      <hr />
                      <a href="/user/orders"><FaBoxOpen /> Comenzile mele</a>
                      <a href="/user/wishlist"><FaHeart /> Favorite</a>
                      <a href="/user/settings">Setări cont</a>
                      <hr />
                      <button onClick={() => logout()} className="logout-btn">
                        <FaSignOutAlt /> Ieșire
                      </button>
                    </>
                  ) : (
                    // --- VARIANTĂ NELOGAT (Originală) ---
                    <>
                      <a href="/user/login">Intră in cont</a>
                      <a href="/user/login?type=sign up">Cont nou</a>
                    </>
                  )}
                </div>
              </div>
            </li>
          </ul>

          {/* <a href='/user/profil' className="navActionBtn" aria-label="Cont">
            <IconUser />
          </a> */}


          <button className="navHamburger navActionBtn" onClick={() => setDrawerOpen(v => !v)} aria-label="Meniu">
            {drawerOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* ── drawer mobil ── */}
      <div className={`navDrawer ${drawerOpen ? 'open' : ''}`}>
        {/* profil în drawer */}
        {/* <a href='/profil' className="navDrawerLink navDrawerProfile">
          <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: 'currentColor', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', flexShrink: 0 }}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
          Contul meu
        </a> */}
        <div className='navDrawerHero'>
          {
            user ?
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', width: '100%' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  {
                    user.photoURL ? <img className='ic' style={{padding: 0}}  src={user.photoURL} /> : <div className='ic'><FaRegUser /></div>
                  }
                  <div>
                    <h3>{user.displayName}</h3>
                    <span>{user.email}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', width: '100%', gap: 20, justifyContent: 'space-between' }}>
                  <button onClick={()=>{navigateMobil("/user/myaccount")}} style={
                    {
                      width: "100%",
                      padding: '1rem',
                      fontSize: 15,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 10,
                      background: '#292524',
                      border: '#44403c solid 1px'
                    }
                  }><FaRegUser color='var(--accent2)' size={20} /> Profil</button>
                  <button style={{
                    width: "100%",
                    padding: '1rem',
                    fontSize: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                    background: '#292524',
                    border: '#44403c solid 1px'
                  }}><CgBox color='var(--accent2)' size={20} />Comenzi</button>
                  <button style={{
                    width: "100%",
                    padding: '1rem',
                    fontSize: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                    background: '#292524',
                    border: '#44403c solid 1px'
                  }}><FaSignOutAlt color='var(--accent2)' size={20} />Iesire</button>
                </div>
              </div>
              :
              <>
                <div style={{ display: 'flex', gap: 10, position: 'relative', width: '100%' }}>
                  <div className='ic'>
                    <FaRegUser />
                  </div>
                  <div>
                    <p>Intră în universul tău muzical. </p>
                    <span>Autentifică-te sau creează un cont</span>
                  </div>
                </div>
                <button onClick={() => { nav.push("/user/login"); setDrawerOpen(false) }}>Intră</button>
              </>
          }


        </div>
        <div className="navDrawerContent">
          {formatari.map((v, i) => (
            <div key={i} className="navDrawerSection">

              <button
                className="navDrawerLink navDrawerToggle"
                onClick={() => toggleDrawerItem(i)}
              >
                {v.label}
                <IconChevron open={openDrawerItem === i} />
              </button>

              {/* subgenuri */}
              <div className={`navDrawerSub ${openDrawerItem === i ? 'open' : ''}`}>
                <a href={`/${v.href}/genere`} className="navDrawerSubLink">
                  Toate
                </a>
                {Object.keys(genuri_muzicale).map((g, j) => (
                  <a key={j} href={`/${v.href}/genere/${g}`} className="navDrawerSubLink">
                    {genuri_muzicale[g].label}
                  </a>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* <a href="#" className="navDrawerLink">Noutăți</a>
        <a href="#" className="navDrawerLink">Oferte</a>
        <a href="#" className="navDrawerLink">Artiști</a> */}
      </div>

      <div className="stripe" />
    </header>
  );
};

export default NavBar;