'use client';
import { GrCart } from "react-icons/gr";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoriteContext";
import { BsInfoCircle } from "react-icons/bs";
import useIsMobile from "@/components/useIsMobile";
import InfoDrawer from "./InfoDrawer";
import Image from "next/image";

const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const VideoCard = ({ name, time, uri }) => {
    return (
        <div className="videoCardCont">
            <a className="playBtn" href={uri} target="_">
                <FaPlay />
            </a>
            <div>
                <h3>{name}</h3>
                <span>{time === 0 ? "Album" : formatTime(time)}</span>
            </div>
        </div>
    )
}


const gradatiiCoperta = {
    "Vinyl": {
        "G": ["Good (G)", "Deteriorări evidente, uzură accentuată și defecte multiple."],
        "VG": ["Very Good (VG)", "Uzură vizibilă, colțuri tocite, mici rupturi sau pete."],
        "VG+": ["Very Good Plus (VG+)", "Uzură moderată, mici îndoiri sau urme de frecare."],
        "EX": ["Excellent (EX)", "Ușoare semne de uzură pe margini sau colțuri."],
        "NM": ["Near Mint (NM)", "Aproape perfectă, cu urme minime de manipulare."],
        "default": ["N/A", "N/A"]
    },
    "default": {
        "Stare buna": ["Stare buna", "Carcasa prezintă zgârieturi superficiale și/sau ușoară opacitate."],
        "Stare foarte buna": ["Stare foarte buna", "Carcasa poate prezenta mici zgârieturi, fară fisuri, fară alte defecte."]
    }

}

const gradatiiDisc = {
    "Vinyl": {
        "G": ["Good (G)", "Uzură evidentă, cu defecte vizuale și audio perceptibile."],
        "VG": ["Very Good (VG)", "Vizibil utilizat. Pot exista pocnituri, clicuri sau zgârieturi superficiale."],
        "VG+": ["Very Good Plus (VG+)", "Mici semne de utilizare sau zgomot de fundal foarte redus."],
        "EX": ["Excellent (EX)", "Urme foarte fine de utilizare, fără impact asupra redării audio."],
        "NM": ["Near Mint (NM)", "Ascultat de foarte puține ori. Fără urme sau zgârieturi vizibile."],
        "default": ["N/A", "N/A"]
    },
    "default": {
        "Stare buna": ["Stare buna", "Carcasa prezintă zgârieturi superficiale și/sau ușoară opacitate."],
        "Stare foarte buna": ["Stare foarte buna", "Carcasa poate prezenta mici zgârieturi, fară fisuri, fară alte defecte."]
    }
}




const ProdusPage = ({ produs }) => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const [selectedImage, setSelectedImage] = useState(0);

    const [hasOverflow, setHasOverflow] = useState(false);
    const scrollRef = useRef(null);

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const [show, setShow] = useState({ gradatieVinil: false, gradatieDisc: false })

    const isMobile = useIsMobile(1374);

    const [justAdded, setJustAdded] = useState(false);
    const [heartPop, setHeartPop] = useState(false);

    const gradatieCoperta =
        gradatiiCoperta?.[produs.format]?.[produs.stare.stare_coperta] ??
        gradatiiCoperta?.[produs.format]?.default ??
        gradatiiCoperta?.default?.[produs.stare.stare_coperta] ??
        ["N/A", "N/A"];
    const gradatieDisc =
        gradatiiDisc?.[produs.format]?.[produs.stare.stare_disc] ??
        gradatiiDisc?.[produs.format]?.default ??
        gradatiiDisc?.default?.[produs.stare.stare_disc] ??
        ["N/A", "N/A"];



    useEffect(() => {
        console.log(produs)
        const el = scrollRef.current;
        if (!el) return;

        const checkOverflow = () => {
            setHasOverflow(el.scrollWidth > el.clientWidth);
        };

        const timer = setTimeout(checkOverflow, 0);

        window.addEventListener('resize', checkOverflow);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkOverflow);
        };

    }, [produs]);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({
            left: -100,
            behavior: "smooth"
        });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({
            left: 100,
            behavior: "smooth"
        });
    };

    const handleTouchStart = (e) => {
        setTouchEnd(null); // reset
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;

        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) { //in stanga
            setSelectedImage((prev) =>
                prev < produs.images.length - 1 ? prev + 1 : prev
            );
        } else if (distance < -minSwipeDistance) { //in dreapta
            setSelectedImage((prev) =>
                prev > 0 ? prev - 1 : prev
            );
        }
    };


    const handleAddToCart = () => {
        addToCart({
            productId: produs.id,
            title: produs.title,
            artist: produs.artist,
            format: produs.format,
      imageUrl: produs.cover_image,
            price: produs.price || 0,
            quantity: 1
        });

        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1200);
    };

    const handleToggleFavorite = () => {
        toggleFavorite(produs);
        setHeartPop(true);
        setTimeout(() => setHeartPop(false), 500);
    };


    const maxDots = 5;
    const total = produs.images.length;

    let start = 0;

    if (total > maxDots) {
        if (selectedImage <= 2) {
            start = 0;
        } else if (selectedImage >= total - 3) {
            start = total - maxDots;
        } else {
            start = selectedImage - 2;
        }
    }

    const visibleDots = produs.images.slice(start, start + maxDots);

    return (
        <div className='produsPage'>
            <div className="produsPageInner">
                <div className='mainInfo'>
                    <section>
                        <div style={{ position: 'relative' }}>
                            <Image
                                className="mainImage"
                                src={produs.images[selectedImage] || "/assets/image.png"}
                                alt="Imagine produs"
                                width={500}
                                height={500}
                                priority
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                draggable={false}
                            />
                            <div className="mobileMoreImagesIndicator">
                                <div className="dotsContainer">
                                    {visibleDots.map((_, i) => {
                                        const realIndex = start + i;
                                        return (
                                            <div
                                                key={realIndex}
                                                className={`
                                dot
                                ${selectedImage === realIndex ? "selected" : ""}
                                ${i === 0 || i === maxDots - 1 ? "edge" : ""}
                            `}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="moreImagesContainer">
                            {hasOverflow && (
                                <button onClick={scrollLeft} className="moreImagesBtn">
                                    <FaChevronLeft />
                                </button>
                            )}

                            <div className={`moreImages ${hasOverflow ? "" : "nu"}`} ref={scrollRef} style={{ width: !hasOverflow ? "100%" : '90%' }}>
                                {produs.images.map((v, i) => (
                                    <Image
                                        key={i}
                                        src={v || "/assets/image.png"}
                                        alt={`Miniatură ${i}`}
                                        width={100}
                                        height={100}
                                        onClick={() => setSelectedImage(i)}
                                        className={selectedImage === i ? "selected" : ""}
                                        draggable={false}
                                    />
                                ))}
                            </div>

                            {hasOverflow && (
                                <button onClick={scrollRight} className="moreImagesBtn">
                                    <FaChevronRight />
                                </button>
                            )}
                        </div>
                    </section>
                    <section>
                        <p className='productType'>{produs.format === "Vinyl" ? "Vinil" : produs.format}</p>
                        <p className='productArtistName'>{produs.artist}</p>
                        <h1 className='productName'>{produs.title}</h1>
                        <div className='generesTags'>
                            {
                                produs.genres.map((v, i) => (<p key={i}>{v}</p>))
                            }
                        </div>
                        <hr className='divider' />
                        <div className="detalies">
                            <div className="detalie-row">
                                <p>An producție</p>
                                <p>{produs.year}</p>
                            </div>
                            <div className="detalie-row">
                                <p>Țara</p>
                                <p>{produs.country}</p>
                            </div>
                            <div className="detalie-row">
                                <p>Casa de discuri</p>
                                <p>{produs.label}</p>
                            </div>
                            <div className="detalie-row">
                                <p>Format</p>
                                <p>{produs.format}</p>
                            </div>
                            <div className="detalie-row">
                                <p>Stare {produs.format === "Vinyl" ? "coperta" : "carcasă"}</p>
                                <p>{produs.stare.stare_coperta}
                                    {!isMobile ? <BsInfoCircle className="infoIcon"
                                        onMouseEnter={() => setShow((e) => ({ ...e, gradatieVinil: true }))}
                                        onMouseLeave={() => setShow((e) => ({ ...e, gradatieVinil: false }))}
                                    /> : <InfoDrawer
                                        title={gradatieCoperta[0]}
                                        content={gradatieCoperta[1]}
                                    />
                                    }
                                </p>
                                {!isMobile && produs.stare.stare_coperta ? <div className={`infocontainer ${show.gradatieVinil ? "active" : ""}`}>
                                    <p className="cont">{gradatieCoperta[1]}</p>
                                </div> : <></>}
                            </div>
                            <div className="detalie-row">
                                <p>Stare {produs.format === "Vinyl" ? "vinil" : "disc"}</p>
                                <p>{produs.stare.stare_disc}
                                    {!isMobile ? <BsInfoCircle className="infoIcon"
                                        onMouseEnter={() => setShow((e) => ({ ...e, gradatieDisc: true }))}
                                        onMouseLeave={() => setShow((e) => ({ ...e, gradatieDisc: false }))}
                                    /> : <InfoDrawer
                                        title={gradatieDisc[0]}
                                        content={gradatieDisc[1]}
                                    />
                                    }
                                </p>
                                {!isMobile && produs.stare.stare_disc ? <div className={`infocontainer ${show.gradatieDisc ? "active" : ""}`}>
                                    <p className="cont">{gradatieDisc[1]}</p>
                                </div> : <></>}
                            </div>
                            {
                                produs.description && (<div className="detalie-row">
                                    <p>Descriere</p>
                                    <p>{produs.description}</p>
                                </div>)
                            }
                        </div>
                        <hr className='divider' />
                        <div className="pret_container">
                            {/* <p className="pret-old">79.99 Lei</p> */}
                            <p className="pret">{produs.price} Lei</p>
                            {/* <p className="pret-reducere">-25%</p> */}
                        </div>
                        <div className="cont-stoc">
                            <span className="stoc-dot" />
                            În stoc · {produs.stock} {produs.stock !== 1 ? "disponibile" : "disponibil"}
                        </div>
                        <div className="cont-btns">
                            <button
                                className={`btn-add-cart ${justAdded ? "added" : ""}`}
                                onClick={handleAddToCart}
                            >
                                {justAdded ? <FaCheck /> : <GrCart />}
                                {justAdded ? "Adăugat!" : "Adaugă in coș"}
                            </button>
                            <button
                                className={`btn-add-wish ${heartPop ? "pop" : ""}`}
                                onClick={handleToggleFavorite}
                            >
                                {isFavorite(id) ? <IoMdHeart /> : <IoMdHeartEmpty />}
                            </button>
                        </div>
                    </section>
                </div>
                <div className='secondInfo'>
                    <section>
                        <div className="secondInfoHeader">
                            <h2>Tracklist</h2>
                            <div className="line" />
                        </div>
                        <ul>
                            {
                                produs.tracklist.map((v, i) => (<li style={i === 0 ? { borderTop: 'none' } : {}} key={i}><div><span>{i + 1}</span>{v.title}</div><span>{v.duration}</span></li>))
                            }
                        </ul>
                    </section>
                    {/* {
                        (produs.description && <section>
                            <div className="secondInfoHeader">
                                <h2>Descriere</h2>
                                <div className="line" />
                            </div>
                            <p>{produs.description}</p>
                        </section>)
                    } */}
                </div>
                {
                    produs.videos.length > 0 && (
                        <div className="videosContainer">
                            <section className="videosContent">
                                <div className="secondInfoHeader">
                                    <h2>Videoclipuri</h2>
                                    <div className="line" />
                                </div>
                                <div className="videosGrid">
                                    {
                                        produs.videos.map((v, i) => <VideoCard uri={v.uri} key={i} name={v.title} time={v.duration} />)
                                    }
                                </div>
                            </section>
                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default ProdusPage;
