import React from 'react';
import AdreseleMelePage from './myadresclient';

export const metadata = {
    title: 'Adresele mele | Vinil1.ro',
    description: 'Gestionează adresele de livrare.',
    robots: { index: false }
};

const Page = () => {
    return (
        <AdreseleMelePage/>
    );
}

export default Page;
