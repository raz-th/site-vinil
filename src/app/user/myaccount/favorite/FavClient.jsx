'use client';
import { useRouter } from "next/navigation";
import { useFavorites } from "@/context/FavoriteContext";
import { useCart } from "@/context/CartContext";
import "./favorite.css";
import { IoMdTrash } from "react-icons/io";
import { SlHandbag, SlHeart } from "react-icons/sl";

export default function FavoritePage() {
    const { favorites, loading, removeFromFavorites } = useFavorites();
    const { addToCart } = useCart();
    const router = useRouter();

    const formatPrice = (price) =>
        new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(price);

    if (loading) return (
        <div className="loadingWrap">
            <div className="spinner"></div>
            <p>Se încarcă favoritele...</p>
        </div>
    );

    if (favorites.length === 0) return (
        <div className="emptyState">
            <SlHeart size={52} className="emptyIcon" />
            <h3>Lista de favorite este goală</h3>
            <p>Salvează vinilurile care îți plac pentru a le găsi mai ușor mai târziu.</p>
            <button className="browseBtn" onClick={() => router.push("/toate/genere")}>
                Explorează colecția
            </button>
        </div>
    );

    return (
        <div className="page">
            <div className="mainCard_header" style={{ marginBottom: "2rem" }}>
                <p>Produse Favorite</p>
                <div className="fadedLine" />
                <span className="count">
                    {favorites.length} {favorites.length === 1 ? "produs" : "produse"}
                </span>
            </div>

            <div className="favGrid">
                {favorites.map(product => (
                    <div key={product.id} className="favCard">
                        <div className="favThumb" onClick={() => router.push(`/produs/${product.id}`)}>
                            {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.title} />
                            ) : (
                                <SlHandbag size={30} />
                            )}
                            <button
                                className="removeFavBtn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromFavorites(product.id);
                                }}
                                title="Elimină"
                            >
                                <IoMdTrash size={18} />
                            </button>
                        </div>

                        <div className="favInfo">
                            <h4 className="favTitle" onClick={() => router.push(`/produs/${product.id}`)}>
                                {product.title}
                            </h4>
                            <p className="favArtist">{product.artist}</p>
                            <p className="favPrice">{formatPrice(product.price)}</p>
                        </div>

                        <button
                            className="addToCartBtn"
                            onClick={() => addToCart({
                                productId: product.id,
                                title: product.title,
                                artist: product.artist,
                                price: product.price,
                                imageUrl: product.imageUrl
                            })}
                        >
                            Adaugă în coș
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}