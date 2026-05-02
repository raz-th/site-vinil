import React from 'react';
import ClientLogin from './ClientLogin';

export const metadata = {
    title: 'Autentificare | Vinil1.ro',
    description: 'Conectează-te la contul tău Vinil1.ro.',
    robots: { index: false }
};

const Page = async ({searchParams}) => {
    const { type } = await searchParams;
    return (
        <ClientLogin type={type}/>
    );
}

export default Page;
