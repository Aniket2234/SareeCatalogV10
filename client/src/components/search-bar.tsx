import { useState, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, X, Mic, MicOff } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priceFilter: string;
  onPriceChange: (price: string) => void;
  materialFilter: string;
  onMaterialChange: (material: string) => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  priceFilter,
  onPriceChange,
  materialFilter,
  onMaterialChange,
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for browser support
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
      onSearchChange(transcript);
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
  }, [onSearchChange]);

  const toggleVoiceSearch = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <section className="w-full flex justify-center py-8">
      <div className="w-full max-w-2xl">
        {/* Main Search Box */}
        <div className="relative flex items-center bg-white rounded-full shadow-md px-4 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-pink-400">
          {/* Search Icon */}
          <Search className="text-pink-500 mr-3" size={20} />

          {/* Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for silk sarees, cotton sarees, designer collections..."
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            data-testid="input-search"
          />

          {/* Voice Search Button */}
          {isSupported && (
            <button
              onClick={toggleVoiceSearch}
              className={`mr-3 p-2 rounded-full transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'text-pink-500 hover:bg-pink-50'
              }`}
              title={isListening ? 'Stop listening' : 'Voice search'}
              data-testid="button-voice-search"
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          )}

          {/* Filter Dropdowns (Desktop) */}
          <div className="hidden md:flex gap-2 ml-3">
            <select
              value={priceFilter}
              onChange={(e) => onPriceChange(e.target.value)}
              className="px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-400"
              data-testid="select-price-filter"
            >
              <option value="">Price</option>
              <option value="0-5000">₹0 - ₹5,000</option>
              <option value="5000-15000">₹5,000 - ₹15,000</option>
              <option value="15000-50000">₹15,000 - ₹50,000</option>
              <option value="50000+">₹50,000+</option>
            </select>

            <select
              value={materialFilter}
              onChange={(e) => onMaterialChange(e.target.value)}
              className="px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-400"
              data-testid="select-material-filter"
            >
              <option value="">Material</option>
              <option value="silk">Silk</option>
              <option value="cotton">Cotton</option>
              <option value="chiffon">Chiffon</option>
              <option value="georgette">Georgette</option>
            </select>
          </div>

          {/* Filter Icon (Mobile) */}
          <button
            onClick={() => setShowFilters(true)}
            className="ml-3 md:hidden text-pink-500"
            data-testid="button-filters-mobile"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Mobile Filter Panel */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
            <div className="w-64 bg-white h-full shadow-lg p-4 flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                  data-testid="button-close-filters"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Price Filter */}
              <label className="text-sm font-medium mb-1">Price</label>
              <select
                value={priceFilter}
                onChange={(e) => onPriceChange(e.target.value)}
                className="w-full mb-4 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-400"
                data-testid="select-price-filter-mobile"
              >
                <option value="">All</option>
                <option value="0-5000">₹0 - ₹5,000</option>
                <option value="5000-15000">₹5,000 - ₹15,000</option>
                <option value="15000-50000">₹15,000 - ₹50,000</option>
                <option value="50000+">₹50,000+</option>
              </select>

              {/* Material Filter */}
              <label className="text-sm font-medium mb-1">Material</label>
              <select
                value={materialFilter}
                onChange={(e) => onMaterialChange(e.target.value)}
                className="w-full mb-4 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-pink-400"
                data-testid="select-material-filter-mobile"
              >
                <option value="">All</option>
                <option value="silk">Silk</option>
                <option value="cotton">Cotton</option>
                <option value="chiffon">Chiffon</option>
                <option value="georgette">Georgette</option>
              </select>

              {/* Apply Button */}
              <button
                onClick={() => setShowFilters(false)}
                className="mt-auto bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
                data-testid="button-apply-filters"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
