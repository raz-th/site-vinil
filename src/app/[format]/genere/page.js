import DiscuriVinil from './DiscuriVinil';
import Footer from '@/components/MainPage/Footer';
import { adminDb } from '@/lib/firebaseAdmin';
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
  console.log(sortOption)
  let baseQuery = adminDb.collection('releases');

  if (stylesArray) {
    baseQuery = baseQuery.where('styles', 'array-contains-any', stylesArray);
  }
  if (formatFiltrat) {
    baseQuery = baseQuery.where('format', '==', formatFiltrat);
  }

  baseQuery = baseQuery.orderBy(sortOption.field, sortOption.dir);

  let q = baseQuery.limit(perPage);

  if (currentPage > 1) {
    const skipSnapshot = await baseQuery.limit((currentPage - 1) * perPage).get();
    const lastDoc = skipSnapshot.docs[skipSnapshot.docs.length - 1];
    if (lastDoc) {
      q = baseQuery.startAfter(lastDoc).limit(perPage);
    }
  }

  let countQuery = adminDb.collection('releases');
  if (formatFiltrat) {
    countQuery = countQuery.where('format', '==', formatFiltrat);
  }
  if (stylesArray) {
    countQuery = countQuery.where('styles', 'array-contains-any', stylesArray);
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
        <DiscuriVinil format={format} produse={produse} infoPagina={infoPagina} />
      </Suspense>
      <Footer />
    </>
  );
};

export default Page;