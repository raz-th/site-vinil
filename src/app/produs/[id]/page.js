import React from 'react';
import './ProdusStyle.css'
import ProdusPage from './ProdusPage';
import { adminDb } from '@/lib/firebaseAdmin';

const Page = async ({ params }) => {
    const { id } = await params;

    try {
        const response = await fetch(`https://api.discogs.com/releases/${id}`, {
            headers: { 'User-Agent': 'YourAppName/1.0' },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        const data = await response.json();

        const dbRef = adminDb.collection('releases').doc(id);
        const dbDoc = await dbRef.get();
        if (!dbDoc.exists){
            return <h1>404 - not found</h1>
        }else{
            // data[]
            const dbDocData = dbDoc.data();
            console.log(dbDocData);
            console.log(data);
            data.format = dbDocData.format;
            data.format_desc = dbDocData.format_desc;
        }
        // console.log(data)

        return <ProdusPage produs={data} />
    }catch(error){
        console.error(error);
        return <div>Ceva a mers prost.</div>
    }
}

export default Page;
