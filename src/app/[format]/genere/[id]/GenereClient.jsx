'use client';
import { useEffect, useRef, useState } from 'react';
import './GenrePage.css';
import ProduseSideBar from '@/components/ProduseSideBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import { ProductCard } from '../ProductCard';
import LayoutToggle from '@/components/LayoutToggle/LayoutToggle';
import useIsMobile from '@/components/useIsMobile';




// const genuriParams = ["rock", "folk-rock", "jazz-blues", "soul-funk", "hip-hop", "muzica-clasica", "muzica-electronica", "world-music"];



const optiuniSortare = [
  'Nume (A-Z)',
  'Preț (Crescător)',
  'Preț (Descrescător)',
  'Noutăți',
  'Cele mai vândute',

];


// ── iconița disc placeholder ──
const IconDisc = () => (
  <svg viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="20" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="24" r="8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="24" r="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


// ── componenta principala ──
export default function GenereClient({ id, format, produse, infoPagina }) {
  const titlu = id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const router = useRouter();
  const searchParams = useSearchParams();
  const mob = useIsMobile();
  const [layout, setLayout] = useState(2);
  const sortLabelMap = {
    'pret-crescator': 'Preț (Crescător)',
    'pret-descrescator': 'Preț (Descrescător)',
    'noutati': 'Noutăți',
    'nume-az': 'Nume (A-Z)',
  };

  const sortFromUrl = searchParams.get('sort');
  const [sortare, setSortare] = useState(sortLabelMap[sortFromUrl] || optiuniSortare[0]);

  const handleSortare = (val) => {
    const sortMap = {
      'Preț (Crescător)': 'pret-crescator',
      'Preț (Descrescător)': 'pret-descrescator',
      'Noutăți': 'noutati',
      'Nume (A-Z)': 'nume-az',
    };
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortMap[val]);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const totalPagini = Math.ceil(infoPagina.total / infoPagina.perPage);
  const currentPage = infoPagina.currentPage;






  // console.log(produse)
  return (
    <div className="genrePage" >
      <div className="genrePageInner">

        {/* breadcrumb */}
        <nav className="breadcrumb">
          <a href="/">Acasă</a>
          <span>/</span>
          <a href={`/${format}`} style={{ textTransform: "capitalize" }}>{format}</a>
          <span>/</span>
          <a href={`/${format}/genere`}>Genuri</a>
          <span>/</span>
          <a>{titlu}</a>
        </nav>

        <ProduseSideBar id={id} format={format} />

        {/* ── MAIN ── */}
        <main className="genreMain">

          <div className="genreHeader">
            <div>
              <h1 className="genreTitle">{format} - {titlu}</h1>
              <p className="genreCount">
                Afișează: <strong>{infoPagina.deLa}–{infoPagina.panaLa}</strong> din <strong>{infoPagina.total}</strong> produse
              </p>
            </div>
            <div className="sortRow">
              <span>Ordonează:</span>
              <select
                className="sortSelect"
                value={sortare}
                onChange={(e) => {
                  setSortare(e.target.value);
                  handleSortare(e.target.value);
                }}
              >
                {optiuniSortare.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <LayoutToggle onChange={(v) => setLayout(v)} />
            </div>
          </div>

          <div className="productsGrid" style={mob ? { gridTemplateColumns: `repeat(${layout}, 1fr)` } : {}}>
            {produse.map((p, i) => (
              <ProductCard key={i} produs={p} />
            ))}
          </div>

          {/* paginare */}
          <Pagination currentPage={currentPage} totalPagini={totalPagini} />

        </main>
      </div>
    </div>
  );
}