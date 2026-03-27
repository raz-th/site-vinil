import GenereClient from './GenereClient';
import Footer from '@/components/MainPage/Footer';
import { genuri_muzicale } from '@/config/site';
import { adminDb } from '@/lib/firebaseAdmin';

const genuriParams = Object.keys(genuri_muzicale);

export function generateStaticParams() {
  return genuriParams.map((id) => ({ id }));
}

const Page = async ({ params, searchParams }) => {
  const { id } = await params;
  const { styles, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const perPage = 24;

  const genData = genuri_muzicale[id];
  const genuriFiltrate = genData?.id ? [genData.id] : [];
  const stylesArray = styles ? styles.split(',').map(v => v.trim()) : null;

  let q;
  if (stylesArray) {
    q = adminDb.collection('releases')
      .where('styles', 'array-contains-any', stylesArray)
      .orderBy('date_added', 'desc')
      .limit(perPage);
  } else {
    q = adminDb.collection('releases')
      .where('genres', 'array-contains-any', genuriFiltrate)
      .orderBy('date_added', 'desc')
      .limit(perPage);
  }

  if (currentPage > 1) {
    const skipSnapshot = await adminDb.collection('releases')
      .where('genres', 'array-contains-any', genuriFiltrate)
      .orderBy('date_added', 'desc')
      .limit((currentPage - 1) * perPage)
      .get();
    const lastDoc = skipSnapshot.docs[skipSnapshot.docs.length - 1];
    q = adminDb.collection('releases')
      .where('genres', 'array-contains-any', genuriFiltrate)
      .orderBy('date_added', 'desc')
      .startAfter(lastDoc)
      .limit(perPage);
  }

  const countSnapshot = await adminDb.collection('releases')
    .where('genres', 'array-contains-any', genuriFiltrate)
    .count()
    .get();
  const totalProduse = countSnapshot.data().count;

  const snapshot = await q.get();
  const produse = snapshot.docs.map(doc => doc.data());

  const deLa = (currentPage - 1) * perPage + 1;
  const panaLa = Math.min(currentPage * perPage, totalProduse);

  const infoPagina = {
    total: totalProduse,
    deLa,
    panaLa,
    currentPage,
    perPage
  };

  return (
    <>
      <GenereClient id={id} infoPagina={infoPagina} produse={produse} />
      <Footer />
    </>
  );
};

export default Page;