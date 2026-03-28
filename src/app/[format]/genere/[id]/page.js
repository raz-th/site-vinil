import GenereClient from './GenereClient';
import Footer from '@/components/MainPage/Footer';
import { formatari, formatMap, genuri_muzicale } from '@/config/site';
import { adminDb } from '@/lib/firebaseAdmin';

const genuriParams = Object.keys(genuri_muzicale);

export function generateStaticParams() {
  const result = [];
  formatari.forEach(format => {
    genuriParams.forEach(id => {
      result.push({ format, id });
    });
  });
  return result;
}

const Page = async ({ params, searchParams }) => {
  const { id, format } = await params;
  const { styles, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const perPage = 24;

  const genData = genuri_muzicale[id];
  const genuriFiltrate = genData?.id ? [genData.id] : [];
  const stylesArray = styles ? styles.split(',').map(v => v.trim()) : null;
  const formatFiltrat = formatMap[format] || null;

  // query de baza
  let baseQuery = adminDb.collection('releases').orderBy('date_added', 'desc');

  if (stylesArray) {
    baseQuery = baseQuery.where('styles', 'array-contains-any', stylesArray);
  } else {
    baseQuery = baseQuery.where('genres', 'array-contains-any', genuriFiltrate);
  }

  // adauga filtru format daca nu e 'toate'
  if (formatFiltrat) {
    baseQuery = baseQuery.where('format', '==', formatFiltrat);
  }

  // paginare
  let q = baseQuery.limit(perPage);

  if (currentPage > 1) {
    const skipSnapshot = await baseQuery.limit((currentPage - 1) * perPage).get();
    const lastDoc = skipSnapshot.docs[skipSnapshot.docs.length - 1];
    if (lastDoc) {
      q = baseQuery.startAfter(lastDoc).limit(perPage);
    }
  }

  // count
  let countQuery = adminDb.collection('releases')
    .where('genres', 'array-contains-any', genuriFiltrate);
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
      <GenereClient id={id} format={format} infoPagina={infoPagina} produse={produse} />
      <Footer />
    </>
  );
};

export default Page;