import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import type { Product } from "@shared/schema";

interface CollectionSectionProps {
  title: string;
  collectionType: "new-arrival" | "trending" | "exclusive";
  onViewAll?: () => void;
}

export function CollectionSection({ title, collectionType, onViewAll }: CollectionSectionProps) {
  const [, setLocation] = useLocation();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [`/api/collections/${collectionType}`],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-foreground">{title}</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-none w-64 h-96 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <h2 className="text-2xl font-serif font-bold text-foreground pb-2">{title}</h2>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8B4513] to-transparent rounded-full shadow-lg shadow-[#8B4513]/30"></div>
        </div>
        <Button
          onClick={onViewAll}
          variant="outline"
          size="sm"
          className="bg-transparent text-[#8B4513] hover:bg-[#8B4513]/10 border-2 border-[#8B4513] font-semibold"
        >
          Explore More
        </Button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {products.map((product) => (
          <div key={product._id} className="flex-none w-64">
            <ProductCard
              product={product}
              onClick={() => setLocation(`/product/${product._id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
