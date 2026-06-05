import React from 'react';
import './Hero.css'
// import Image from 'next/image';
import { WaveDivider, WaveDividerMobile } from '../Icons';
import { Reveal } from '../Reveal';
import VinylDisk from '../Discuri/VinylDisk';


const Hero = () => {
    return (
        <div className="home_hero">
            <div className="wave-container">
                <WaveDivider noiseIntensity={1}
                    blendMode="soft-light" />
                <div className='hero_content'>
                    <div className='hero_nj' >
                        <Reveal>
                            <h1>DESCOPERĂ<br />SUNETUL VINILULUI<hr style={{ width: "100%" }} /></h1>
                        </Reveal>

                        <Reveal delay={200}>
                            <h3>Explorează colecția noastră de discuri clasice și lansări noi.</h3>
                        </Reveal>
                        <Reveal delay={400}>
                            <a className='button' href='/toate/genere'>CUMPĂRĂ ACUM</a>
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
                    {/* <div className='img'>
                        <Reveal delay={600}><img src={"/assets/vinilplayer.png"} /></Reveal>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Hero;
