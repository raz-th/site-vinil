'use client';
import { useState } from 'react';
import { genuri_muzicale, nume } from '../config/site';
import './NavBar.css';


// const genuri = [
//   { icon: '🎸', label: 'Rock' },
//   { icon: '🎷', label: 'Jazz & Blues' },
//   { icon: '🎵', label: 'Soul & Funk' },
//   { icon: '🎹', label: 'Clasic' },
//   { icon: '🎤', label: 'Hip-Hop' },
//   { icon: '🌍', label: 'World Music' },
// ];



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

const NavBar = ({ cartCount = 0, wishlistCount = 0 }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');



  return (
    <div className="navBarContainer">
      <div className="navBarContent">
        <h1 className="nume_logo"><a href='/'>{nume}</a></h1>
        <ul className="navLinks">
          <li>
            <button>
              Genuri <span className="dropArrow">▾</span>
            </button>
            <div className="dropdown">
              <div className='dropdown_content'>
                {Object.keys(genuri_muzicale).map((g, i) => (
                  <a key={i} href={`/genere/${g}`} className="dropdownItem">
                    {/* <span className="dropdownIcon">{g.icon}</span> */}
                    {genuri_muzicale[g].label}
                  </a>
                ))}
              </div>
            </div>
          </li>
          <li><a href="#">Noutăți</a></li>
          <li><a href="#">Oferte</a></li>
          <li><a href="#">Artiști</a></li>
        </ul>

        <div className="navActions">
          <div className={`navSearch ${searchOpen ? 'open' : ''}`}>
            <button
              className="navActionBtn"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Caută"
            >
              <IconSearch />
            </button>
            <input
              type="text"
              placeholder="Artist, titlu, an..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
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

          <button className="navActionBtn" aria-label="Cont">
            <IconUser />
          </button>

          <button
            className="navHamburger navActionBtn"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label="Meniu"
          >
            {drawerOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div className={`navDrawer ${drawerOpen ? 'open' : ''}`}>
        <a href="#" className="navDrawerLink">Genuri</a>
        {Object.keys(genuri_muzicale).map((g, i) => (
          <a key={i} href="#" className="dropdownItem">
            {/* <span className="dropdownIcon">{g.icon}</span> */}
            {genuri_muzicale[g].label}
          </a>
        ))}
        <a href="#" className="navDrawerLink">Noutăți</a>
        <a href="#" className="navDrawerLink">Oferte</a>
        <a href="#" className="navDrawerLink">Artiști</a>
      </div>

      <div className="stripe" />

    </div>
  );
};

export default NavBar;