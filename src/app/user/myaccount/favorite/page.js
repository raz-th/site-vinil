import React from 'react';
import FavoritePage from './FavClient';

export const metadata = {
    title: 'Favorite | Vinil1.ro',
    description: 'Produsele tale favorite de pe Vinil1.ro.',
    robots: { index: false }
};

const Page = () => {
    return (
        <FavoritePage/>
    );
}

export default Page;
