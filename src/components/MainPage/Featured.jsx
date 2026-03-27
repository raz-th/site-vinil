import React from 'react';
import "./Featured.css"
import { FaChevronRight } from "react-icons/fa";
import { TextBanner } from '../Icons';
import { Reveal } from '../Reveal';





const Card = ({ color = "#2d241ae7", label, imgNum = 0, i }) => {


    const imgs = [
        '/assets/classicRock.jpg',
        '/assets/jazz.jpg',
        '/assets/soul.jpg'
    ]
    const hrefs = [
        "/genere/rock",
        "/genere/jazz-blues",
        "/genere/soul-funk"
    ]
    return (
        <Reveal delay={i * 100 + 200}>
            <div className='feat_card'>
                <a href={hrefs[imgNum]}>
                    <img src={imgs[imgNum]} />
                    <div className='feat_card_banner'>
                        <TextBanner color={color} size={80} />
                        <p className='feat_card_banner_txt'>{label}</p>
                    </div>
                </a>
            </div>

        </Reveal>
    )
}

const Featured = () => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }}>
            <section className='feat_container'>
                <Reveal>
                    <div className='feat_header'>
                        <h2>COLECȚII RECOMANDATE</h2>
                        <div className='linie' />
                        <a href='/#'>Vezi mai multe <FaChevronRight /></a>
                    </div>
                </Reveal>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div className='feat_content'>
                        <Card label={'Classic Rock'} i={0} imgNum={0} color='rgba(45, 36, 26, 0.91)' />
                        <Card label={'Jazz & Blues'} i={1} imgNum={1} color='rgba(49, 89, 109, 0.91)' />
                        <Card label={'Soul & Funk'} i={2} imgNum={2} color='rgba(134, 49, 25, 0.91)' />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Featured;
