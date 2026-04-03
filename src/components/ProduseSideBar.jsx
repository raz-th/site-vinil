'use client';

import { genuri_muzicale } from '@/config/site';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const toateGenurile = Object.keys(genuri_muzicale);

const producatori = [
    { label: '143 Records', count: 1 },
    { label: 'A&A Records', count: 8 },
    { label: 'A&M Records', count: 4 },
    { label: 'Atlantic Records', count: 12 },
    { label: 'Blue Note', count: 7 },
];

const formatari = [
    { label: 'Vinil', value: 'vinil' },
    { label: 'CD', value: 'cd' },
    { label: 'Casetă', value: 'caseta' },
    { label: 'DVD', value: 'dvd' },
    { label: 'Blu-ray', value: 'bluray' },
];

const ProduseSideBar = ({ search = false, id, format }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [inStoc, setInStoc] = useState(false);
    const [genSelect, setGenSelect] = useState(
        () => searchParams.get('styles')?.split(',').filter(Boolean) || []
    );
    const [prodSelect, setProdSelect] = useState([]);
    const [genuri, setGenuri] = useState([]);

    const isFirstRender = useRef(true);

    const currentGenre = searchParams.get('genres') || '';
    const currentFormat = searchParams.get('format') || '';

    // 🔥 helper pentru update params
    const updateParam = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value && value !== 'toate') {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        params.delete('page'); // reset pagination
        router.push(`?${params.toString()}`);
    };

    const toggleArr = (arr, setArr, val) =>
        setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

    // 🔁 styles (checkboxuri)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const params = new URLSearchParams(searchParams.toString());

        if (genSelect.length > 0) {
            params.set('styles', genSelect.join(','));
        } else {
            params.delete('styles');
        }

        params.delete('page');
        router.push(`?${params.toString()}`);
    }, [genSelect]);

    // 🔁 genuri list
    useEffect(() => {
        if (id && genuri_muzicale[id]) {
            setGenuri(genuri_muzicale[id].styles);
        } else {
            setGenuri(["Classic Rock", "Hip Hop", "Pop", "Electronic"]);
        }
    }, [id]);

    return (
        <aside className="sidebar">

            {/* ── GENURI ── */}
            <div className="sideSection">
                <h2 className="sideSectionTitle">Genuri</h2>
                <ul className="sideLinks">

                    {/* Toate */}
                    <li>
                        {search ? (
                            <a
                                onClick={() => updateParam('genres', null)}
                                className={!currentGenre ? 'active' : ''}
                            >
                                Toate
                            </a>
                        ) : (
                            <a
                                href={`/${format}/genere`}
                                className={!id ? 'active' : ''}
                            >
                                Toate
                            </a>
                        )}
                    </li>

                    {/* Lista genuri */}
                    {toateGenurile.map((g, i) => {
                        const genreId = genuri_muzicale[g].id;

                        return (
                            <li key={i}>
                                {search ? (
                                    <a
                                        onClick={() => updateParam('genres', genreId)}
                                        className={currentGenre === genreId ? 'active' : ''}
                                    >
                                        {genuri_muzicale[g].label}
                                    </a>
                                ) : (
                                    <a
                                        href={`/${format}/genere/${g
                                            .toLowerCase()
                                            .normalize("NFD")
                                            .replace(/[\u0300-\u036f]/g, "")
                                            .replace('&', '')
                                            .replace(/\s+/g, '-')}`}
                                        className={g.toLowerCase() === id ? 'active' : ''}
                                    >
                                        {genuri_muzicale[g].label}
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* ── STATUS STOC ── */}
            <div className="sideSection">
                <h2 className="sideSectionTitle">Status stoc</h2>
                <div className="filterGroup">
                    <label className="filterCheckbox">
                        <input
                            type="checkbox"
                            checked={inStoc}
                            onChange={() => setInStoc(v => !v)}
                        />
                        În stoc
                        <span className="filterCount">(361)</span>
                    </label>
                </div>
            </div>

            {/* ── FORMAT ── */}
            <div className="sideSection">
                <h2 className="sideSectionTitle">Format</h2>
                <ul className="sideLinks">

                    {/* Toate */}
                    <li>
                        {search ? (
                            <a
                                onClick={() => updateParam('format', null)}
                                className={!currentFormat ? 'active' : ''}
                            >
                                Toate
                            </a>
                        ) : (
                            <a
                                href={`/toate/genere${id ? `/${id}` : ''}`}
                                className={format === 'toate' ? 'active' : ''}
                            >
                                Toate
                            </a>
                        )}
                    </li>

                    {/* Lista formate */}
                    {formatari.map((f) => (
                        <li key={f.value}>
                            {search ? (
                                <a
                                    onClick={() => updateParam('format', f.value)}
                                    className={currentFormat === f.value ? 'active' : ''}
                                >
                                    {f.label}
                                </a>
                            ) : (
                                <a
                                    href={`/${f.value}/genere${id ? `/${id}` : ''}`}
                                    className={format === f.value ? 'active' : ''}
                                >
                                    {f.label}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* ── STYLES ── */}
            <div className="sideSection">
                <h2 className="sideSectionTitle">Gen</h2>
                <div className="filterGroup">
                    {genuri.map((g, i) => (
                        <label key={i} className="filterCheckbox">
                            <input
                                type="checkbox"
                                checked={genSelect.includes(g)}
                                onChange={() => toggleArr(genSelect, setGenSelect, g)}
                            />
                            {g}
                        </label>
                    ))}
                </div>
            </div>

            {/* ── PRODUCATORI ── */}
            <div className="sideSection">
                <h2 className="sideSectionTitle">Producători</h2>
                <div className="filterGroup">
                    {producatori.map((p) => (
                        <label key={p.label} className="filterCheckbox">
                            <input
                                type="checkbox"
                                checked={prodSelect.includes(p.label)}
                                onChange={() => toggleArr(prodSelect, setProdSelect, p.label)}
                            />
                            {p.label}
                            <span className="filterCount">({p.count})</span>
                        </label>
                    ))}
                </div>
            </div>

        </aside>
    );
};

export default ProduseSideBar;