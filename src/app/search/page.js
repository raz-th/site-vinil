import { supabase } from '@/lib/supabase';
import React from 'react';
import SearchClient from './SearchClient';
import { formatMap } from '@/config/site';

export async function generateMetadata({ searchParams }) {
    const params = await searchParams;
    const q = params?.q || '';

    return {
        title: q ? `Rezultate pentru "${q}" | Vinil1.ro` : 'Căutare | Vinil1.ro',
        description: q
            ? `Rezultate căutare pentru "${q}" pe Vinil1.ro — viniluri, CD-uri, casete.`
            : 'Caută în colecția Vinil1.ro.',
    };
}

const Page = async ({ searchParams }) => {
  const { q, page, format, genres } = await searchParams;

  const searchTerm = q?.trim() || '';
  const currentPage = Number(page) || 1;
  const perPage = 24;
  const from = (currentPage - 1) * perPage;
  const to = from + perPage - 1;

  const genresArray = genres || null;
  const formatFiltrat = formatMap[format] || null;

  let releases = [];
  let totalProduse = 0;

  let query = supabase
    .from('products')
    .select('*', { count: 'exact' });

  if (searchTerm) {
    query = query.or(`title.ilike.%${searchTerm}%,artist.ilike.%${searchTerm}%`);

    if (formatFiltrat) {
      query = query.eq('format', formatFiltrat);
    }

    if (genresArray && genresArray !== 'toate') {
      query = query.overlaps('genres', [genresArray]);
    }

    const { data, count, error } = await query
      .order('date_added', { ascending: false })
      .range(from, to);

    if (error) console.error(error.message);

    releases = data || [];
    totalProduse = count || 0;

  } else {
    if (formatFiltrat && formatFiltrat !== 'toate') {
      query = query.eq('format', formatFiltrat);
    }

    if (genresArray) {
      query = query.overlaps('genres', [genresArray]);
    }

    const { data, count, error } = await query
      .order('date_added', { ascending: false })
      .range(from, to);

    if (error) console.error(error.message);

    releases = data || [];
    totalProduse = count || 0;
  }

  const infoPagina = {
    total: totalProduse,
    deLa: totalProduse === 0 ? 0 : from + 1,
    panaLa: Math.min(to + 1, totalProduse),
    currentPage,
    perPage,
  };

  return (
    <SearchClient
      q={q}
      id={null}
      format={"toate"}
      produse={releases}
      infoPagina={infoPagina}
    />
  );
};

export default Page;