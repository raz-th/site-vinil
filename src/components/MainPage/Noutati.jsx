'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getColor } from "colorthief";
import './Noutati.css'
import { FaChevronRight } from "react-icons/fa";
import VinylDisk from '../VinylDisk';
import { Reveal } from '../Reveal';
// import { TextBanner } from './Icons';



const Card = ({ imgNum, i }) => {
    const [color, setColor] = useState(null);
    const [rotate, setRotate] = useState(false);
    const imgRef = useRef(null);

    const extractColor = async (img) => {
        try {
            const result = await getColor(img);
            setColor(result.hex());
        } catch (err) {
            console.error("Color extraction failed:", err);
        }
    };

    useEffect(() => {
        const img = imgRef.current;

        if (!img) return;

        // If already loaded (cache case)
        if (img.complete) {
            extractColor(img);
        }
    }, []);

    return (
        <div
            className="noutati_card"
            onMouseEnter={() => setRotate(true)}
            onMouseLeave={() => setRotate(false)}
        >
            <Reveal delay={i * 100 + 200}>
                <img
                    ref={imgRef}
                    src={`/temp/image${imgNum}.png`}
                    crossOrigin="anonymous"
                    onLoad={(e) => extractColor(e.target)}
                    alt=""
                />

                <div className="disk">
                    <VinylDisk className='diskVi' color={color} spin={rotate} />
                </div>
            </Reveal>
        </div>
    );
};
const Noutati = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }}>
            <section className='noutati_container'>
                <Reveal>
                    <div className='noutati_header'>
                        <h2>ADĂUGATE RECENT ÎN COLECȚIE</h2>
                        <div className='linie' />
                        <a href='/#'>Vezi mai multe <FaChevronRight /></a>
                    </div>
                </Reveal>
                <div
                className='noutati_content_container'
                >
                    <div className='noutati_content'>
                        <Card i={0} imgNum={1} />
                        <Card i={1} imgNum={2} />
                        <Card i={2} imgNum={3} />
                        <Card i={3} imgNum={4} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Noutati;
