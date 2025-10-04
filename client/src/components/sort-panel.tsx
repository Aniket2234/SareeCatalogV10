import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Check } from "lucide-react";

export type SortOption =
  | "featured"
  | "best-selling"
  | "alphabetically-az"
  | "alphabetically-za"
  | "price-low-high"
  | "price-high-low"
  | "date-old-new"
  | "date-new-old";

interface SortPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best selling" },
  { value: "alphabetically-az", label: "Alphabetically, A-Z" },
  { value: "alphabetically-za", label: "Alphabetically, Z-A" },
  { value: "price-low-high", label: "Price, low to high" },
  { value: "price-high-low", label: "Price, high to low" },
  { value: "date-old-new", label: "Date, old to new" },
  { value: "date-new-old", label: "Date, new to old" },
];

export function SortPanel({
  open,
  onOpenChange,
  selectedSort,
  onSortChange,
}: SortPanelProps) {
  const handleSortSelect = (sort: SortOption) => {
    onSortChange(sort);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="bg-card rounded-t-2xl p-0">
        <div className="flex flex-col">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Sort by</h3>
          </div>

          <div className="px-6 py-4 space-y-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className="w-full text-left py-3 px-4 rounded-lg hover:bg-accent transition-colors flex items-center justify-between group"
              >
                <span
                  className={`text-foreground ${
                    selectedSort === option.value ? "font-semibold" : ""
                  }`}
                >
                  {option.label}
                </span>
                {selectedSort === option.value && (
                  <Check className="h-5 w-5 text-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
