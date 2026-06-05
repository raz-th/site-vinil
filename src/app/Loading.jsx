'use client';
import VinylDisk from '@/components/Discuri/VinylDisk';
import React, { useEffect, useState } from 'react';

const Loading = () => {
    const [show, setShow] = useState(true);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        document.body.classList.remove('no-scroll');

        setTimeout(() => {
            setShow(false);
            setTimeout(() => {
                setMounted(false);
            }, 250);
        }, 600);


    }, []);

    if (!mounted) return null;
    return (
        <div className={`loadingContainer ${show ? "show" : ""}`}>
            <VinylDisk spin={true} color='#eec99d' />
            <div className='loadingContent'>
                <h1>Se încarcă...</h1>
                <p>Vă rugăm să așteptați</p>
                <div className="soundwave">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>

        </div>
    )
}

export default Loading;
