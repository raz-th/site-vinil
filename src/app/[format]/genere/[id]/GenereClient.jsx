'use client';
import { useEffect, useRef, useState } from 'react';
import './GenrePage.css';
import ProduseSideBar from '@/components/ProduseSideBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Pagination from '@/components/Pagination';




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

// ── card produs ──

const ProductCard = ({ produs }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef(null);
  const { addToCart } = useCart();
  const nav = useRouter();
  // console.log(produs)
  useEffect(() => {
    setImgLoaded(false);
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, [produs.cover_image, produs.thumb]);

  const artisti = produs.artist;
  const an = produs.year > 0 ? produs.year : null;
  const label = produs.labels?.[0]?.name;
  const format = produs.format;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      productId: produs.id,
      title: produs.title,
      artist: produs.artist,
      format: produs.format,
      imageUrl: produs.cover_image,
      price: produs.price || 0,
      quantity: 1
    });
  };

  return (
    <div className="productCard" onClick={() => nav.push(`/produs/${produs.id}`)}>
      <div className="productImageWrap">
        <div style={{ position: 'relative' }}>
          {!imgLoaded && <div className="img-skeleton" />}
          <img
            ref={imgRef}
            src={produs.cover_image || produs.thumb || "/assets/image.png"}
            alt={`${produs.title} - ${artisti}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(true)}
            style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
          />
          {/* <Image
            ref={imgRef}
            src={produs.cover_image || produs.thumb || "/assets/image.png"}
            alt={`${produs.title} - ${artisti}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(true)}
            style={{
              objectFit: 'cover',
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          /> */}
        </div>
        {format && <span className="productBadge">{format === "Vinyl" ? "Vinil" : format}</span>}
      </div>

      <div className="productInfo">
        <p className="productArtist">{artisti}</p>
        <p className="productName">{produs.title}</p>
        <div className="productMeta">
          {an && <span className="productMetaItem">{an}</span>}
          {label && <span className="productMetaItem">{label}</span>}
        </div>
        {produs.genres?.length > 0 && (
          <div className="productGenres">
            {produs.genres.map(s => (
              <span key={s} className="productGenreTag">{s}</span>
            ))}
          </div>
        )}
        <div className="productPrices">
          <span className="productPrice">{produs.price ? `${produs.price}.00 Lei` : 'Preț indisponibil'}</span>
        </div>
      </div>

      <button className="addToCartBtn" onClick={handleAddToCart}>Adaugă în coș</button>
    </div>
  );
};

// ── componenta principala ──
export default function GenereClient({ id, format, produse, infoPagina }) {
  const titlu = id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
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
            </div>
          </div>

          <div className="productsGrid">
            {produse.map((p, i) => (
              <ProductCard key={i} produs={p} />
            ))}
          </div>

          {/* paginare */}
          <Pagination currentPage={currentPage} totalPagini={totalPagini}/>

        </main>
      </div>
    </div>
  );
}