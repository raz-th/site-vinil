'use client';
import VinylDisk from '@/components/Discuri/VinylDisk';
import React, { useEffect, useState } from 'react';

const Loading = () => {
    const [show, setShow] = useState(true);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        document.body.classList.add('no-scroll'); // <-- add it on mount

        const hideTimer = setTimeout(() => {
            setShow(false);
            document.body.classList.remove('no-scroll');
            const unmountTimer = setTimeout(() => {
                setMounted(false);
            }, 250);
            return () => clearTimeout(unmountTimer);
        }, 600);

        return () => {
            clearTimeout(hideTimer);
            document.body.classList.remove('no-scroll'); // safety cleanup
        };
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