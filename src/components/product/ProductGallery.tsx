"use client";

import { useState } from "react";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";

export default function ProductGallery({ 
  images, 
  productName,
  productId,
  isFavorite,
  currentIndex: externalCurrentIndex,
  onIndexChange
}: { 
  images: string[], 
  productName: string,
  productId: string,
  isFavorite: boolean,
  currentIndex?: number,
  onIndexChange?: (index: number) => void
}) {
  const [localIndex, setLocalIndex] = useState(0);
  
  const currentIndex = externalCurrentIndex !== undefined ? externalCurrentIndex : localIndex;
  
  const setCurrentIndex = (index: number) => {
    if (onIndexChange) onIndexChange(index);
    else setLocalIndex(index);
  };

  if (images.length === 0) {
    return (
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 w-full max-w-md mx-auto md:mx-0 overflow-hidden rounded-lg">
        <div className="flex items-center justify-center h-full text-gray-400">No image</div>
        <FavoriteButton productId={productId} initialIsFavorite={isFavorite} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto md:mx-0">
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 w-full overflow-hidden rounded-lg mb-4">
        <Image 
          src={images[currentIndex]}
          alt={`${productName} - Image ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
        <FavoriteButton productId={productId} initialIsFavorite={isFavorite} />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                currentIndex === index ? 'border-red-600' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image 
                src={img}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
