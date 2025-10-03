import { Card } from "@/components/ui/card";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const displayPrice = product.price;
  const originalPrice = product.originalPrice || product.price;
  const isNew = product.collectionType === "new-arrival";

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow bg-card rounded-xl"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isNew && (
          <div className="absolute top-3 right-3 bg-foreground text-card text-xs font-semibold px-3 py-1 rounded-full">
            NEW
          </div>
        )}
      </div>

      <div className="p-3 space-y-2">
        <h3 className="font-medium text-sm line-clamp-2 text-foreground">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-bold text-foreground">
            ₹ {displayPrice.toLocaleString('en-IN')}
          </span>
          {hasDiscount && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ₹ {originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-semibold bg-red-50 text-red-600 px-2 py-0.5 rounded">
                {product.discountPercentage}% off
              </span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
