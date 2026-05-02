import React from 'react';
import ComenzileleMelePage from './ComenziClient';

export const metadata = {
    title: 'Comenzile mele | Vinil1.ro',
    description: 'Istoricul comenzilor tale pe Vinil1.ro.',
    robots: { index: false }
};

const Page = () => {
    return (
        <ComenzileleMelePage/>
    );
}

export default Page;
