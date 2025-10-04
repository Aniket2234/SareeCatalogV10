import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { useState } from "react";
import Header from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { FilterPanel } from "@/components/filter-panel";
import { SortPanel, type SortOption } from "@/components/sort-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import type { Product } from "@shared/schema";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:slug");
  const [, setLocation] = useLocation();
  
  const slug = params?.slug || "";
  const isCollection = ["new-arrival", "trending", "exclusive"].includes(slug);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedSort, setSelectedSort] = useState<SortOption>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [isCollection ? `/api/collections/${slug}` : `/api/products/category/${slug}`],
    queryFn: async () => {
      const url = isCollection 
        ? `/api/collections/${slug}?limit=100`
        : `/api/products/category/${slug}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
    enabled: !!slug,
  });

  const getCategoryTitle = (slug: string) => {
    switch (slug) {
      case "new-arrival":
        return "New Arrival";
      case "trending":
        return "Trending Collection";
      case "exclusive":
        return "Exclusive Collection";
      default:
        return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  };

  const filteredAndSortedProducts = () => {
    if (!products) return [];
    
    let filtered = products.filter((product) => {
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesPrice;
    });

    switch (selectedSort) {
      case "best-selling":
        filtered = [...filtered].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case "alphabetically-az":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alphabetically-za":
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-low-high":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "date-old-new":
        filtered = [...filtered].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateA - dateB;
        });
        break;
      case "date-new-old":
        filtered = [...filtered].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      default:
        break;
    }
    
    return filtered;
  };

  const displayProducts = filteredAndSortedProducts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="sticky top-16 z-10 bg-card border-b border-border">
          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-5 bg-input border-none rounded-lg placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 border-t">
            <Button
              variant="ghost"
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center justify-center gap-2 py-4 rounded-none border-r hover:bg-accent"
            >
              <SlidersHorizontal className="w-5 h-5 text-foreground" />
              <span className="text-foreground font-medium">Filters</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsSortOpen(true)}
              className="flex items-center justify-center gap-2 py-4 rounded-none hover:bg-accent"
            >
              <span className="text-foreground font-medium">Sort by</span>
              <ChevronDown className="w-5 h-5 text-foreground" />
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4">
          {displayProducts && displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={() => setLocation(`/product/${product._id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </div>

      <FilterPanel
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        onApplyFilters={() => {}}
      />

      <SortPanel
        open={isSortOpen}
        onOpenChange={setIsSortOpen}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />
    </>
  );
}
