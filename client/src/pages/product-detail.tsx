import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import { Share2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@shared/schema";

export default function ProductDetailPage() {
  const [, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const handleShare = () => {
    const productUrl = `${window.location.origin}/product/${productId}`;
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'Product',
        text: `Check out ${product?.name} on ATAURUM`,
        url: productUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(productUrl);
      alert('Product link copied to clipboard!');
    }
  };
  
  const handleWhatsAppShare = () => {
    const productUrl = `${window.location.origin}/product/${productId}`;
    const message = `Check out ${product?.name} on ATAURUM: ${productUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const productId = params?.id || "";
  
  // Fade in effect when page loads or product changes
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [productId]);
  
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      return response.json();
    },
    enabled: !!productId,
  });

  const { data: similarProducts = [] } = useQuery<Product[]>({
    queryKey: [`/api/products`, { category: product?.category }],
    queryFn: async () => {
      const response = await fetch(`/api/products?category=${product?.category}`);
      if (!response.ok) throw new Error("Failed to fetch similar products");
      return response.json();
    },
    enabled: !!product?.category,
  });

  if (product && !selectedColor && product.colors.length > 0) {
    setSelectedColor(product.colors[0]);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="px-4 py-6 animate-pulse">
          <div className="h-96 bg-muted rounded-lg mb-4" />
          <div className="h-20 bg-muted rounded mb-4" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Button onClick={() => setLocation("/home")}>Go to Home</Button>
        </div>
      </div>
    );
  }

  const originalPrice = product.originalPrice || product.price;
  const displayPrice = product.price;
  const hasDiscount = (product.discountPercentage && product.discountPercentage > 0) || originalPrice > displayPrice;
  const savings = originalPrice - displayPrice;
  const discountPercentage = product.discountPercentage || (hasDiscount ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100) : 0);

  const handleSimilarProductClick = (newProductId: string) => {
    setIsTransitioning(true);
    setIsVisible(false);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Wait for fade out animation to complete before navigating
    setTimeout(() => {
      setLocation(`/product/${newProductId}`);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div 
      className="min-h-screen bg-background transition-opacity duration-300 ease-in-out"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <Header />

      <div className="bg-card">
        <div className="relative">
          <img
            src={product.images[selectedImageIndex]}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover"
          />
        </div>

        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2 px-4 py-3">
            {product.images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                  index === selectedImageIndex 
                    ? "border-primary ring-2 ring-primary/30" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="px-4 py-4 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-lg font-serif font-semibold text-foreground uppercase flex-1">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleShare}
                className="hover:opacity-70 transition-opacity" 
                data-testid="share-button"
              >
                <Share2 className="w-5 h-5 text-foreground" />
              </button>
              <button 
                onClick={handleWhatsAppShare}
                className="hover:opacity-70 transition-opacity"
                data-testid="whatsapp-button"
              >
                <FaWhatsapp className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-2xl font-bold text-[#8B4513]" data-testid="product-price">
              ₹ {displayPrice.toLocaleString('en-IN')}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through" data-testid="original-price">
                  ₹ {originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded" data-testid="savings-badge">
                  SAVE ₹ {savings.toLocaleString('en-IN')}
                </span>
              </>
            )}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div>
              <h5 className="text-base font-semibold text-foreground mb-4">Available Colors</h5>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`flex flex-col items-center border-2 rounded-lg transition-all ${
                      selectedColor === color
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border hover:border-primary/50"
                    }`}
                    data-testid={`color-option-${index}`}
                  >
                    <img
                      src={product.images[index % product.images.length]}
                      alt={color}
                      className="w-24 h-28 object-cover rounded-t-lg"
                    />
                    <div className="w-full bg-card text-foreground text-sm py-2 text-center rounded-b-lg font-medium">
                      {color}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-muted px-4 py-6">
        <Accordion type="single" collapsible className="space-y-3" data-testid="product-accordions">
          <AccordionItem value="description" className="bg-card px-4 border-b-0" data-testid="accordion-description">
            <AccordionTrigger className="text-foreground font-bold text-sm hover:no-underline py-4">
              PRODUCT DESCRIPTION
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              {product.description}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="specification" className="bg-card px-4 border-b-0" data-testid="accordion-specification">
            <AccordionTrigger className="text-foreground font-bold text-sm hover:no-underline py-4">
              PRODUCT SPECIFICATION
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              <div className="space-y-2">
                <p><strong>Material:</strong> {product.material}</p>
                <p><strong>Colors:</strong> {product.colors.join(", ")}</p>
                <p><strong>Category:</strong> {product.category}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {similarProducts.length > 0 && (
        <div className="bg-card px-4 py-6">
          <h2 className="text-xl font-serif font-bold text-foreground mb-4">Similar Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {similarProducts
              .filter(p => p._id !== product._id)
              .slice(0, 4)
              .map((similarProduct) => (
                <ProductCard 
                  key={similarProduct._id} 
                  product={similarProduct}
                  onClick={() => similarProduct._id && handleSimilarProductClick(similarProduct._id)}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
