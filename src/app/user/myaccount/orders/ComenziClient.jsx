'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import "./comenzile-mele.css"; // 1. Updated Import
import { SlHandbag } from "react-icons/sl";

export default function ComenzileleMelePage() {
    const [comenzi, setComenzi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedComanda, setSelectedComanda] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.push('/');
                return;
            }
            await fetchComenzi(currentUser.uid);
        });
        return () => unsubscribe();
    }, []);

    const fetchComenzi = async (uid) => {
        try {
            const q = query(
                collection(db, "orders"),
                where("userId", "==", uid),
                orderBy("createdAt", "desc")
            );
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setComenzi(data);
        } catch (err) {
            console.error("Eroare la fetch comenzi:", err);
        } finally {
            setLoading(false);
        }
    };

    const statusConfig = {
        "in_procesare": { label: "În procesare", color: "amber" },
        "trimisa": { label: "Trimisă", color: "blue" },
        "livrata": { label: "Livrată", color: "green" },
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return "—";
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
    };

    const formatPrice = (price) =>
        new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(price);

    if (loading) return (
        <div className="loadingWrap">
            <div className="spinner"></div>
            <p>Se încarcă comenzile...</p>
        </div>
    );

    return (
        <div className="page">
            {selectedComanda ? (
                <OrderDetail
                    comanda={selectedComanda}
                    onBack={() => setSelectedComanda(null)}
                    statusConfig={statusConfig}
                    formatDate={formatDate}
                    formatPrice={formatPrice}
                />
            ) : (
                <OrderList
                    comenzi={comenzi}
                    onSelect={setSelectedComanda}
                    statusConfig={statusConfig}
                    formatDate={formatDate}
                    formatPrice={formatPrice}
                />
            )}
        </div>
    );
}

function OrderList({ comenzi, onSelect, statusConfig, formatDate, formatPrice }) {
    if (comenzi.length === 0) return (
        <div className="emptyState">
            <SlHandbag size={48} style={{ opacity: 0.3 }} />
            <h3>Nicio comandă încă</h3>
            <p>Comenzile tale vor apărea aici după prima achiziție.</p>
        </div>
    );

    return (
        <>
            <div className="mainCard_header" style={{marginBottom: "2rem"}}>
                <p>Comenzile mele</p>
                <div className="fadedLine" />
                <span className="count">{comenzi.length} {comenzi.length === 1 ? "comandă" : "comenzi"}</span>
            </div>
            <div className="list">
                {comenzi.map(comanda => {
                    const status = statusConfig[comanda.status] || { label: comanda.status, color: "gray" };
                    return (
                        <div key={comanda.id} className="card" onClick={() => onSelect(comanda)}>
                            <div className="cardLeft">
                                <div className="cardThumb">
                                    {comanda.items?.[0]?.imageUrl
                                        ? <img src={comanda.items[0].imageUrl} alt={comanda.items[0].title} />
                                        : <SlHandbag size={22} />
                                    }
                                </div>
                                <div className="cardInfo">
                                    <p className="cardId">Comanda #{comanda.orderNumber || comanda.id.slice(0, 8).toUpperCase()}</p>
                                    <p className="cardDate">{formatDate(comanda.createdAt)}</p>
                                    <p className="cardItems">
                                        {comanda.items?.length || 0} {comanda.items?.length === 1 ? "produs" : "produse"}
                                    </p>
                                </div>
                            </div>
                            <div className="cardRight">
                                <span className={`statusBadge ${status.color}`}>
                                    {status.label}
                                </span>
                                <p className="cardTotal">{formatPrice(comanda.total)}</p>
                                <span className="arrow">→</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function OrderDetail({ comanda, onBack, statusConfig, formatDate, formatPrice }) {
    const status = statusConfig[comanda.status] || { label: comanda.status, color: "gray" };
    const steps = ["in_procesare", "trimisa", "livrata"];
    const currentStep = steps.indexOf(comanda.status);
    const router = useRouter()
    return (
        <div className="detail">
            <button className="backBtn" onClick={onBack}>
                ← Înapoi la comenzi
            </button>

            <div className="detailHeader">
                <div>
                    <h3>Comanda #{comanda.orderNumber || comanda.id.slice(0, 8).toUpperCase()}</h3>
                    <p className="detailDate">Plasată pe {formatDate(comanda.createdAt)}</p>
                </div>
                <span className={`statusBadge ${status.color}`}>
                    {status.label}
                </span>
            </div>

            <div className="progressWrap">
                {steps.map((step, i) => (
                    <div key={step} className="progressStep">
                        <div className={`progressDot ${i <= currentStep ? 'progressDotActive' : ''}`}>
                            {i < currentStep ? '✓' : i + 1}
                        </div>
                        <p className={`progressLabel ${i <= currentStep ? 'progressLabelActive' : ''}`}>
                            {statusConfig[step]?.label}
                        </p>
                        {i < steps.length - 1 && (
                            <div className={`progressLine ${i < currentStep ? 'progressLineActive' : ''}`} />
                        )}
                    </div>
                ))}
            </div>

            <div className="detailCard">
                <p className="detailCardTitle">Produse comandate</p>
                {comanda.items?.map((item, i) => (
                    <div key={i} className="itemRow" onClick={() => router.push(`/produs/${item.productId}`)}>
                        <div className="itemThumb">
                            {item.imageUrl
                                ? <img src={item.imageUrl} alt={item.title} />
                                : <SlHandbag size={18} />
                            }
                        </div>
                        <div className="itemInfo">
                            <p className="itemTitle">{item.title}</p>
                            <p className="itemSub">{item.artist} · {item.format || "Vinil"}</p>
                        </div>
                        <div className="itemPriceWrap">
                            <p className="itemQty">x{item.quantity}</p>
                            <p className="itemPrice">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="detailGrid">
                <div className="detailCard">
                    <p className="detailCardTitle">Adresă de livrare</p>
                    <p className="detailText">{comanda.shippingAddress?.fullName}</p>
                    <p className="detailText">{comanda.shippingAddress?.street}</p>
                    <p className="detailText">{comanda.shippingAddress?.city}, {comanda.shippingAddress?.county}</p>
                    <p className="detailText">{comanda.shippingAddress?.zip}</p>
                </div>

                <div className="detailCard">
                    <p className="detailCardTitle">Sumar plată</p>
                    <div className="summaryRow">
                        <span>Subtotal</span>
                        <span>{formatPrice(comanda.subtotal)}</span>
                    </div>
                    <div className="summaryRow">
                        <span>Transport</span>
                        <span>{comanda.shippingCost === 0 ? "Gratuit" : formatPrice(comanda.shippingCost)}</span>
                    </div>
                    <div className="summaryRow summaryTotal">
                        <span>Total</span>
                        <span>{formatPrice(comanda.total)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}