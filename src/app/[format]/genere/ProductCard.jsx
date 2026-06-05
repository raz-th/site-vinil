'use client';

import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export const ProductCard = ({ produs }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setImgLoaded(false);
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, [produs.cover_image, produs.thumb]);

  const artisti = produs.artist;
  const an = produs.year > 0 ? produs.year : null;
  const label = produs.label;
  const format = produs.format;
  const country = produs.country

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: produs.id,
      title: produs.title,
      artist: produs.artist,
      format: produs.format,
      imageUrl: produs.cover_image,
      price: produs.price || 0,
      quantity: 1
    });
  };

  return (
    <div className="productCard">
      <Link href={`/produs/${produs.id}`} className="productCardLink" style={{ textDecoration: 'none', color: 'inherit' }}>

        <div className="productImageWrap">
          <div style={{ position: 'relative', width: '100%', height: '300px' }}>
            {!imgLoaded && <div className="img-skeleton" />}

            <Image
              ref={imgRef}
              src={produs.cover_image || produs.thumb || "/assets/image.png"}
              alt={`${produs.title} - ${artisti}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
              style={{
                objectFit: 'cover',
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
          </div>

          {format && <span className="productBadge">{format === "Vinyl" ? "Vinil" : format}</span>}
        </div>

        <div className="productInfo">
          <p className="productArtist">{artisti}</p>
          <p className="productName">{produs.title}</p>
          <div className="productMeta">
            {an && <span className="productMetaItem">{an}</span>}
            {label && <span className="productMetaItem">{label}</span>}
          </div>
          {country && <span className="productMetaItem">{country}</span>}
          {produs.genres?.length > 0 && (
            <div className="productGenres">
              {produs.genres.map(s => (
                <span key={s} className="productGenreTag">{s}</span>
              ))}
            </div>
          )}

        </div>

      </Link>
      <div className="productPrices">
        <span className="productPrice">
          {produs.price ? `${Number(produs.price).toFixed(2)} Lei` : 'Preț indisponibil'}
        </span>
      </div>
      <button className="addToCartBtn" onClick={handleAddToCart}>
        Adaugă în coș
      </button>
    </div>
  );
};