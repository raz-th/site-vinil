'use client';
import { useEffect, useState } from 'react';
import './GenrePage.css';
import ProduseSideBar from '@/components/ProduseSideBar';



// const genuriParams = ["rock", "folk-rock", "jazz-blues", "soul-funk", "hip-hop", "muzica-clasica", "muzica-electronica", "world-music"];



const optiuniSortare = [
  'Preț (Crescător)',
  'Preț (Descrescător)',
  'Noutăți',
  'Cele mai vândute',
  'Nume (A-Z)',
];

// ── iconița disc placeholder ──
const IconDisc = () => (
  <svg viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="20" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="24" r="8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="24" r="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── card produs ──
const cleanArtistName = (name) => name.replace(/\s*\(\d+\)$/, '').trim();

const ProductCard = ({ produs }) => {

  const artisti = produs.artist;
  const an = produs.year > 0 ? produs.year : null;
  const label = produs.labels?.[0]?.name;
  const format = produs.formats?.[0]?.name;
  const formatDesc = produs.formats?.[0]?.descriptions?.[0]; // "Album", "Single", etc.

  return (
    <div className="productCard">
      <div className="productImageWrap">
        <img
          src={produs.cover_image || produs.thumb || "/assets/image.png"}
          alt={`${artisti} - ${produs.title}`}
          loading="lazy"
        />
        {/* <div className="vinylDecor" /> */}

        {format && <span className="productBadge">{format}</span>}
      </div>

      <div className="productInfo">
        <p className="productArtist">{artisti}</p>
        <p className="productName">{produs.title}</p>

        <div className="productMeta">
          {an && <span className="productMetaItem">{an}</span>}
          {label && <span className="productMetaItem">{label}</span>}
          {formatDesc && <span className="productMetaItem">{formatDesc}</span>}
        </div>

        {produs.genres?.length > 0 && (
          <div className="productGenres">
            {produs.genres.map(s => (
              <span key={s} className="productGenreTag">{s}</span>
            ))}
          </div>
        )}

        <div className="productPrices">
          <span className="productPrice">00.00 Lei</span>
        </div>
      </div>

      <button className="addToCartBtn">Adaugă în coș</button>
    </div>
  );
};

// ── componenta principala ──
export default function GenereClient({ id, produse, infoPagina }) {
  const titlu = id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const [sortare, setSortare] = useState(optiuniSortare[0]);

  const totalPagini = Math.ceil(infoPagina.total / infoPagina.perPage);
  const currentPage = infoPagina.currentPage;

  const paginatie = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Left dots
    if (currentPage > 4) {
      pages.push("...");
    }

    // Middle pages (window around current page)
    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPagini - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Right dots
    if (currentPage < totalPagini - 3) {
      pages.push("...");
    }

    // Always show last page (if > 1)
    if (totalPagini > 1) {
      pages.push(totalPagini);
    }

    return pages;
  };

  // console.log(produse)
  return (
    <div className="genrePage" >
      <div className="genrePageInner">

        {/* breadcrumb */}
        <nav className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/genere">Genuri</a>
          <span>/</span>
          <a>{titlu}</a>
        </nav>

        <ProduseSideBar id={id} />

        {/* ── MAIN ── */}
        <main className="genreMain">

          <div className="genreHeader">
            <div>
              <h1 className="genreTitle">{titlu}</h1>
              <p className="genreCount">
                Afișează: <strong>{infoPagina.deLa}–{infoPagina.panaLa}</strong> din <strong>{infoPagina.total}</strong> produse
              </p>
            </div>
            <div className="sortRow">
              <span>Ordonează:</span>
              <select
                className="sortSelect"
                value={sortare}
                onChange={(e) => setSortare(e.target.value)}
              >
                {optiuniSortare.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="productsGrid">
            {produse.map((p, i) => (
              <ProductCard key={i} produs={p} />
            ))}
          </div>

          {/* paginare */}
          <div className="pagination">
            {
              currentPage > 1 ?
                <a className={"pageBtn"} href={`?page=${currentPage - 1}`}>‹</a> :
                <p className={"pageBtn disabled"}>‹</p>
            }
            {paginatie().map((n, i) => (
              n !== "..." ? <a key={i} href={`?page=${n}`} className={`pageBtn ${n === currentPage ? 'active' : ''}`}>{n}</a> :
                <p key={i} className={`pageBtn`} style={{ cursor: "unset" }}>...</p>
            ))}
            {
              currentPage < totalPagini ?
                <a className={"pageBtn"} href={`?page=${currentPage + 1}`}>›</a> :
                <p className={"pageBtn disabled"}>›</p>
            }
          </div>

        </main>
      </div>
    </div>
  );
}