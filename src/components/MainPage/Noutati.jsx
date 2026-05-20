import './Noutati.css'
import { FaChevronRight } from "react-icons/fa";
import { supabase } from '@/lib/supabase';
import { Reveal } from '../Reveal';
import { Card } from './NoutatiCard';

const Noutati = async () => {
    // Interogăm tabela "products" din Supabase
    const { data: nouStuff, error } = await supabase
        .from('products')
        .select('*')
        .eq('format', 'Vinyl')
        .order('date_added', { ascending: false })
        .range(0, 3);

    if (error) {
        console.error("Error fetching recent products from Supabase:", error.message);
    }

    const produseNoi = nouStuff || [];

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
                        <a href='/vinil?sort=noutati'>Vezi mai multe <FaChevronRight /></a>
                    </div>
                </Reveal>
                <div className='noutati_content_container'>
                    <div className='noutati_content'>
                        {
                            produseNoi.map((v, i) => (
                                <Card data={v} key={v.id || i} i={i} />
                            ))
                        }
                        {/* Cardurile tale placeholder rămân neschimbate */}
                        {/* <Card i={0} imgNum={1} />
                        <Card i={1} imgNum={2} />
                        <Card i={2} imgNum={3} />
                        <Card i={3} imgNum={4} /> */}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Noutati;