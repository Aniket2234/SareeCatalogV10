import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft, Facebook, Instagram, Twitter } from "lucide-react";
import { useLocation } from "wouter";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [, setLocation] = useLocation();

  const handleCategoryClick = (categorySlug: string) => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = 'unset';
    }, 300);
    
    setLocation(`/category/${categorySlug}`);
  };

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'unset';
      }, 300);
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleMobileMenu();
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <header className="bg-card shadow-md sticky top-0 z-40 border-b border-border" data-testid="header">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={handleBackClick}
          className="flex items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors"
          data-testid="button-back"
        >
          <ArrowLeft size={24} className="text-foreground" />
        </button>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          <div className="w-6 h-0.5 bg-[#faeedc]"></div>
          <h1 className="font-serif text-xl font-bold tracking-widest text-[#8B4513]" data-testid="logo-text" style={{ letterSpacing: '0.15em' }}>
            ATAURUM
          </h1>
          <div className="w-6 h-0.5 bg-[#faeedc]"></div>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="flex items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors"
          data-testid="button-hamburger"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-foreground" />
          ) : (
            <Menu size={24} className="text-foreground" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <>
          <div
            className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
              isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleBackdropClick}
            data-testid="nav-backdrop"
          />

          <div
            className={`fixed top-0 right-0 bottom-0 z-[70] bg-background shadow-xl transition-transform duration-300 ease-in-out w-full sm:w-80 md:w-96 overflow-y-auto ${
              isAnimating ? 'translate-x-0' : 'translate-x-full'
            }`}
            data-testid="nav-menu"
          >
            <div className="sticky top-0 bg-background border-b border-border z-10">
              <div className="px-4 py-4 flex items-center justify-between">
                <h2 className="text-lg font-serif font-bold text-foreground">Menu</h2>
                <button
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <X size={24} className="text-foreground" />
                </button>
              </div>
            </div>

            <div className="px-6 py-6 space-y-8">
              <div
                className="transform transition-all duration-500 ease-out delay-100"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? 'translateX(0)' : 'translateX(20px)'
                }}
              >
                <h2 className="text-xl font-serif font-bold text-foreground mb-4">Categories</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleCategoryClick("new-trends")}
                    className="flex items-center justify-center p-3 text-foreground hover:bg-accent rounded-xl transition-all duration-300 border border-border hover:border-primary hover:scale-105 text-center"
                    data-testid="link-new-trends"
                  >
                    <span className="font-medium text-sm">New Trends</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick("banarasi-silk")}
                    className="flex items-center justify-center p-3 text-foreground hover:bg-accent rounded-xl transition-all duration-300 border border-border hover:border-primary hover:scale-105 text-center"
                    data-testid="link-banarasi-silk"
                  >
                    <span className="font-medium text-sm">Banarasi Silk</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick("georgette")}
                    className="flex items-center justify-center p-3 text-foreground hover:bg-accent rounded-xl transition-all duration-300 border border-border hover:border-primary hover:scale-105 text-center"
                    data-testid="link-georgette"
                  >
                    <span className="font-medium text-sm">Georgette</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick("printed-silk")}
                    className="flex items-center justify-center p-3 text-foreground hover:bg-accent rounded-xl transition-all duration-300 border border-border hover:border-primary hover:scale-105 text-center"
                    data-testid="link-printed-silk"
                  >
                    <span className="font-medium text-sm">Printed Silk</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick("satin")}
                    className="flex items-center justify-center p-3 text-foreground hover:bg-accent rounded-xl transition-all duration-300 border border-border hover:border-primary hover:scale-105 text-center"
                    data-testid="link-satin"
                  >
                    <span className="font-medium text-sm">Satin</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick("pure-cotton")}
                    className="flex items-center justify-center p-3 text-foreground hover:bg-accent rounded-xl transition-all duration-300 border border-border hover:border-primary hover:scale-105 text-center"
                    data-testid="link-pure-cotton"
                  >
                    <span className="font-medium text-sm">Pure Cotton</span>
                  </button>
                </div>
              </div>

              <div
                className="border-t border-border pt-6 transform transition-all duration-500 ease-out delay-200"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? 'translateX(0)' : 'translateX(20px)'
                }}
              >
                <h3 className="text-xl font-serif font-bold text-foreground mb-4">Shop Information</h3>
                <div className="space-y-4">
                  <div className="text-sm p-4 rounded-xl border border-border hover:bg-accent transition-all duration-300">
                    <h4 className="font-bold text-foreground mb-2">Elegant Sarees Collection</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Shop no 45A, Fashion Plaza, MG Road, Commercial Street,
                      Bangalore, Karnataka 560001
                    </p>
                  </div>

                  <div className="text-sm p-4 rounded-xl border border-border hover:bg-accent transition-all duration-300">
                    <h4 className="font-bold text-foreground mb-2">09876543210</h4>
                    <p className="text-muted-foreground">For inquiries & orders</p>
                  </div>

                  <div className="text-sm p-4 rounded-xl border border-border hover:bg-accent transition-all duration-300">
                    <h4 className="font-bold text-foreground mb-2">10:00 AM - 9:00 PM</h4>
                    <p className="text-muted-foreground">Open all days</p>
                  </div>

                  <div className="text-sm p-4 rounded-xl border border-border hover:bg-accent transition-all duration-300">
                    <h4 className="font-bold text-foreground mb-3">@elegantsareescollection</h4>
                    <p className="text-muted-foreground mb-4">Follow us for updates</p>
                    <div className="flex space-x-4">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 hover:scale-110 transition-all duration-300"
                        aria-label="Facebook"
                      >
                        <Facebook size={20} className="text-primary-foreground" />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/80 hover:scale-110 transition-all duration-300"
                        aria-label="Instagram"
                      >
                        <Instagram size={20} className="text-secondary-foreground" />
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 hover:scale-110 transition-all duration-300"
                        aria-label="Twitter"
                      >
                        <Twitter size={20} className="text-accent-foreground" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
