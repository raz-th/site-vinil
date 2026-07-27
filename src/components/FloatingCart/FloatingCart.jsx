'use client';
import React, { useEffect, useRef, useState } from 'react';
import "./floatingCart.css"
import { IoCartOutline } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import CartDrawer from '../Drawers/CartDrawer/CartDrawer';

const FloatingCart = () => {
    const { user } = useAuth();
    const { cartCount } = useCart();
    const [bump, setBump] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const prevCount = useRef(cartCount);

    useEffect(() => {
        if (cartCount > prevCount.current) {
            setBump(true);
            const timer = setTimeout(() => setBump(false), 400);
            prevCount.current = cartCount;
            return () => clearTimeout(timer);
        }
        prevCount.current = cartCount;
    }, [cartCount]);

    if (!user) return null;

    return (
        <>
            <button
                className={`floatingCartContainer ${bump ? "bump" : ""}`}
                aria-label="Coș"
                onClick={() => setDrawerOpen(true)}
            >
                {cartCount > 0 && (
                    <span className={`floatingCartContainer_badge ${bump ? "badge-bump" : ""}`}>
                        {cartCount}
                    </span>
                )}
                <IoCartOutline />
            </button>
            <CartDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
        </>
    );
}

export default FloatingCart;