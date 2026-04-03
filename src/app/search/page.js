import { adminDb } from '@/lib/firebaseAdmin';
import React from 'react';
import SearchClient from './SearchClient';
import { formatMap } from '@/config/site';

const Page = async ({ searchParams }) => {
  const { q, page, format, genres } = await searchParams;

  const searchTerm = q?.trim().toLowerCase() || '';
  const currentPage = Number(page) || 1;
  const perPage = 24;

  const genresArray = genres || null;
  const formatFiltrat = formatMap[format] || null;

  let releases = [];
  let totalProduse = 0;

  if (searchTerm) {
    // 🔍 BASE QUERIES (title + artist)
    let baseTitleQuery = adminDb.collection('releases')
      .where('title_lowercase', '>=', searchTerm)
      .where('title_lowercase', '<=', searchTerm + '\uf8ff');

    let baseArtistQuery = adminDb.collection('releases')
      .where('artist_lowercase', '>=', searchTerm)
      .where('artist_lowercase', '<=', searchTerm + '\uf8ff');

    // 🔥 APPLY FILTERS
    if (formatFiltrat) {
      baseTitleQuery = baseTitleQuery.where('format', '==', formatFiltrat);
      baseArtistQuery = baseArtistQuery.where('format', '==', formatFiltrat);
    }

    if (genresArray && genresArray !== 'toate') {
      baseTitleQuery = baseTitleQuery.where('genres', 'array-contains-any', [genresArray]);
      baseArtistQuery = baseArtistQuery.where('genres', 'array-contains-any', [genresArray]);
    }

    // 🔁 pagination (Firestore style)
    let qTitle = baseTitleQuery.limit(perPage);
    let qArtist = baseArtistQuery.limit(perPage);

    if (currentPage > 1) {
      const skipTitle = await baseTitleQuery.limit((currentPage - 1) * perPage).get();
      const lastTitle = skipTitle.docs[skipTitle.docs.length - 1];

      if (lastTitle) {
        qTitle = baseTitleQuery.startAfter(lastTitle).limit(perPage);
      }

      const skipArtist = await baseArtistQuery.limit((currentPage - 1) * perPage).get();
      const lastArtist = skipArtist.docs[skipArtist.docs.length - 1];

      if (lastArtist) {
        qArtist = baseArtistQuery.startAfter(lastArtist).limit(perPage);
      }
    }

    const [byTitle, byArtist] = await Promise.all([
      qTitle.get(),
      qArtist.get(),
    ]);

    // 🔥 combine + dedupe
    const seen = new Set();
    [...byTitle.docs, ...byArtist.docs].forEach(doc => {
      if (!seen.has(doc.id)) {
        seen.add(doc.id);
        releases.push({ id: doc.id, ...doc.data() });
      }
    });

    // ⚠️ COUNT (approximation, since Firestore can't combine queries)
    totalProduse = seen.size + (currentPage - 1) * perPage;

  } else {
    // 🧾 NO SEARCH → normal listing
    let baseQuery = adminDb.collection('releases').orderBy('date_added', 'desc');

    if (formatFiltrat && formatFiltrat !== 'toate') {
      baseQuery = baseQuery.where('format', '==', formatFiltrat);
    }

    if (genresArray) {
      baseQuery = baseQuery.where('genres', 'array-contains-any', [genresArray]);
    }

    let qRef = baseQuery.limit(perPage);

    if (currentPage > 1) {
      const skipSnapshot = await baseQuery.limit((currentPage - 1) * perPage).get();
      const lastDoc = skipSnapshot.docs[skipSnapshot.docs.length - 1];

      if (lastDoc) {
        qRef = baseQuery.startAfter(lastDoc).limit(perPage);
      }
    }

    const snapshot = await qRef.get();
    releases = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // ✅ correct count
    const countSnapshot = await baseQuery.count().get();
    totalProduse = countSnapshot.data().count;
  }

  // 📄 pagination info
  const infoPagina = {
    total: totalProduse,
    deLa: (currentPage - 1) * perPage + 1,
    panaLa: Math.min(currentPage * perPage, totalProduse),
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