'use client';
import React, { useState, useEffect, useRef } from 'react';
import "./Featured.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { TextBanner } from '../Icons';
import { Reveal } from '../Reveal';
import Image from 'next/image';
import { TransitionLink } from '../TransitionLink';

const items = [
    { label: 'Rock', img: '/assets/featured/rock.jpg', href: '/toate/genere/rock', color: 'rgba(45, 36, 26, 0.91)' },
    { label: 'Jazz & Blues', img: '/assets/featured/jazz.jpg', href: '/toate/genere/jazz-blues', color: 'rgba(49, 89, 109, 0.91)' },
    { label: 'Soul & Funk', img: '/assets/featured/soul.jpg', href: '/toate/genere/soul-funk', color: 'rgba(134, 49, 25, 0.91)' },
    { label: 'Hip-Hop', img: '/assets/featured/hiphop.jpg', href: '/toate/genere/hip-hop', color: 'rgba(30, 30, 30, 0.91)' },
    { label: 'Clasic', img: '/assets/featured/clasic.jpg', href: '/toate/genere/muzica-clasica', color: 'rgba(60, 40, 10, 0.91)' },
    { label: 'Electronică', img: '/assets/featured/electronic.jpg', href: '/toate/genere/muzica-electronica', color: 'rgba(20, 40, 70, 0.91)' },
    { label: 'Soundtracks', img: '/assets/featured/soundtacks.jpg', href: '/toate/genere/soundtracks', color: 'rgba(40, 20, 50, 0.91)' },
    { label: 'Pop', img: '/assets/featured/pop.jpg', href: '/toate/genere/pop', color: 'rgba(100, 30, 30, 0.91)' },
];

const extendedItems = [...items, ...items, ...items];


const ITEMS_PER_PAGE = 5;

const Featured = () => {
    const total = items.length;

    const [current, setCurrent] = useState(total);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [visible, setVisible] = useState(ITEMS_PER_PAGE);

    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [autoPlayKey, setAutoPlayKey] = useState(0);

    const transitionDuration = 400;
    const isTransitioningRef = useRef(false);

    const next = () => {
        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;
        setIsTransitioning(true);
        setCurrent(c => c + 1);
    };

    const prev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrent(c => c - 1);
    };

    const nextManual = () => {
        next();
        setAutoPlayKey(k => k + 1);
    };

    const prevManual = () => {
        prev();
        setAutoPlayKey(k => k + 1);
    };

    useEffect(() => {
        const update = () => {
            if (window.innerWidth <= 600) {
                setVisible(1);
            } else if (window.innerWidth <= 1024) {
                setVisible(3);
            } else {
                setVisible(ITEMS_PER_PAGE);
            }
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    useEffect(() => {
        const interval = setInterval(next, 4000);
        return () => clearInterval(interval);
    }, [autoPlayKey]);

    const handleTransitionEnd = () => {
        isTransitioningRef.current = false;
        setIsTransitioning(false);
        if (current >= total * 2) setCurrent(current - total);
        else if (current <= total - 1) setCurrent(current + total);
    };

    const onDragStart = (e) => {
        setDragging(true);
        setStartX(e.touches ? e.touches[0].clientX : e.clientX);
    };

    const onDragEnd = (e) => {
        if (!dragging) return;
        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        if (startX - endX > 50) nextManual();
        else if (endX - startX > 50) prevManual();
        setDragging(false);
    };

    const trackWidth = (extendedItems.length / visible) * 100;
    const itemWidth = 100 / extendedItems.length;
    const transformValue = (current / extendedItems.length) * 100;

    const centerOffset = Math.floor(visible / 2);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <section className='feat_container'>
                <Reveal>
                    <div className='feat_header'>
                        <h2>COLECȚII RECOMANDATE</h2>
                        <div className='linie' />
                        <TransitionLink href='/toate/genere'>Vezi mai multe <FaChevronRight /></TransitionLink>
                    </div>
                </Reveal>

                <div className='carousel_wrap'>
                    <button className='carousel_btn carousel_btn_left' onClick={prevManual} aria-label="Anterior">
                        <FaChevronLeft />
                    </button>

                    <div className="carousel_viewport">
                        <div
                            className='carousel_track'
                            onMouseDown={onDragStart}
                            onMouseUp={onDragEnd}
                            onMouseLeave={() => setDragging(false)}
                            onTouchStart={onDragStart}
                            onTouchEnd={onDragEnd}
                            onTransitionEnd={handleTransitionEnd}
                            style={{
                                width: `${trackWidth}%`,
                                transform: `translateX(-${transformValue}%)`,
                                transition: isTransitioning ? `transform ${transitionDuration}ms ease-in-out` : 'none',
                            }}
                        >
                            {extendedItems.map((item, i) => {
                                const isCenter = i === current + centerOffset;
                                const cardClass = isCenter ? 'carousel_card_center' : 'carousel_card_side';

                                return (
                                    <div
                                        key={`${item.label}-${i}`}
                                        className={`feat_card carousel_card ${cardClass}`}
                                        style={{
                                            width: `${itemWidth}%`,
                                            padding: visible > 1 ? '0 8px' : '0',
                                        }}
                                    >
                                        <Reveal>
                                            <TransitionLink href={item.href} draggable={false}>
                                                <Image 
                                                    src={item.img} 
                                                    alt={item.label} 
                                                    width={500}
                                                    height={500}
                                                    draggable={false} 
                                                    priority={i < 8} 
                                                />

                                                <div className='feat_card_banner'>
                                                    <TextBanner color={item.color} size={80} />
                                                    <p className='feat_card_banner_txt'>{item.label}</p>
                                                </div>
                                            </TransitionLink>
                                        </Reveal>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button className='carousel_btn carousel_btn_right' onClick={nextManual} aria-label="Următor">
                        <FaChevronRight />
                    </button>
                </div>

                <div className='carousel_dots'>
                    {items.map((_, i) => {
                        const realIndex = current % total;
                        const activeIndex = realIndex < 0 ? realIndex + total : realIndex;

                        return (
                            <button
                                key={i}
                                className={`carousel_dot ${i === activeIndex ? 'active' : ''}`}
                                onClick={() => {
                                    if (isTransitioning) return;
                                    setIsTransitioning(true);
                                    setCurrent(i + total);
                                    setAutoPlayKey(k => k + 1);
                                }}
                                aria-label={`Slide ${i + 1}`}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Featured;