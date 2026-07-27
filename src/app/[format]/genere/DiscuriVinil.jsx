'use client';
import { useEffect, useRef, useState } from 'react';
import './DiscuriVinil.css';
import ProduseSideBar from '@/components/ProduseSideBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import { ProductCard } from './ProductCard';
import LayoutToggle from '@/components/LayoutToggle/LayoutToggle';
import useIsMobile from '@/components/useIsMobile';

// ── date mock — înlocuiești cu fetch real ──
const toateGenurile = [
  'Rock', 'Folk Rock', 'Jazz & Blues', 'Soul & Funk',
  'Hip-Hop', 'Muzică Clasică', 'Muzică Electronică',
  'Soundtracks', "Muzică Românească",
];

// const genuriParams = ["rock", "folk-rock", "jazz-blues", "soul-funk", "hip-hop", "muzica-clasica", "muzica-electronica", "world-music"];


const genuri = [
  { label: 'Rock', count: 6 },
  { label: 'Folk Rock', count: 3 },
  { label: 'Jazz, Rock, Blues', count: 3 },
  { label: 'Hard Rock', count: 2 },
  { label: 'Electronic, Rock, Pop', count: 1 },
];

const producatori = [
  { label: '143 Records', count: 1 },
  { label: 'A&A Records', count: 8 },
  { label: 'A&M Records', count: 4 },
  { label: 'Atlantic Records', count: 12 },
  { label: 'Blue Note', count: 7 },
];



const optiuniSortare = [
  'Relevanță',
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

// ── card produs ──

const cleanArtistName = (name) => name.replace(/\s*\(\d+\)$/, '').trim();



export default function DiscuriVinil({ format, produse, infoPagina }) {
  const titlu = format;
  const mob = useIsMobile();
  const [layout, setLayout] = useState(2);
  const [inStoc, setInStoc] = useState(false);
  const [genSelect, setGenSelect] = useState([]);
  const [prodSelect, setProdSelect] = useState([]);
  const toggleArr = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const totalPagini = Math.ceil(infoPagina.total / infoPagina.perPage);
  const currentPage = infoPagina.currentPage;

  const router = useRouter();
  const searchParams = useSearchParams();

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
      "Relevanță": null
    };
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortMap[val]);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };




  return (
    <div className="genrePage">
      <div className="genrePageInner">

        <nav className="breadcrumb">
          <a href="/">Acasă</a>
          <span>/</span>
          <a href={`/${format}`} style={{ textTransform: "capitalize" }}>{format}</a>
          <span>/</span>
          <a href={`/${format}/genere`}>Genuri</a>
        </nav>

  

        {/* ── SIDEBAR ── */}
        <ProduseSideBar format={format} />

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
                onChange={(e) => {
                  setSortare(e.target.value);
                  handleSortare(e.target.value);
                }}
              >
                {optiuniSortare.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <LayoutToggle onChange={(v)=>setLayout(v)} />
            </div>
          </div>

          <div className="productsGrid" style={mob?{gridTemplateColumns: `repeat(${layout}, 1fr)`}:{}}>
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