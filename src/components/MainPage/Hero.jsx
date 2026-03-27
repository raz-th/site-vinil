import React from 'react';
import './Hero.css'
// import Image from 'next/image';
import { WaveDivider } from '../Icons';
import { Reveal } from '../Reveal';


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
                             <a className='button' href='/discuri-vinil'>CUMPĂRĂ ACUM</a>
                        </Reveal>
                    </div>
                    <div className='img'>
                        <Reveal delay={600}><img src={"/assets/vinilplayer.png"} /></Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
