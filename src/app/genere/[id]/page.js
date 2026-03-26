
import GenereClient from './GenereClient';
import Footer from '@/components/MainPage/Footer';
import { genuri_muzicale } from '@/config/site';

import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, limit, startAfter, getDocs, getCountFromServer } from 'firebase/firestore';


const genuriParams = Object.keys(genuri_muzicale);

export function generateStaticParams() {
  return genuriParams.map((id) => ({ id }));
}


const Page = async ({ params, searchParams }) => {
  const { id } = await params;
  const { styles } = await searchParams;
  const page = Number((await searchParams).page) || 1;
  const perPage = 24;

  const genuriFiltrate = genuri_muzicale[id]?.id
    ? [genuri_muzicale[id].id]
    : [];

  const stylesArray = styles ? styles.split(',').map((v) => v.trim()) : null;
  const genData = genuri_muzicale[id];

  let q;

  if (stylesArray) {
    // filtrare dupa styles selectate
    q = query(
      collection(db, 'releases'),
      where('styles', 'array-contains-any', stylesArray),
      orderBy('date_added', 'desc'),
      limit(24)
    );
  } else {
    // filtrare normala dupa gen
    q = query(
      collection(db, 'releases'),
      where('genres', 'array-contains-any', [genData.id]),
      orderBy('date_added', 'desc'),
      limit(24)
    );
  }


  if (page > 1) {
    const skipSnapshot = await getDocs(query(
      collection(db, 'releases'),
      where('genres', 'array-contains-any', genuriFiltrate),
      orderBy('date_added', 'desc'),
      limit((page - 1) * perPage)
    ));

    const lastDoc = skipSnapshot.docs[skipSnapshot.docs.length - 1];
    q = query(
      collection(db, 'releases'),
      where('genres', 'array-contains-any', genuriFiltrate),
      orderBy('date_added', 'desc'),
      startAfter(lastDoc),
      limit(perPage)
    );
  }

  const countQuery = query(
    collection(db, 'releases'),
    where('genres', 'array-contains-any', [genData.id])
  );
  const countSnapshot = await getCountFromServer(countQuery);
  const totalProduse = countSnapshot.data().count;

  const snapshot = await getDocs(q);
  const produse = snapshot.docs.map(doc => doc.data());

  const deLa = (page - 1) * perPage + 1;
  const panaLa = Math.min(page * perPage, totalProduse);
  const infoPagina = {
    total: totalProduse,
    deLa: deLa,
    panaLa: panaLa,
    currentPage: page,
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
