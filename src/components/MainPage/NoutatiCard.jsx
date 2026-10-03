'use client';
import React, { useState } from 'react';
import { Reveal } from '../Reveal';
import VinylDisk from '../Discuri/VinylDisk';
import Image from 'next/image';
import { TransitionLink } from '../TransitionLink';

export const Card = ({ i, data }) => {
    const [rotate, setRotate] = useState(false);

    if (!data) return null;

    const imageUrl = data.cover_image;

    return (
        <TransitionLink
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
                <div className="noutati_card_stare">
                    <p>{data.stare_disc} / {data.stare_coperta}</p>
                </div>
                <div className='diskProductInfo'>
                    <div className="diskProductInfo_content">
                        <p className="productArtist">{data.artist}</p>
                        <p className="productName">{data.title}</p>
                        <div className="productMeta">
                            {data.year && <span className="productMetaItem">{data.year}</span>}
                            {data.label && <span className="productMetaItem">{data.label}</span>}
                        </div>
                        {data.country && <span className="productMetaItem">{data.country}</span>}
                        {data.genres?.length > 0 && (
                            <div className="productGenres">
                                {data.genres.map(s => (
                                    <span key={s} className="productGenreTag">{s}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="disk">
                    <VinylDisk
                        className='diskVi'
                        img={imageUrl}
                        spin={rotate}
                    />

                </div>
            </Reveal>
        </TransitionLink>
    );
};