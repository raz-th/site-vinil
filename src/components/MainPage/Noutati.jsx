import './Noutati.css'
import { FaChevronRight } from "react-icons/fa";
import { adminDb } from '@/lib/firebaseAdmin';
import { Reveal } from '../Reveal';
import { Card } from './NoutatiCard';

const Noutati = async () => {
    const snapshot = await adminDb.collection("releases").orderBy('date_added', 'desc').where('format', '==', "Vinyl")
      .limit(4).get();
      const nouStuff = snapshot.docs.map(doc => doc.data())
    //   console.log(nouStuff)
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }}>
            <section className='noutati_container'>
                <Reveal>
                    <div className='noutati_header'>
                        <h2>ADĂUGATE RECENT ÎN COLECȚIE</h2>
                        <div className='linie' />
                        <a href='/#'>Vezi mai multe <FaChevronRight /></a>
                    </div>
                </Reveal>
                <div
                className='noutati_content_container'
                >
                    <div className='noutati_content'>
                        {
                            nouStuff.map((v, i)=><Card data={v} key={i} i={i}/>)
                        }
                        <Card i={0} imgNum={1} />
                        <Card i={1} imgNum={2} />
                        <Card i={2} imgNum={3} />
                        <Card i={3} imgNum={4} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Noutati;
