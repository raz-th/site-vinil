import DiscuriVinil from './DiscuriVinil';
import { supabase } from '@/lib/supabase';

const ProduseSupabase = async ({ searchParams, formatFiltrat, format }) => {
  const { styles, page, sort } = await searchParams;
  
  const currentPage = Number(page) || 1;
  const perPage = 24;
  const from = (currentPage - 1) * perPage;
  const to = from + perPage - 1;

  const stylesArray = styles ? styles.split(',').map(v => v.trim()) : null;

  // AM CORECTAT AICI: 
  // Folosim 'cover_image' în loc de 'image_url' și adăugăm câmpurile utile (artist, stock, etc.)
  // Omiten intenționat 'description' sau 'images' pentru a face interogarea rapidă.
  let query = supabase
    .from('products')
    .select('id, title, artist, price, cover_image, format, styles, date_added, stock, stare_coperta, stare_disc, oferta_activa, oferta_procent', { count: 'exact' })
    .eq('visible', true);

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
    <DiscuriVinil 
      format={format} 
      produse={produse || []} 
      infoPagina={infoPagina} 
    />
  );
};

export default ProduseSupabase;