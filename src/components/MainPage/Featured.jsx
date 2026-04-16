'use client';
import React, { useState, useEffect, useRef } from 'react';
import "./Featured.css"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { TextBanner } from '../Icons';
import { Reveal } from '../Reveal';

const items = [
    { label: 'Rock', img: '/assets/featured/rock.jpg', href: '/toate/genere/rock', color: 'rgba(45, 36, 26, 0.91)' },
    { label: 'Jazz & Blues', img: '/assets/featured/jazz.jpg', href: '/toate/genere/jazz-blues', color: 'rgba(49, 89, 109, 0.91)' },
    { label: 'Soul & Funk', img: '/assets/featured/soul.jpg', href: '/toate/genere/soul-funk', color: 'rgba(134, 49, 25, 0.91)' },
    { label: 'Hip-Hop', img: '/assets/featured/hiphop.jpg', href: '/toate/genere/hip-hop', color: 'rgba(30, 30, 30, 0.91)' },
    { label: 'Clasic', img: '/assets/featured/clasic.jpg', href: '/toate/genere/muzica-clasica', color: 'rgba(60, 40, 10, 0.91)' },
    { label: 'Electronicză', img: '/assets/featured/electronic.jpg', href: '/toate/genere/muzica-electronica', color: 'rgba(20, 40, 70, 0.91)' },
    { label: 'Soundtracks', img: '/assets/featured/soundtacks.jpg', href: '/toate/genere/soundtracks', color: 'rgba(40, 20, 50, 0.91)' },
    { label: 'Pop', img: '/assets/featured/pop.jpg', href: '/toate/genere/pop', color: 'rgba(100, 30, 30, 0.91)' },
];


const Featured = () => {
    const [current, setCurrent] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [visible, setVisible] = useState(3);
    const intervalRef = useRef(null);

    const total = items.length;

    const prev = () => setCurrent(c => (c - 1 + total) % total);
    const next = () => setCurrent(c => (c + 1) % total);

    useEffect(() => {
        const update = () => setVisible(window.innerWidth <= 768 ? 1 : 3);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);



    // autoplay
    //   useEffect(() => {
    //     intervalRef.current = setInterval(next, 4000);
    //     return () => clearInterval(intervalRef.current);
    //   }, [current]);

    // swipe
    const onDragStart = (e) => {
        setDragging(true);
        setStartX(e.touches ? e.touches[0].clientX : e.clientX);
        clearInterval(intervalRef.current);
    };

    const onDragEnd = (e) => {
        if (!dragging) return;
        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        if (startX - endX > 50) next();
        else if (endX - startX > 50) prev();
        setDragging(false);
    };

    // cardurile vizibile — ia VISIBLE items incepand de la current
    const visibleItems = Array.from({ length: visible }, (_, i) => items[(current + i) % total]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <section className='feat_container'>
                <Reveal>
                    <div className='feat_header'>
                        <h2>COLECȚII RECOMANDATE</h2>
                        <div className='linie' />
                        <a href='/toate/genere'>Vezi mai multe <FaChevronRight /></a>
                    </div>
                </Reveal>

                <div className='carousel_wrap'>

                    {/* buton stanga */}
                    <button className='carousel_btn carousel_btn_left' onClick={prev} aria-label="Anterior">
                        <FaChevronLeft />
                    </button>

                    {/* carduri */}
                    <div
                        className='carousel_track'
                        onMouseDown={onDragStart}
                        onMouseUp={onDragEnd}
                        onTouchStart={onDragStart}
                        onTouchEnd={onDragEnd}
                    >
                        {visibleItems.map((item, i) => (
                            <div
                                key={`${item.label}-${i}`}
                                className={`feat_card carousel_card ${visible === 1 || i === 1 ? 'carousel_card_center' : 'carousel_card_side'
                                    }`}
                                
                            >
                                <Reveal>
                                    <a href={item.href}>
                                        <img src={item.img} alt={item.label} draggable={false} />
                                        <div className='feat_card_banner'>
                                            <TextBanner color={item.color} size={80} />
                                            <p className='feat_card_banner_txt'>{item.label}</p>
                                        </div>
                                    </a>
                                </Reveal>
                            </div>
                        ))}
                    </div>

                    {/* buton dreapta */}
                    <button className='carousel_btn carousel_btn_right' onClick={next} aria-label="Următor">
                        <FaChevronRight />
                    </button>

                </div>

                {/* dots */}
                <div className='carousel_dots'>
                    {items.map((_, i) => (
                        <button
                            key={i}
                            className={`carousel_dot ${i === current ? 'active' : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>

            </section>
        </div>
    );
};

export default Featured;