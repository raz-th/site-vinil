import GenereClient from './GenereClient';
import Footer from '@/components/MainPage/Footer';
import { formatari, formatMap, genuri_muzicale } from '@/config/site';
import { adminDb } from '@/lib/firebaseAdmin';
import { Suspense } from 'react';

const genuriParams = Object.keys(genuri_muzicale);

export const dynamic = 'force-dynamic'; // <-- adaugă

export function generateStaticParams() {
    const result = [];
    formatari.forEach(format => {
        genuriParams.forEach(id => {
            result.push({ format, id });
        });
    });
    return result;
}

export async function generateMetadata({ params }) {
    const { format, id } = await params;
    const formatName = formatMap[format] || format;
    const genreName = id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    return {
        title: `${genreName} - ${formatName} | Vinil1.ro`,
        description: `${formatName} de ${genreName} disponibile în stoc pe Vinil1.ro.`,
    };
}

const Page = async ({ params, searchParams }) => {
    const { id, format } = await params;
    const { styles, page, sort } = await searchParams; // <-- adaugă sort
    const currentPage = Number(page) || 1;
    const perPage = 24;

    const genData = genuri_muzicale[id];
    const genuriFiltrate = genData?.id ? [genData.id] : [];
    const stylesArray = styles ? styles.split(',').map(v => v.trim()) : null;
    const formatFiltrat = formatMap[format] || null;

    // Sortare
    const sortMap = {
        'pret-crescator': { field: 'price', dir: 'asc' },
        'pret-descrescator': { field: 'price', dir: 'desc' },
        'noutati': { field: 'date_added', dir: 'desc' },
        'nume-az': { field: 'title_lowercase', dir: 'asc' },
    };
    const sortOption = sortMap[sort] || { field: 'date_added', dir: 'desc' };

    // where înainte de orderBy
    let baseQuery = adminDb.collection('releases');

    if (stylesArray) {
        baseQuery = baseQuery.where('styles', 'array-contains-any', stylesArray);
    } else {
        baseQuery = baseQuery.where('genres', 'array-contains-any', genuriFiltrate);
    }

    if (formatFiltrat) {
        baseQuery = baseQuery.where('format', '==', formatFiltrat);
    }

    baseQuery = baseQuery.orderBy(sortOption.field, sortOption.dir); // <-- orderBy după where

    let q = baseQuery.limit(perPage);

    if (currentPage > 1) {
        const skipSnapshot = await baseQuery.limit((currentPage - 1) * perPage).get();
        const lastDoc = skipSnapshot.docs[skipSnapshot.docs.length - 1];
        if (lastDoc) {
            q = baseQuery.startAfter(lastDoc).limit(perPage);
        }
    }

    // count — fix stylesArray
    let countQuery = adminDb.collection('releases');
    if (stylesArray) {
        countQuery = countQuery.where('styles', 'array-contains-any', stylesArray);
    } else {
        countQuery = countQuery.where('genres', 'array-contains-any', genuriFiltrate);
    }
    if (formatFiltrat) {
        countQuery = countQuery.where('format', '==', formatFiltrat);
    }
    const countSnapshot = await countQuery.count().get();
    const totalProduse = countSnapshot.data().count;

    const snapshot = await q.get();
    const produse = snapshot.docs.map(doc => doc.data());

    const infoPagina = {
        total: totalProduse,
        deLa: (currentPage - 1) * perPage + 1,
        panaLa: Math.min(currentPage * perPage, totalProduse),
        currentPage,
        perPage,
    };

    return (
        <>
            <Suspense fallback={null}>
                <GenereClient id={id} format={format} infoPagina={infoPagina} produse={produse} />
            </Suspense>
            <Footer />
        </>
    );
};

export default Page;