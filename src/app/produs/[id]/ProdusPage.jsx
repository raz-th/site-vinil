'use client';
import { GrCart } from "react-icons/gr";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "next/navigation";
import { FaPlay } from "react-icons/fa";

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
                <span>{formatTime(time)}</span>
            </div>
        </div>
    )
}



const ProdusPage = ({ produs }) => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);

    const [hasOverflow, setHasOverflow] = useState(false);
    const scrollRef = useRef(null);

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    useEffect(() => {
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
                            <img className='mainImage' src={produs.images[selectedImage].uri || "/assets/image.png"}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
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
                        <div className='moreImagesContainer'>
                            {
                                hasOverflow && (
                                    <button onClick={scrollLeft} className="moreImagesBtn">
                                        <FaChevronLeft />
                                    </button>
                                )
                            }

                            <div className='moreImages' ref={scrollRef} style={{ width: !hasOverflow ? "100%" : '90%' }}>
                                {
                                    produs.images.map((v, i) => (
                                        <img
                                            key={i}
                                            src={v.uri || "/assets/image.png"}
                                            onClick={() => setSelectedImage(i)}
                                            className={selectedImage === i ? "selected" : ""}
                                        />
                                    ))
                                }
                            </div>


                            {
                                hasOverflow && (
                                    <button onClick={scrollRight} className="moreImagesBtn">
                                        <FaChevronRight />
                                    </button>
                                )
                            }
                        </div>
                    </section>
                    <section>
                        <p className='productType'>{produs.formats[0].name} · {produs.formats[0].descriptions[0]}</p>
                        <p className='productArtistName'>{produs.artists.map((v) => v.name).join(", ")}</p>
                        <h1 className='productName'>{produs.title}</h1>
                        <div className='generesTags'>
                            {
                                produs.genres.map((v, i) => (<p key={i}>{v}</p>))
                            }
                        </div>
                        <hr className='divider' />
                        <div className="detalies">
                            <div className="detalie-row">
                                <p>An lansare</p>
                                <p>{produs.year}</p>
                            </div>
                            <div className="detalie-row">
                                <p>Țara</p>
                                <p>{produs.country}</p>
                            </div>
                            <div className="detalie-row">
                                <p>Label</p>
                                <p>Well Of Urd — Wur002</p>
                            </div>
                            <div className="detalie-row">
                                <p>Format</p>
                                <p>{produs.formats.map((v) => v.name).join(", ")}</p>
                            </div>
                        </div>
                        <hr className='divider' />
                        <div className="pret_container">
                            <p className="pret-old">79.99 Lei</p>
                            <p className="pret">59.99 Lei</p>
                            <p className="pret-reducere">-25%</p>
                        </div>
                        <div className="cont-stoc">
                            <span className="stoc-dot" />
                            În stoc · 3 disponibile
                        </div>
                        <div className="cont-btns">
                            <button className="btn-add-cart"><GrCart />Adaugă in coș</button>
                            <button className="btn-add-wish"><IoMdHeartEmpty /></button>
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
                    <section>
                        <div className="secondInfoHeader">
                            <h2>Note</h2>
                            <div className="line" />
                        </div>
                        <p>{produs.notes}</p>
                    </section>
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
