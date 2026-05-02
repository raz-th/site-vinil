import React from 'react';
import CartPage from './CartClient';

export const metadata = {
    title: 'Coșul meu | Vinil1.ro',
    description: 'Vezi produsele din coșul tău de cumpărături.',
    robots: { index: false }
};

const Page = () => {
    return (
        <CartPage/>
    );
}

export default Page;
