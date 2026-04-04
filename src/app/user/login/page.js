import React from 'react';
import ClientLogin from './ClientLogin';

const Page = async ({searchParams}) => {
    const { type } = await searchParams;
    return (
        <ClientLogin type={type}/>
    );
}

export default Page;
