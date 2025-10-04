import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FilterPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onApplyFilters: () => void;
}

export function FilterPanel({
  open,
  onOpenChange,
  priceRange,
  onPriceRangeChange,
  onApplyFilters,
}: FilterPanelProps) {
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const handlePriceInputChange = (index: number, value: string) => {
    const numValue = parseInt(value) || 0;
    const newRange: [number, number] = [...priceRange];
    newRange[index] = numValue;
    onPriceRangeChange(newRange);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:max-w-md bg-background p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 py-4 border-b border-border">
            <SheetTitle className="text-xl font-bold text-foreground">Filters</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <div className="border-b border-border pb-4">
              <button
                onClick={() => setIsPriceOpen(!isPriceOpen)}
                className="flex items-center justify-between w-full text-left"
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
                    max={2000}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-foreground">₹</span>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceInputChange(0, e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-center"
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
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-b border-border pb-4">
              <button
                onClick={() => setIsColorOpen(!isColorOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="font-semibold text-foreground">Color</span>
                {isColorOpen ? (
                  <ChevronUp className="h-5 w-5 text-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>

            <div className="border-b border-border pb-4">
              <button
                onClick={() => setIsMaterialOpen(!isMaterialOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="font-semibold text-foreground">Material</span>
                {isMaterialOpen ? (
                  <ChevronUp className="h-5 w-5 text-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>

            <div className="border-b border-border pb-4">
              <button
                onClick={() => setIsSizeOpen(!isSizeOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="font-semibold text-foreground">Size</span>
                {isSizeOpen ? (
                  <ChevronUp className="h-5 w-5 text-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>

            <div className="border-b border-border pb-4">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center justify-between w-full text-left"
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

          <div className="px-6 py-4 border-t border-border">
            <Button
              onClick={() => {
                onApplyFilters();
                onOpenChange(false);
              }}
              className="w-full bg-foreground hover:bg-foreground/80 text-card font-semibold py-3 rounded-md"
            >
              VIEW RESULTS
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
