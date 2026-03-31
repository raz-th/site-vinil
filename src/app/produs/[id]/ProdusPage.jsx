'use client';
import { GrCart } from "react-icons/gr";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useRef, useState } from 'react';

const ProdusPage = ({ produs }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const scrollRef = useRef(null);

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

    return (
        <div className='produsPage'>
            <div className="produsPageInner">
                <div className='mainInfo'>
                    <section>
                        <img className='mainImage' src={produs.images[selectedImage].uri || "/assets/image.png"} />
                        <div className='moreImagesContainer'>
                            <button onClick={scrollLeft}>
                                <FaChevronLeft />
                            </button>

                            <div className='moreImages' ref={scrollRef}>
                                {
                                    produs.images.map((v, i) => (
                                        <img
                                            key={i}
                                            src={v.uri || "/assets/image.png"}
                                            onClick={() => setSelectedImage(i)}
                                        />
                                    ))
                                }
                            </div>

                            <button onClick={scrollRight}>
                                <FaChevronRight />
                            </button>
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
            </div>

        </div>
    );
}

export default ProdusPage;
