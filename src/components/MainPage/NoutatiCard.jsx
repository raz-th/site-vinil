'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from '../Reveal';
import VinylDisk from '../VinylDisk';
import { getColor } from "colorthief";
import { useRouter } from 'next/navigation';

export const Card = ({ i, data }) => {
    const [color, setColor] = useState(null);
    const [rotate, setRotate] = useState(false);
    const imgRef = useRef(null);
    const router = useRouter();

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
        
        if (img.complete) {
            extractColor(img);
        }
    }, []);

    return (
        <div
            className="noutati_card"
            onMouseEnter={() => setRotate(true)}
            onMouseLeave={() => setRotate(false)}
            onClick={()=>router.push(`/produs/${data.id}`)}
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
                    <VinylDisk className='diskVi' img={`/api/image-proxy?url=${encodeURIComponent(data.cover_image)}`} color={color} spin={rotate} />
                </div>
            </Reveal>
        </div>
    );
};