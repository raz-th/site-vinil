'use client'

import React, { useState } from 'react';
import { Reveal } from '../Reveal';
import { FaChevronRight } from 'react-icons/fa';
import VinylDisk from '../Discuri/VinylDisk';
import CDDisk from '../Discuri/CDDisk';
import Cassette from '../Discuri/Cassette';
import NewspaperBook from '../Discuri/NewspaperBook';

import './Exploreaza.css';

const ExploreazaFormatari = () => {
    const [spin, setSpin] = useState({ vinil: false, cd: false, cas: false, nou: false })
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <section className='explo_container'>
                <Reveal>
                    <div className='feat_header'>
                        <h2>EXPLOREAZĂ</h2>
                        <div className='linie' />
                        <a href='/toate/genere'>Vezi mai multe <FaChevronRight /></a>
                    </div>
                </Reveal>
                
                <div className='explor_grid'>
                    {/* VINIL */}
                    <Reveal>
                        <a className='explor_item'
                            onMouseEnter={() => setSpin((e) => ({ ...e, vinil: true }))}
                            onMouseLeave={() => setSpin((e) => ({ ...e, vinil: false }))}
                            href='/vinil/genere'
                        >
                            <div className="explor_media_wrapper">
                                <VinylDisk spin={spin.vinil} />
                            </div>
                            <div className="explor_text_wrapper">
                                <h3>Viniluri</h3>
                                <p>DISCURI DE 12"</p>
                            </div>
                        </a>
                    </Reveal>

                    {/* CD */}
                    <Reveal>
                        <a className='explor_item'
                            onMouseEnter={() => setSpin((e) => ({ ...e, cd: true }))}
                            onMouseLeave={() => setSpin((e) => ({ ...e, cd: false }))}
                            href='/cd/genere'
                        >
                            <div className="explor_media_wrapper">
                                <CDDisk spin={spin.cd} />
                            </div>
                            <div className="explor_text_wrapper">
                                <h3>CD-uri</h3>
                                <p>COMPACT DISCS</p>
                            </div>
                        </a>
                    </Reveal>

                    {/* CASETĂ */}
                    <Reveal>
                        <a className='explor_item'
                            onMouseEnter={() => setSpin((e) => ({ ...e, cas: true }))}
                            onMouseLeave={() => setSpin((e) => ({ ...e, cas: false }))}
                            href='/casete/genere'
                        >
                            <div className="explor_media_wrapper">
                                <Cassette spin={spin.cas} />
                            </div>
                            <div className="explor_text_wrapper">
                                <h3>Casete</h3>
                                <p>BENZI MAGNETICE</p>
                            </div>
                        </a>
                    </Reveal>

                    {/* NOUTĂȚI */}
                    <Reveal>
                        <a className='explor_item'
                            onMouseEnter={() => setSpin((e) => ({ ...e, nou: true }))}
                            onMouseLeave={() => setSpin((e) => ({ ...e, nou: false }))}
                            href='/toate/genere?sort=noutati'
                        >
                            <div className="explor_media_wrapper">
                                <NewspaperBook spin={spin.nou} />
                            </div>
                            <div className="explor_text_wrapper">
                                <h3>Noutăți</h3>
                                <p>CRONICA ZILEI</p>
                            </div>
                        </a>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}

export default ExploreazaFormatari;