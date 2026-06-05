'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Pagination = ({ currentPage, totalPagini }) => {
    const searchParams = useSearchParams();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        
        checkMobile();
        
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const paginatie = () => {
        const pages = [];

        const maxVisible = isMobile ? 4 : 7;

        pages.push(1);

        if (currentPage > 2) {
            pages.push("...");
        }

        const offset = Math.floor(maxVisible / 2);
        const start = Math.max(2, currentPage - offset);
        const end = Math.min(totalPagini - 1, currentPage + offset);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPagini - 1) {
            pages.push("...");
        }

        if (totalPagini > 1) {
            pages.push(totalPagini);
        }

        return [...new Set(pages)];
    };

    const buildPageUrl = (page) => {
        const params = new URLSearchParams(searchParams.toString());

        if (page > 1) {
            params.set('page', page);
        } else {
            params.delete('page');
        }

        return `?${params.toString()}`;
    };

    return (
        <div className="pagination">
            {currentPage > 1 ? (
                <a className="pageBtn" href={buildPageUrl(currentPage - 1)}>
                    ‹
                </a>
            ) : (
                <p className="pageBtn disabled">‹</p>
            )}

            {paginatie().map((n, i) => (
                n !== "..." ? (
                    <a
                        key={i} 
                        href={buildPageUrl(n)}
                        className={`pageBtn ${n === currentPage ? 'active' : ''}`}
                    >
                        {n}
                    </a>
                ) : (
                    <p key={`ellipsis-${i}`} className="pageBtn" style={{ cursor: "unset" }}>
                        ...
                    </p>
                )
            ))}

            {currentPage < totalPagini ? (
                <a className="pageBtn" href={buildPageUrl(currentPage + 1)}>
                    ›
                </a>
            ) : (
                <p className="pageBtn disabled">›</p>
            )}
        </div>
    );
};

export default Pagination;