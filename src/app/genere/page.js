import DiscuriVinil from './DiscuriVinil';
import Footer from '@/components/MainPage/Footer';
import { adminDb } from '@/lib/firebaseAdmin';

const Page = async ({ searchParams }) => {
  const { styles, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const perPage = 24;
  const stylesArray = styles ? styles.split(',').map(v => v.trim()) : null;

  let q;
  if (stylesArray) {
    q = adminDb.collection('releases')
      .where('styles', 'array-contains-any', stylesArray)
      .orderBy('date_added', 'desc')
      .limit(perPage);
  } else {
    q = adminDb.collection('releases')
      .orderBy('date_added', 'desc')
      .limit(perPage);
  }

  if (currentPage > 1) {
    const skipSnapshot = await adminDb.collection('releases')
      .orderBy('date_added', 'desc')
      .limit((currentPage - 1) * perPage)
      .get();
    const lastDoc = skipSnapshot.docs[skipSnapshot.docs.length - 1];
    q = adminDb.collection('releases')
      .orderBy('date_added', 'desc')
      .startAfter(lastDoc)
      .limit(perPage);
  }

  const countSnapshot = await adminDb.collection('releases')
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
      <DiscuriVinil produse={produse} infoPagina={infoPagina} currentPage={currentPage} />
      <Footer />
    </>
  );
};

export default Page;