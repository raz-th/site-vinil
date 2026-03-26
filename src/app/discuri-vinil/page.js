import React from 'react';
import DiscuriVinil from './DiscuriVinil';
import Footer from '@/components/MainPage/Footer';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { genuri_muzicale } from '@/config/site';




const Page = async ({ searchParams }) => {
    const { styles } = await searchParams;
    const page = Number((await searchParams).page) || 1;
    const perPage = 24;

 
    const stylesArray = styles ? styles.split(',').map((v) => v.trim()) : null;

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
            orderBy('date_added', 'desc'),
            limit(24)
        );
    }

    if (page > 1) {
        const skipSnapshot = await getDocs(query(
            collection(db, 'releases'),
            orderBy('date_added', 'desc'),
            limit((page - 1) * perPage)
        ));

        const lastDoc = skipSnapshot.docs[skipSnapshot.docs.length - 1];

        q = query(
            collection(db, 'releases'),
            orderBy('date_added', 'desc'),
            startAfter(lastDoc),
            limit(perPage)
        );
    }

    const snapshot = await getDocs(q);
    const produse = snapshot.docs.map(doc => doc.data());

    return (
        <>
            <DiscuriVinil produse={produse} currentPage={parseInt(page)} />
            <Footer />
        </>
    );
}

export default Page;
