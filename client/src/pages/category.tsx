import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { useState, useMemo, useEffect, useRef } from "react";
import Header from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { FilterPanel } from "@/components/filter-panel";
import { SortPanel, type SortOption } from "@/components/sort-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, Mic, MicOff } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import type { Product } from "@shared/schema";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:slug");
  const [, setLocation] = useLocation();
  
  const slug = params?.slug || "";
  const isCollection = ["new-arrival", "trending", "exclusive"].includes(slug);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<SortOption>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  
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

  // Voice recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      setSearchQuery(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleVoiceSearch = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Extract unique materials and colors from products
  const { availableMaterials, availableColors, maxPrice } = useMemo(() => {
    if (!products || products.length === 0) {
      return { availableMaterials: [], availableColors: [], maxPrice: 3000 };
    }

    const materials = new Set<string>();
    const colors = new Set<string>();
    let max = 0;

    products.forEach(product => {
      if (product.material) materials.add(product.material);
      if (product.colors) product.colors.forEach(color => colors.add(color));
      if (product.price > max) max = product.price;
    });

    return {
      availableMaterials: Array.from(materials).sort(),
      availableColors: Array.from(colors).sort(),
      maxPrice: Math.ceil(max / 100) * 100,
    };
  }, [products]);

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
      
      const matchesMaterial = selectedMaterials.length === 0 || 
        selectedMaterials.includes(product.material);
      
      const matchesColor = selectedColors.length === 0 ||
        product.colors.some(color => selectedColors.includes(color));
      
      return matchesSearch && matchesPrice && matchesMaterial && matchesColor;
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
    newRange[index] = Math.min(numValue, maxPrice);
    setPriceRange(newRange);
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, maxPrice]);
    setSelectedMaterials([]);
    setSelectedColors([]);
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
                className="pl-10 pr-12 py-5 bg-input border-none rounded-lg placeholder:text-muted-foreground"
                data-testid="input-search-mobile"
              />
              {isSupported && (
                <button
                  onClick={toggleVoiceSearch}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'text-muted-foreground hover:bg-accent'
                  }`}
                  title={isListening ? 'Stop listening' : 'Voice search'}
                  data-testid="button-voice-search-mobile"
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              )}
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
                  className="pl-10 pr-12 py-2 bg-input border-border rounded-lg placeholder:text-muted-foreground"
                  data-testid="input-search-desktop"
                />
                {isSupported && (
                  <button
                    onClick={toggleVoiceSearch}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all ${
                      isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'text-muted-foreground hover:bg-accent'
                    }`}
                    title={isListening ? 'Stop listening' : 'Voice search'}
                    data-testid="button-voice-search-desktop"
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                )}
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
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-foreground">Filters</h2>
                    {(selectedMaterials.length > 0 || selectedColors.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-primary hover:underline"
                        data-testid="button-clear-filters"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
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
                            max={maxPrice}
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

                    {/* Material Filter */}
                    {availableMaterials.length > 0 && (
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
                        {isMaterialOpen && (
                          <div className="mt-3 space-y-2">
                            {availableMaterials.map((material) => (
                              <div key={material} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`material-${material}`}
                                  checked={selectedMaterials.includes(material)}
                                  onCheckedChange={() => toggleMaterial(material)}
                                  data-testid={`checkbox-material-${material}`}
                                />
                                <label
                                  htmlFor={`material-${material}`}
                                  className="text-sm text-foreground cursor-pointer"
                                >
                                  {material}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Color Filter */}
                    {availableColors.length > 0 && (
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
                        {isColorOpen && (
                          <div className="mt-3 space-y-2">
                            {availableColors.map((color) => (
                              <div key={color} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`color-${color}`}
                                  checked={selectedColors.includes(color)}
                                  onCheckedChange={() => toggleColor(color)}
                                  data-testid={`checkbox-color-${color}`}
                                />
                                <label
                                  htmlFor={`color-${color}`}
                                  className="text-sm text-foreground cursor-pointer"
                                >
                                  {color}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </aside>

              {/* Right Content - Products Grid */}
              <main className="flex-1">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground" data-testid="text-product-count">
                    Showing {displayProducts.length} of {products?.length || 0} products
                  </p>
                </div>
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
        maxPrice={maxPrice}
        selectedMaterials={selectedMaterials}
        onMaterialToggle={toggleMaterial}
        availableMaterials={availableMaterials}
        selectedColors={selectedColors}
        onColorToggle={toggleColor}
        availableColors={availableColors}
        onClearFilters={clearFilters}
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
