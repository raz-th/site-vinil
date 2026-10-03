import React from 'react';
import './Hero.css'
// import Image from 'next/image';
import { WaveDivider, WaveDividerMobile } from '../Icons';
import { Reveal } from '../Reveal';
import VinylDisk from '../Discuri/VinylDisk';
import { PiVinylRecord } from 'react-icons/pi';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa';
import SearchBar from '../SearchBar/SearchBar';
import { TransitionLink } from '../TransitionLink';


const Hero = () => {
    return (
        <div className="home_hero">
            <div className="wave-container">

                <WaveDivider className="waveDivider" noiseIntensity={1} blendMode="soft-light" />
                <div className='hero_content'>
                    <div className='hero_nj'>
                        <Reveal>
                            <h1>Comori vintage & <br />presaje originale</h1>
                        </Reveal>

                        <Reveal delay={200}>
                            <h3>Descoperă viniluri, CD-uri și casete atent selecționate.<br />Produse verificate, fotografii reale și stoc actualizat săptămânal.</h3>
                        </Reveal>

                        <Reveal delay={300}>
                            <div className="hero_content_features_grid">
                                <div className="hero_content_feature_item">
                                    <PiVinylRecord />
                                    <p>Presaje<br />originale</p>
                                </div>
                                <div className="hero_content_feature_item">
                                    <FaMagnifyingGlass />
                                    <p>Produse<br />inspectate</p>
                                </div>
                                <div className="hero_content_feature_item">
                                    <TbTruckDelivery />
                                    <p>Livrare<br />rapidă</p>
                                </div>
                                <div className="hero_content_feature_item">
                                    <MdOutlinePhotoCamera />
                                    <p>Fotografii<br />reale</p>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={400}>
                            <div className='hero_content_buttons'>
                                <TransitionLink className='button' href='/toate/genere'>Descopera colecția</TransitionLink>
                              
                                <TransitionLink className='button2' href='/toate/genere'>Vezi noutăți<FaArrowRight /></TransitionLink>
                            </div>
                        </Reveal>
                        <Reveal delay={500}>
                            <SearchBar />
                        </Reveal>
                    </div>
                    <div className='dreapta'>
                        <Reveal>
                            <div className="album-wrapper">
                                <VinylDisk className='vinil' img='https://i.discogs.com/6oo3CZ1iL87g4zw-rSPkCgLFmq3QsOCYKFUdzkahANw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyODg5/MDcxLTE1NDM5MTUw/MDEtNjQ1Ni5qcGVn.jpeg' />
                                <img className='album' src='https://i.discogs.com/6oo3CZ1iL87g4zw-rSPkCgLFmq3QsOCYKFUdzkahANw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyODg5/MDcxLTE1NDM5MTUw/MDEtNjQ1Ni5qcGVn.jpeg' />
                                <img className='album2' src='https://i.discogs.com/3j4G7HZAdVjQOgmu6pHnL3fpzhPFty_iPdiKQBS-F1c/rs:fit/g:sm/q:90/h:600/w:597/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNzM4/MTMtMTE5MDEzNzA2/MC5qcGVn.jpeg' />
                                <img className='album3' src='https://i.discogs.com/ZN8kIuAonS37EQ6edn75PqTHxP6MdXqJ_w3Pchuay6I/rs:fit/g:sm/q:90/h:597/w:599/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgyNjMw/MjUtMTQ1ODIxNTMw/NS0xOTIzLmpwZWc.jpeg' />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;