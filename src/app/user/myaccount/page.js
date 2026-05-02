import React from 'react';
import ClientProfile from './ClientProfile';

export const metadata = {
    title: 'Contul meu | Vinil1.ro',
    description: 'Gestionează contul tău Vinil1.ro.',
    robots: { index: false }
};

const Page = () => {
    return (
        <ClientProfile/>
    );
}

export default Page;
