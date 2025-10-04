import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FilterPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
  selectedMaterials: string[];
  onMaterialToggle: (material: string) => void;
  availableMaterials: string[];
  selectedColors: string[];
  onColorToggle: (color: string) => void;
  availableColors: string[];
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

export function FilterPanel({
  open,
  onOpenChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
  selectedMaterials,
  onMaterialToggle,
  availableMaterials,
  selectedColors,
  onColorToggle,
  availableColors,
  onClearFilters,
  onApplyFilters,
}: FilterPanelProps) {
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);

  const handlePriceInputChange = (index: number, value: string) => {
    const numValue = parseInt(value) || 0;
    const newRange: [number, number] = [...priceRange];
    newRange[index] = Math.min(numValue, maxPrice);
    onPriceRangeChange(newRange);
  };

  const hasActiveFilters = selectedMaterials.length > 0 || 
    selectedColors.length > 0 || 
    priceRange[0] > 0 || 
    priceRange[1] < maxPrice;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:max-w-md bg-background p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold text-foreground">Filters</SheetTitle>
              {hasActiveFilters && (
                <button
                  onClick={onClearFilters}
                  className="text-sm text-primary hover:underline"
                  data-testid="button-clear-filters-mobile"
                >
                  Clear All
                </button>
              )}
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {/* Price Filter */}
            <div className="border-b border-border pb-4">
              <button
                onClick={() => setIsPriceOpen(!isPriceOpen)}
                className="flex items-center justify-between w-full text-left"
                data-testid="button-filter-price-mobile"
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
                    onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                    max={maxPrice}
                    step={50}
                    className="w-full"
                    data-testid="slider-price-mobile"
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-foreground">₹</span>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceInputChange(0, e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-center"
                        data-testid="input-price-min-mobile"
                      />
                    </div>
                    <span className="text-foreground">to</span>
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-foreground">₹</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceInputChange(1, e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-center"
                        data-testid="input-price-max-mobile"
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
                  data-testid="button-filter-material-mobile"
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
                          id={`material-mobile-${material}`}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={() => onMaterialToggle(material)}
                          data-testid={`checkbox-material-mobile-${material}`}
                        />
                        <label
                          htmlFor={`material-mobile-${material}`}
                          className="text-sm text-foreground cursor-pointer flex-1"
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
                  data-testid="button-filter-color-mobile"
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
                          id={`color-mobile-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => onColorToggle(color)}
                          data-testid={`checkbox-color-mobile-${color}`}
                        />
                        <label
                          htmlFor={`color-mobile-${color}`}
                          className="text-sm text-foreground cursor-pointer flex-1"
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

          <div className="px-6 py-4 border-t border-border">
            <Button
              onClick={() => {
                onApplyFilters();
                onOpenChange(false);
              }}
              className="w-full bg-foreground hover:bg-foreground/80 text-card font-semibold py-3 rounded-md"
              data-testid="button-view-results"
            >
              VIEW RESULTS
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
