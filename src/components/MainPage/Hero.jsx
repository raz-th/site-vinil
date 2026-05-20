import React from 'react';
import './Hero.css'
// import Image from 'next/image';
import { WaveDivider, WaveDividerMobile } from '../Icons';
import { Reveal } from '../Reveal';
import VinylDisk from '../VinylDisk';


const Hero = () => {
    return (
        <div className="home_hero">
            <div className="wave-container">
                <WaveDivider noiseIntensity={1}
                    blendMode="soft-light" />
                <div className='hero_content'>
                    <div style={
                        {
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            // alignItems: 'center',
                            // justifyContent: 'center'
                            padding: "3rem 1rem",
                        }}>
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
                    {/* <div className='dreapta'>
                        <img className='album' src='http://localhost:3000/api/image-proxy?url=https%3A%2F%2Fi.discogs.com%2F6oo3CZ1iL87g4zw-rSPkCgLFmq3QsOCYKFUdzkahANw%2Frs%3Afit%2Fg%3Asm%2Fq%3A90%2Fh%3A600%2Fw%3A600%2FczM6Ly9kaXNjb2dz%2FLWRhdGFiYXNlLWlt%2FYWdlcy9SLTEyODg5%2FMDcxLTE1NDM5MTUw%2FMDEtNjQ1Ni5qcGVn.jpeg' />
                        <div className='vinil-wrapper'>
                            <VinylDisk className='vinil' img='http://localhost:3000/api/image-proxy?url=https%3A%2F%2Fi.discogs.com%2F6oo3CZ1iL87g4zw-rSPkCgLFmq3QsOCYKFUdzkahANw%2Frs%3Afit%2Fg%3Asm%2Fq%3A90%2Fh%3A600%2Fw%3A600%2FczM6Ly9kaXNjb2dz%2FLWRhdGFiYXNlLWlt%2FYWdlcy9SLTEyODg5%2FMDcxLTE1NDM5MTUw%2FMDEtNjQ1Ni5qcGVn.jpeg' />
                        </div>
                    </div> */}
                    <div className='img'>
                        <Reveal delay={600}><img src={"/assets/vinilplayer.png"} /></Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
