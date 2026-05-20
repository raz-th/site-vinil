import React from 'react';
import './ProdusStyle.css'
import ProdusPage from './ProdusPage';
import { supabase } from '@/lib/supabase';
import { IoMdArrowRoundBack } from 'react-icons/io';

export async function generateMetadata({ params }) {
    const { id } = await params;

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            return {
                title: 'Produs negăsit',
                description: 'Produsul căutat nu există în inventarul nostru.',
            };
        }

        const artist = data.artist || '';
        const title = data.title || '';
        const year = data.year || '';
        const format = data.format || '';
        const country = data.country || '';

        return {
            title: `${artist} – ${title} (${year}) | Vinil1.ro`,
            description: `Cumpără ${format} "${title}" de ${artist}, lansat în ${year} în ${country}. Disponibil în stoc pe Vinil1.ro.`,
            openGraph: {
                title: `${artist} – ${title}`,
                description: `${format} · ${year} · ${country}`,
                images: [{ url: data.cover_image || data.thumb || '' }],
            },
        };
    } catch (error) {
        return {
            title: 'Vinil1.ro',
            description: 'Magazin de muzică fizică — viniluri, CD-uri, casete.',
        };
    }
}

const Page = async ({ params }) => {
    const { id } = await params;

    try {
        const { data: dbData, error: dbError } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (dbError || !dbData) {
            return (
                <div className="not-found-container">
                    <div className="not-found-content">
                        <span className="not-found-icon">🎵</span>
                        <h1>Produs negăsit</h1>
                        <p>Produsul cu ID-ul <strong>{id}</strong> nu există în inventarul nostru.</p>
                        <a href="/toate/genere" className="not-found-btn"><IoMdArrowRoundBack /> Înapoi la catalog</a>
                    </div>
                </div>
            );
        }

        const response = await fetch(`https://api.discogs.com/releases/${id}`, {
            headers: { 'User-Agent': 'YourAppName/1.0' },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }

        const data = await response.json();

        data.format = dbData.format;
        data.format_desc = dbData.format_desc;

        return <ProdusPage produs={{
            title: dbData.title || "",
            year: dbData.year || "",
            country: dbData.country || "",
            genres: dbData.genres || data.genres || [],
            styles: dbData.styles || data.styles || [],
            tracklist: data.tracklist || [],
            artist: dbData.artist || [],
            label: dbData.label || [],
            images: data.images || [],
            notes: data.notes || "",
            videos: data.videos,
            price: dbData.price || "N/A",
            stock: dbData.stock || 0,
            format: dbData.format || "N/A",
            format_desc: dbData.format_desc || "",
            description: dbData.description || "",
            cover_image: dbData.cover_image || "",
            stare: {
                stare_coperta: dbData.stare_coperta || "nesetat",
                stare_disc: dbData.stare_disc || "nesetat"
            },
            oferta_activa: dbData.oferta_activa || false,
            oferta_procent: dbData.oferta_procent || 0,
        }} />

    } catch (error) {
        console.error(error);
        return <div>Ceva a mers prost.</div>
    }
}

export default Page;