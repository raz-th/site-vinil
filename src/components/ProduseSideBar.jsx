'use client';
import { genuri_muzicale } from '@/config/site';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const toateGenurile = Object.keys(genuri_muzicale)
// console.log(toateGenurile)
// const genuri = [
//     { label: 'Rock', count: 6 },
//     { label: 'Folk Rock', count: 3 },
//     { label: 'Jazz, Rock, Blues', count: 3 },
//     { label: 'Hard Rock', count: 2 },
//     { label: 'Electronic, Rock, Pop', count: 1 },
// ];

const producatori = [
    { label: '143 Records', count: 1 },
    { label: 'A&A Records', count: 8 },
    { label: 'A&M Records', count: 4 },
    { label: 'Atlantic Records', count: 12 },
    { label: 'Blue Note', count: 7 },
];

const ProduseSideBar = ({ id }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [inStoc, setInStoc] = useState(false);
    const [genSelect, setGenSelect] = useState(
        () => searchParams.get('styles')?.split(',').filter(Boolean) || []
    );
    const [prodSelect, setProdSelect] = useState([]);
    const [genuri, setGenuri] = useState([]);


    const toggleArr = (arr, setArr, val) =>
        setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // skip la mount
        }

        const params = new URLSearchParams(searchParams.toString());

        if (genSelect.length > 0) {
            params.set('styles', genSelect.join(','));
        } else {
            params.delete('styles');
        }
        router.push(`?${params.toString()}`);

    }, [genSelect]);

    useEffect(() => {
        if (id) setGenuri(genuri_muzicale[id].styles)
        else {
            // let t = []
            // Object.keys(genuri_muzicale).map((v) =>genuri_muzicale[v].styles.map((v)=>t = [...t, v]))
            setGenuri(["Classic Rock", "Hip Hop", "Pop", "Electronic, Rock", "Electronic"])
        }
        
        // console.log(genuri_muzicale[id].styles)
    }, [id])

    return (
        <aside className="sidebar" >

            <div className="sideSection">
                <h2 className="sideSectionTitle">Genuri</h2>
                <ul className="sideLinks">
                    {toateGenurile.map((g, i) => (
                        <li key={i}>
                            <a
                                href={`/genere/${g.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('&', '').replace(/\s+/g, '-')}`}
                                className={g.toLowerCase() === id ? 'active' : ''}
                            >
                                {genuri_muzicale[g].label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sideSection">
                <h2 className="sideSectionTitle">Status stoc</h2>
                <div className="filterGroup">
                    <label className="filterCheckbox">
                        <input
                            type="checkbox"
                            checked={inStoc}
                            onChange={() => setInStoc((v) => !v)}
                        />
                        În stoc
                        <span className="filterCount">(361)</span>
                    </label>
                </div>
            </div>

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
                            {/* <span className="filterCount">({g.count})</span> */}
                        </label>
                    ))}
                </div>
            </div>

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
}

export default ProduseSideBar;
