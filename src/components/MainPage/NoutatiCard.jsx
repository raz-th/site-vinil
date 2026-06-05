'use client';
import React, { useState } from 'react';
import { Reveal } from '../Reveal';
import VinylDisk from '../Discuri/VinylDisk';
import Image from 'next/image';

export const Card = ({ i, data }) => {
    const [rotate, setRotate] = useState(false);

    if (!data) return null;

    const imageUrl = data.cover_image;

    return (
        <a
            className="noutati_card"
            onMouseEnter={() => setRotate(true)}
            onMouseLeave={() => setRotate(false)}
            href={`/produs/${data.id}`}
        >
            <Reveal delay={i * 100 + 200}>
                <Image
                    src={imageUrl}
                    alt={data.title || "Copertă album"}
                    width={400} 
                    height={400}
                    priority={i < 4}
                />

                <div className="disk">
                    <VinylDisk 
                        className='diskVi' 
                        img={imageUrl}
                        spin={rotate} 
                    />
                </div>
            </Reveal>
        </a>
    );
};