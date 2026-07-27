'use client';
import React, { useState } from 'react';
import { Drawer } from 'vaul';
import { IoMdClose, IoMdTrash } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { SlHandbag } from 'react-icons/sl';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import './CartDrawer.css';

const CartDrawer = ({ open, onOpenChange }) => {
    const { cart, subtotal, shippingCost, total, updateQuantity, removeFromCart } = useCart();
    const router = useRouter();

    const formatPrice = (price) =>
        new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(price);

    const truncateText = (text, limit) => {
        if (!text) return "";
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    const handleGoToCart = () => {
        onOpenChange(false);
        router.push('/user/myaccount/mycart');
    };

    return (
        <Drawer.Root open={open} onOpenChange={onOpenChange} dismissible={true}>
            <Drawer.Portal>
                <Drawer.Overlay className="cd-overlay" onClick={() => onOpenChange(false)} />
                <Drawer.Content className="cd-content">
                    <div className="cd-container">

                        <div className="cd-handle" />

                        <div className="cd-header">
                            <Drawer.Title className="cd-title">
                                <IoCartOutline size={20} />
                                Coșul meu
                            </Drawer.Title>
                            <button className="cd-close-btn" onClick={() => onOpenChange(false)} aria-label="Închide">
                                <IoMdClose size={18} />
                            </button>
                        </div>

                        <Drawer.Description className="cd-description">
                            {cart.length > 0
                                ? `${cart.reduce((s, i) => s + i.quantity, 0)} ${cart.reduce((s, i) => s + i.quantity, 0) === 1 ? "produs" : "produse"} în coș`
                                : "Coșul tău este gol"}
                        </Drawer.Description>

                        {cart.length === 0 ? (
                            <div className="cd-empty">
                                <SlHandbag size={40} style={{ opacity: 0.25 }} />
                                <p>Nu ai adăugat încă niciun produs</p>
                                <button className="cd-btn-secondary" onClick={() => {onOpenChange(false); router.push("/toate/genere")}}>
                                    Continuă cumpărăturile
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="cd-items">
                                    {cart.map(item => (
                                        <div key={item.productId} className="cd-item">
                                            <div className="cd-item-thumb">
                                                {item.imageUrl
                                                    ? <img src={item.imageUrl} alt={item.title} />
                                                    : <SlHandbag size={16} />
                                                }
                                            </div>
                                            <div className="cd-item-info">
                                                <p className="cd-item-title">{truncateText(item.title, 26)}</p>
                                                <p className="cd-item-sub">{item.artist} · {item.format || "Vinil"}</p>
                                                <div className="cd-item-bottom">
                                                    <div className="cd-qty-control">
                                                        <button
                                                            className="cd-qty-btn"
                                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                        >−</button>
                                                        <span className="cd-qty-value">{item.quantity}</span>
                                                        <button
                                                            className="cd-qty-btn"
                                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                        >+</button>
                                                    </div>
                                                    <p className="cd-item-price">{formatPrice(item.price * item.quantity)}</p>
                                                </div>
                                            </div>
                                            <button
                                                className="cd-delete-btn"
                                                onClick={() => removeFromCart(item.productId)}
                                                title="Șterge"
                                            >
                                                <IoMdTrash size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="cd-summary">
                                    <div className="cd-summary-row">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="cd-summary-row">
                                        <span>Transport</span>
                                        <span className={shippingCost === 0 ? "cd-free" : ""}>
                                            {shippingCost === 0 ? "Gratuit" : formatPrice(shippingCost)}
                                        </span>
                                    </div>
                                    <div className="cd-summary-divider" />
                                    <div className="cd-summary-row cd-summary-total">
                                        <span>Total</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <div className="cd-actions">
                                    <button className="cd-btn-primary" onClick={handleGoToCart}>
                                        Vezi coșul complet
                                    </button>
                                    <button className="cd-btn-secondary" onClick={() => onOpenChange(false)}>
                                        Continuă cumpărăturile
                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default CartDrawer;