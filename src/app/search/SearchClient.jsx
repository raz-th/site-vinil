'use client';
import { useEffect, useState } from 'react';
import './SearchClient.css';
import ProduseSideBar from '@/components/ProduseSideBar';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';




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
    const nav = useRouter();
    const artisti = produs.artist;
    const an = produs.year > 0 ? produs.year : null;
    const label = produs.labels?.[0]?.name;
    const format = produs.formats?.[0]?.name;
    const formatDesc = produs.formats?.[0]?.descriptions?.[0]; // "Album", "Single", etc.

    return (
        <div className="productCard" onClick={() => nav.push(`/produs/${produs.id}`)}>
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

                {produs.searchClients?.length > 0 && (
                    <div className="productsearchClients">
                        {produs.searchClients.map(s => (
                            <span key={s} className="productsearchClientTag">{s}</span>
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
export default function SearchClient({ id, format, produse, infoPagina, q }) {
    const titlu = "Search";

    const [sortare, setSortare] = useState(optiuniSortare[0]);
    const [searchVal, setSearchVal] = useState('');
    const router = useRouter();

    const totalPagini = Math.ceil(infoPagina.total / infoPagina.perPage);
    const currentPage = infoPagina.currentPage;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

    useEffect(()=>{setSearchVal(q||'')}, [q])

console.log(produse)
    const paginatie = () => {
        const pages = [];

        const maxVisible = isMobile ? 3 : 5;

        pages.push(1);

        if (currentPage > 2) {
            pages.push("...");
        }

        const offset = Math.floor(maxVisible / 2);
        const start = Math.max(2, currentPage - offset);
        const end = Math.min(totalPagini - 1, currentPage + offset);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPagini - 1) {
            pages.push("...");
        }

        if (totalPagini > 1) {
            pages.push(totalPagini);
        }

        return pages;
    };

    // console.log(produse)
    return (
        <div className="searchClientPage" >
            <div className="searchContainer">
                <h2>Căutare în catalog</h2>

                <div className="searchInputContainer">
                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Artist, album..."
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && searchVal.trim()) {
                                router.push(`/search?q=${encodeURIComponent(searchVal)}`);
                            }
                        }}
                        autoFocus
                    />
                </div>
            </div>
            <div className="searchClientPageInner">

                <ProduseSideBar search={true} id={id} format={format} />

                {/* ── MAIN ── */}
                <main className="searchClientMain">

                    <div className="searchClientHeader">
                        <div>
                            <h1 className="searchClientTitle">{format} - {titlu}</h1>
                            <p className="searchClientCount">
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