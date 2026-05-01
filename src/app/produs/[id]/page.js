import React from 'react';
import './ProdusStyle.css'
import ProdusPage from './ProdusPage';
import { adminDb } from '@/lib/firebaseAdmin';
import { IoMdArrowRoundBack } from 'react-icons/io';

export async function generateMetadata({ params }) {
    const { id } = await params;

    try {
        const dbRef = adminDb.collection('releases').doc(id);
        const dbDoc = await dbRef.get();

        if (!dbDoc.exists) {
            return {
                title: 'Produs negăsit',
                description: 'Produsul căutat nu există în inventarul nostru.',
            };
        }

        const data = dbDoc.data();
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
                images: [{ url: data.cover_image || '' }],
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
        const dbRef = adminDb.collection('releases').doc(id);
        const dbDoc = await dbRef.get();

        if (!dbDoc.exists) {
            return (
                <div className="not-found-container">
                    <div className="not-found-content">
                        <span className="not-found-icon">🎵</span>
                        <h1>Produs negăsit</h1>
                        <p>Produsul cu ID-ul <strong>{id}</strong> nu există în inventarul nostru.</p>
                        <a href="/toate/genere" className="not-found-btn"><IoMdArrowRoundBack/> Înapoi la catalog</a>
                    </div>
                </div>
            );
        }

        const dbData = dbDoc.data();

        const response = await fetch(`https://api.discogs.com/releases/${id}`, {
            headers: { 'User-Agent': 'YourAppName/1.0' },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }

        const data = await response.json();
        const dbDocData = dbDoc.data();

        data.format = dbDocData.format;
        data.format_desc = dbDocData.format_desc;

        return <ProdusPage produs={{...data, price: dbData.price || "N/A", stock: dbData.stock || 0}} />

    } catch (error) {
        console.error(error);
        return <div>Ceva a mers prost.</div>
    }
}

export default Page;
