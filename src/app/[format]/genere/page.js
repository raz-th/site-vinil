import DiscuriVinil from './DiscuriVinil';
import Footer from '@/components/MainPage/Footer';
import { adminDb } from '@/lib/firebaseAdmin';
import { formatMap, formatari } from '@/config/site';

export function generateStaticParams() {
  return formatari.map((format) => ({ format }));
}

const Page = async ({ params, searchParams }) => {
  const { format } = await params;
  const { styles, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const perPage = 24;

  const stylesArray = styles ? styles.split(',').map(v => v.trim()) : null;
  const formatFiltrat = formatMap[format] || null;

  let baseQuery = adminDb.collection('releases').orderBy('date_added', 'desc');

  if (stylesArray) {
    baseQuery = baseQuery.where('styles', 'array-contains-any', stylesArray);
  }

  if (formatFiltrat) {
    baseQuery = baseQuery.where('format', '==', formatFiltrat);
  }

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
      <DiscuriVinil format={format} produse={produse} infoPagina={infoPagina} />
      <Footer />
    </>
  );
};

export default Page;