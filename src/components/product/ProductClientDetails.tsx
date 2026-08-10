"use client";

import { useState, useMemo } from "react";
import ProductGallery from "./ProductGallery";
import AddToCartButton from "./AddToCartButton";

export default function ProductClientDetails({ 
  product, 
  isFavorite 
}: { 
  product: any, 
  isFavorite: boolean 
}) {
  const images = [product.imageUrl, ...(product.images || [])].filter(Boolean);
  
  // Extract unique colors and sizes
  const uniqueColors = useMemo(() => {
    const colors = product.variants.map((v: any) => v.color).filter(Boolean);
    return Array.from(new Set(colors)) as string[];
  }, [product.variants]);

  const uniqueSizes = useMemo(() => {
    const sizes = product.variants.map((v: any) => v.size).filter(Boolean);
    return Array.from(new Set(sizes)) as string[];
  }, [product.variants]);

  // If there are variants but they don't have color/size, we'll just select the first one
  const defaultVariant = product.variants[0];
  const [selectedColor, setSelectedColor] = useState<string | null>(uniqueColors.length > 0 ? uniqueColors[0] : null);
  const [selectedSize, setSelectedSize] = useState<string | null>(uniqueSizes.length > 0 ? uniqueSizes[0] : null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    // Find index of color in uniqueColors
    const colorIndex = uniqueColors.indexOf(color);
    if (colorIndex !== -1 && (colorIndex + 1) < images.length) {
      // Assuming images[0] is the main cover, images[1...] are colors
      setGalleryIndex(colorIndex + 1);
    }
  };

  // Find the exact variant based on selected color and size
  const selectedVariant = useMemo(() => {
    if (product.variants.length === 0) return null;
    
    // If no colors or sizes defined in any variants
    if (uniqueColors.length === 0 && uniqueSizes.length === 0) return product.variants[0];
    
    // Match based on what is available
    return product.variants.find((v: any) => {
      const matchColor = uniqueColors.length > 0 ? v.color === selectedColor : true;
      const matchSize = uniqueSizes.length > 0 ? v.size === selectedSize : true;
      return matchColor && matchSize;
    }) || null;
  }, [product.variants, selectedColor, selectedSize, uniqueColors.length, uniqueSizes.length]);

  // Calculate price display
  let priceDisplay = "Hết hàng";
  if (selectedVariant) {
    priceDisplay = `${selectedVariant.price.toLocaleString('vi-VN')}đ`;
  } else if (product.variants.length > 0) {
    const minPrice = Math.min(...product.variants.map((v: any) => v.price));
    const maxPrice = Math.max(...product.variants.map((v: any) => v.price));
    priceDisplay = minPrice === maxPrice 
      ? `${minPrice.toLocaleString('vi-VN')}đ` 
      : `${minPrice.toLocaleString('vi-VN')}đ - ${maxPrice.toLocaleString('vi-VN')}đ`;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
      {/* Product Image */}
      <ProductGallery 
        images={images}
        productName={product.name}
        productId={product.id}
        isFavorite={isFavorite}
        currentIndex={galleryIndex}
        onIndexChange={setGalleryIndex}
      />

      {/* Product Info */}
      <div className="flex flex-col">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-serif text-primary/80 font-semibold mb-6">
            {priceDisplay}
          </p>
          <div 
            className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 mb-8"
            dangerouslySetInnerHTML={{ __html: product.description || "" }}
          />
        </div>

        <AddToCartButton 
          productId={product.id}
          productName={product.name}
          productImageUrl={images[galleryIndex] || product.imageUrl}
          uniqueColors={uniqueColors}
          uniqueSizes={uniqueSizes}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          onColorSelect={handleColorSelect}
          onSizeSelect={setSelectedSize}
          selectedVariant={selectedVariant}
        />
      </div>
    </div>
  );
}
