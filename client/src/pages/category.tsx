import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { useState } from "react";
import Header from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { FilterPanel } from "@/components/filter-panel";
import { SortPanel, type SortOption } from "@/components/sort-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
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
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  
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

  const getSortLabel = (sort: SortOption) => {
    const labels = {
      "featured": "Featured",
      "best-selling": "Best selling",
      "alphabetically-az": "Alphabetically, A-Z",
      "alphabetically-za": "Alphabetically, Z-A",
      "price-low-high": "Price, low to high",
      "price-high-low": "Price, high to low",
      "date-old-new": "Date, old to new",
      "date-new-old": "Date, new to old",
    };
    return labels[sort];
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

  const handlePriceInputChange = (index: number, value: string) => {
    const numValue = parseInt(value) || 0;
    const newRange: [number, number] = [...priceRange];
    newRange[index] = numValue;
    setPriceRange(newRange);
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
        
        {/* Mobile Header - Only visible on mobile */}
        <div className="sticky top-16 z-10 bg-card border-b border-border lg:hidden">
          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-5 bg-input border-none rounded-lg placeholder:text-muted-foreground"
                data-testid="input-search-mobile"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 border-t">
            <Button
              variant="ghost"
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center justify-center gap-2 py-4 rounded-none border-r hover:bg-accent"
              data-testid="button-filters-mobile"
            >
              <SlidersHorizontal className="w-5 h-5 text-foreground" />
              <span className="text-foreground font-medium">Filters</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsSortOpen(true)}
              className="flex items-center justify-center gap-2 py-4 rounded-none hover:bg-accent"
              data-testid="button-sort-mobile"
            >
              <span className="text-foreground font-medium">Sort by</span>
              <ChevronDown className="w-5 h-5 text-foreground" />
            </Button>
          </div>
        </div>

        {/* Desktop Layout - Only visible on desktop */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-4 py-6">
            {/* Search and Sort Row */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-input border-border rounded-lg placeholder:text-muted-foreground"
                  data-testid="input-search-desktop"
                />
              </div>
              
              <Button
                variant="outline"
                onClick={() => setIsSortOpen(true)}
                className="flex items-center gap-2 px-4 py-2 border-border hover:bg-accent"
                data-testid="button-sort-desktop"
              >
                <span className="text-foreground font-medium">Sort by</span>
                <ChevronDown className="w-4 h-4 text-foreground" />
              </Button>
            </div>

            <div className="flex gap-6">
              {/* Left Sidebar - Filters */}
              <aside className="w-64 flex-shrink-0">
                <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-foreground mb-6">Filters</h2>
                  
                  <div className="space-y-4">
                    {/* Price Filter */}
                    <div className="border-b border-border pb-4">
                      <button
                        onClick={() => setIsPriceOpen(!isPriceOpen)}
                        className="flex items-center justify-between w-full text-left"
                        data-testid="button-filter-price"
                      >
                        <span className="font-semibold text-foreground">Price</span>
                        {isPriceOpen ? (
                          <ChevronUp className="h-5 w-5 text-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-foreground" />
                        )}
                      </button>
                      {isPriceOpen && (
                        <div className="mt-4 space-y-4">
                          <Slider
                            value={priceRange}
                            onValueChange={(value) => setPriceRange(value as [number, number])}
                            max={2000}
                            step={50}
                            className="w-full"
                            data-testid="slider-price"
                          />
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 flex-1">
                              <span className="text-foreground text-sm">₹</span>
                              <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => handlePriceInputChange(0, e.target.value)}
                                className="w-full px-2 py-1 border border-border rounded-md bg-card text-foreground text-center text-sm"
                                data-testid="input-price-min"
                              />
                            </div>
                            <span className="text-foreground text-sm">to</span>
                            <div className="flex items-center gap-1 flex-1">
                              <span className="text-foreground text-sm">₹</span>
                              <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceInputChange(1, e.target.value)}
                                className="w-full px-2 py-1 border border-border rounded-md bg-card text-foreground text-center text-sm"
                                data-testid="input-price-max"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Color Filter */}
                    <div className="border-b border-border pb-4">
                      <button
                        onClick={() => setIsColorOpen(!isColorOpen)}
                        className="flex items-center justify-between w-full text-left"
                        data-testid="button-filter-color"
                      >
                        <span className="font-semibold text-foreground">Color</span>
                        {isColorOpen ? (
                          <ChevronUp className="h-5 w-5 text-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-foreground" />
                        )}
                      </button>
                    </div>

                    {/* Material Filter */}
                    <div className="border-b border-border pb-4">
                      <button
                        onClick={() => setIsMaterialOpen(!isMaterialOpen)}
                        className="flex items-center justify-between w-full text-left"
                        data-testid="button-filter-material"
                      >
                        <span className="font-semibold text-foreground">Material</span>
                        {isMaterialOpen ? (
                          <ChevronUp className="h-5 w-5 text-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-foreground" />
                        )}
                      </button>
                    </div>

                    {/* Size Filter */}
                    <div className="border-b border-border pb-4">
                      <button
                        onClick={() => setIsSizeOpen(!isSizeOpen)}
                        className="flex items-center justify-between w-full text-left"
                        data-testid="button-filter-size"
                      >
                        <span className="font-semibold text-foreground">Size</span>
                        {isSizeOpen ? (
                          <ChevronUp className="h-5 w-5 text-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-foreground" />
                        )}
                      </button>
                    </div>

                    {/* More Filters */}
                    <div className="border-b border-border pb-4">
                      <button
                        onClick={() => setIsMoreOpen(!isMoreOpen)}
                        className="flex items-center justify-between w-full text-left"
                        data-testid="button-filter-more"
                      >
                        <span className="font-semibold text-foreground">More filters</span>
                        {isMoreOpen ? (
                          <ChevronUp className="h-5 w-5 text-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Right Content - Products Grid */}
              <main className="flex-1">
                {displayProducts && displayProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                    <p className="text-muted-foreground" data-testid="text-no-products">No products found</p>
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>

        {/* Mobile Products Grid - Only visible on mobile */}
        <div className="lg:hidden container mx-auto px-4 py-4">
          {displayProducts && displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-4">
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
              <p className="text-muted-foreground" data-testid="text-no-products">No products found</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <FilterPanel
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        onApplyFilters={() => {}}
      />

      {/* Sort Panel for both mobile and desktop */}
      <SortPanel
        open={isSortOpen}
        onOpenChange={setIsSortOpen}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />
    </>
  );
}
