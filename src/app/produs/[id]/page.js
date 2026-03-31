import React from 'react';
import './ProdusStyle.css'
import ProdusPage from './ProdusPage';

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
        // console.log(data)

        return <ProdusPage produs={data} />
    }catch(error){
        console.error(error);
        return <div>Ceva a mers prost.</div>
    }
}

export default Page;
