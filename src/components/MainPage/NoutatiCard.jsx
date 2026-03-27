'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from '../Reveal';
import VinylDisk from '../VinylDisk';
import { getColor } from "colorthief";

export const Card = ({ i, data }) => {
    const [color, setColor] = useState(null);
    const [rotate, setRotate] = useState(false);
    const imgRef = useRef(null);

    if (!data) return null;

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
                    src={`/api/image-proxy?url=${encodeURIComponent(data.cover_image)}`}
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