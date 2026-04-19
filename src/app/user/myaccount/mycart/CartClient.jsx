'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import "./cart.css";
import { IoMdTrash } from "react-icons/io";
import { SlHandbag } from "react-icons/sl";

export default function CartPage() {
    const { cart, loading, subtotal, shippingCost, total, updateQuantity, removeFromCart, clearCart } = useCart();
    const { user, userData } = useAuth();
    const router = useRouter();
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [error, setError] = useState("");

    const formatPrice = (price) =>
        new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(price);

    const handleCheckout = async () => {
        if (!user) return router.push("/");
        if (cart.length === 0) return;

        const address = userData?.defaultAddress;
        if (!address) {
            setError("Adaugă o adresă de livrare în contul tău înainte de a plasa comanda.");
            return;
        }

        setCheckoutLoading(true);
        setError("");
        try {
            await addDoc(collection(db, "orders"), {
                userId: user.uid,
                status: "in_procesare",
                createdAt: serverTimestamp(),
                items: cart,
                subtotal,
                shippingCost,
                total,
                shippingAddress: address,
            });
            await clearCart();
            router.push("/user/myaccount/comenzile-mele");
        } catch (err) {
            console.error(err);
            setError("A apărut o eroare. Încearcă din nou.");
        } finally {
            setCheckoutLoading(false);
        }
    };

    if (loading) return (
        <div className="cartPage_loadingWrap">
            <div className="cartPage_spinner"></div>
            <p>Se încarcă coșul...</p>
        </div>
    );

    if (cart.length === 0) return (
        <div className="cartPage_emptyState">
            <SlHandbag size={52} style={{ opacity: 0.25 }} />
            <h3>Coșul tău este gol</h3>
            <p>Explorează colecția noastră și adaugă viniluri preferate.</p>
            <button className="cartPage_browseBtn" onClick={() => router.push("/toate/genere")}>
                Descoperă colecția
            </button>
        </div>
    );

    const truncateText = (text, limit) => {
        if (!text) return "";
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    return (
        <div className="cartPage_page">
            <div className="mainCard_header" style={{ marginBottom: "2rem" }}>
                <p>Coșul meu</p>
                <div className="fadedLine" />
                <span className="cartPage_count">
                    {cart.reduce((s, i) => s + i.quantity, 0)} {cart.reduce((s, i) => s + i.quantity, 0) === 1 ? "produs" : "produse"}
                </span>
            </div>

            <div className="cartPage_layout">
                {/* Produse */}
                <div className="cartPage_itemsList">
                    {cart.map(item => (
                        <div key={item.productId} className="cartPage_itemCard">
                            <div className="cartPage_itemThumb">
                                {item.imageUrl
                                    ? <img src={item.imageUrl} alt={item.title} />
                                    : <SlHandbag size={20} />
                                }
                            </div>
                            <div className="cartPage_itemInfo">
                                <p className="cartPage_itemTitle" >{truncateText(item.title, 30)}</p>
                                <p className="cartPage_itemSub">{item.artist} · {item.format || "Vinil"}</p>
                                <p className="cartPage_itemUnitPrice">{formatPrice(item.price)} / buc.</p>
                            </div>
                            <div className="cartPage_itemActions">
                                <div className="cartPage_qtyControl">
                                    <button
                                        className="cartPage_qtyBtn"
                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                    >−</button>
                                    <span className="cartPage_qtyValue">{item.quantity}</span>
                                    <button
                                        className="cartPage_qtyBtn"
                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                    >+</button>
                                </div>
                                <p className="cartPage_itemTotal">{formatPrice(item.price * item.quantity)}</p>
                                <button
                                    className="cartPage_deleteBtn"
                                    onClick={() => removeFromCart(item.productId)}
                                    title="Șterge"
                                >
                                    <IoMdTrash size={17} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sumar */}
                <div className="cartPage_summary">
                    <p className="cartPage_summaryTitle">Sumar comandă</p>

                    <div className="cartPage_summaryRow">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="cartPage_summaryRow">
                        <span>Transport</span>
                        <span className={shippingCost === 0 ? "cartPage_free" : ""}>
                            {shippingCost === 0 ? "Gratuit" : formatPrice(shippingCost)}
                        </span>
                    </div>
                    {shippingCost > 0 && (
                        <p className="cartPage_freeShippingHint">
                            Mai adaugă {formatPrice(200 - subtotal)} pentru transport gratuit
                        </p>
                    )}
                    <div className="cartPage_summaryDivider" />
                    <div className="cartPage_summaryRow cartPage_summaryTotal">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>

                    {error && <p className="cartPage_errorMsg">{error}</p>}

                    <button
                        className="cartPage_checkoutBtn"
                        onClick={handleCheckout}
                        disabled={checkoutLoading}
                    >
                        {checkoutLoading ? "Se procesează..." : "Plasează comanda"}
                    </button>

                    <button className="cartPage_continueBtn" onClick={() => router.push("/")}>
                        ← Continuă cumpărăturile
                    </button>
                </div>
            </div>
        </div>
    );
}