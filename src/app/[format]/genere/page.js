import DiscuriVinil from './DiscuriVinil';
import { supabase } from '@/lib/supabase';
import { formatMap, formatari } from '@/config/site';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return formatari.map((format) => ({ format }));
}

export async function generateMetadata({ params }) { 
  const { format } = await params;
  const formatName = formatMap[format] || format;

  return {
    title: `Genuri muzicale - ${formatName} | Vinil1.ro`,
    description: `Explorează genurile muzicale disponibile pentru ${formatName.toLowerCase()} pe Vinil1.ro.`,
  };
}

const Page = async ({ params, searchParams }) => {
  const { format } = await params;
  const { styles, page, sort } = await searchParams;
  
  const currentPage = Number(page) || 1;
  const perPage = 24;
  const from = (currentPage - 1) * perPage;
  const to = from + perPage - 1;

  const stylesArray = styles ? styles.split(',').map(v => v.trim()) : null;
  const formatFiltrat = formatMap[format] || null;


  let query = supabase
    .from('products')
    .select('*', { count: 'exact' });


  if (formatFiltrat) {
    query = query.eq('format', formatFiltrat);
  }

  if (stylesArray && stylesArray.length > 0) {
    query = query.overlaps('styles', stylesArray);
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
    console.error("Error fetching data from Supabase:", error.message);
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
        <DiscuriVinil format={format} produse={produse || []} infoPagina={infoPagina} />
      </Suspense>

    </>
  );
};

export default Page;