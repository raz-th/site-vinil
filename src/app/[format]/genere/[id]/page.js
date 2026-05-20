import GenereClient from './GenereClient';
import { formatari, formatMap, genuri_muzicale } from '@/config/site';
import { supabase } from '@/lib/supabase';
import { Suspense } from 'react';

const genuriParams = Object.keys(genuri_muzicale);

export const dynamic = 'force-dynamic';

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
    const { styles, page, sort } = await searchParams;

    const currentPage = Number(page) || 1;
    const perPage = 24;
    const from = (currentPage - 1) * perPage;
    const to = from + perPage - 1;

    const genData = genuri_muzicale[id];
    const genuriFiltrate = genData?.id ? [genData.id] : [];
    const stylesArray = styles ? styles.split(',').map(v => v.trim()) : null;
    const formatFiltrat = formatMap[format] || null;
    console.log('format param:', format);
    console.log('formatFiltrat:', formatFiltrat);

    let query = supabase
        .from('products')
        .select('*', { count: 'exact' });

    if (formatFiltrat) {
        query = query.eq('format', formatFiltrat);
    }

    if (stylesArray && stylesArray.length > 0) {
        query = query.overlaps('styles', stylesArray);
    } else if (genuriFiltrate.length > 0) {
        query = query.overlaps('genres', genuriFiltrate);
    }


    const sortMap = {
        'pret-crescator': { column: 'price', ascending: true },
        'pret-descrescator': { column: 'price', ascending: false },
        'noutati': { column: 'date_added', ascending: false },
        'nume-az': { column: 'title', ascending: true },
    };
    const sortOption = sortMap[sort] || { column: 'date_added', ascending: false };
    query = query.order(sortOption.column, { ascending: sortOption.ascending });


    const { data: produse, count, error } = await query.range(from, to);

    if (error) {
        console.error("Supabase error fetching products by genre:", error.message);
    }

    const totalProduse = count || 0;

    const infoPagina = {
        total: totalProduse,
        deLa: totalProduse === 0 ? 0 : from + 1,
        panaLa: Math.min(to + 1, totalProduse),
        currentPage,
        perPage,
    };

    return (
        <>
            <Suspense fallback={null}>
                <GenereClient id={id} format={format} infoPagina={infoPagina} produse={produse || []} />
            </Suspense>
        </>
    );
};

export default Page;