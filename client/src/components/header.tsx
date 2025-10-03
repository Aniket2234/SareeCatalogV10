// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// export default function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <header className="bg-card shadow-md sticky top-0 z-40" data-testid="header">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <div className="flex items-center">
//           <h1 className="font-serif text-2xl font-bold text-primary" data-testid="text-logo">
//             Elegant Sarees
//           </h1>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-8" data-testid="nav-desktop">
//           <a href="#" className="text-foreground hover:text-primary transition-colors" data-testid="link-home">
//             Home
//           </a>
//           <a href="#" className="text-foreground hover:text-primary transition-colors" data-testid="link-categories">
//             Categories
//           </a>
//           <a href="#" className="text-foreground hover:text-primary transition-colors" data-testid="link-about">
//             About
//           </a>
//           <a href="#" className="text-foreground hover:text-primary transition-colors" data-testid="link-contact">
//             Contact
//           </a>
//         </nav>

//         {/* Mobile Hamburger */}
//         <button
//           onClick={toggleMobileMenu}
//           className={`md:hidden flex flex-col space-y-1 ${isMobileMenuOpen ? "hamburger-active" : ""}`}
//           data-testid="button-hamburger"
//         >
//           {isMobileMenuOpen ? (
//             <X size={24} className="text-foreground" />
//           ) : (
//             <Menu size={24} className="text-foreground" />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-card border-t border-border animate-slide-up" data-testid="nav-mobile">
//           <nav className="container mx-auto px-4 py-4 space-y-4">
//             <a href="#" className="block text-foreground hover:text-primary transition-colors" data-testid="link-home-mobile">
//               Home
//             </a>
//             <a href="#" className="block text-foreground hover:text-primary transition-colors" data-testid="link-categories-mobile">
//               Categories
//             </a>
//             <a href="#" className="block text-foreground hover:text-primary transition-colors" data-testid="link-about-mobile">
//               About
//             </a>
//             <a href="#" className="block text-foreground hover:text-primary transition-colors" data-testid="link-contact-mobile">
//               Contact
//             </a>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }




// import { useState } from "react";
// import { Menu, X, ArrowLeft } from "lucide-react";
// import { useLocation } from "wouter";

// export default function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [, setLocation] = useLocation();

//   const handleCategoryClick = (category: string) => {
//     setIsMobileMenuOpen(false);
//     const url = `/home?category=${category}#categories`;
//     setLocation(url);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleBackClick = () => {
//     // Always navigate to Welcome page instead of browser back
//     setLocation("/");
//   };

//   return (
//     <header className="bg-card shadow-md sticky top-0 z-40" data-testid="header">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         {/* Back Button */}
//         <button
//           onClick={handleBackClick}
//           className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
//           data-testid="button-back"
//         >
//           <ArrowLeft size={24} className="text-foreground" />
//         </button>

//         {/* Centered Logo */}
//         <div className="absolute left-1/2 transform -translate-x-1/2">
//           <h1 className="font-serif text-2xl font-bold text-primary" data-testid="text-logo">
//             Elegant Sarees
//           </h1>
//         </div>

//         {/* Hamburger Menu - Always visible */}
//         <button
//           onClick={toggleMobileMenu}
//           className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
//           data-testid="button-hamburger"
//         >
//           {isMobileMenuOpen ? (
//             <X size={24} className="text-foreground" />
//           ) : (
//             <Menu size={24} className="text-foreground" />
//           )}
//         </button>
//       </div>

//       {/* Dropdown Menu */}
//       {isMobileMenuOpen && (
//         <div className="bg-card border-t border-border animate-slide-up shadow-lg" data-testid="nav-menu">
//           <nav className="container mx-auto px-4 py-6 space-y-6">
//             {/* Categories Section */}
//             <div>
//               <h3 className="text-lg font-semibold text-primary mb-4" data-testid="categories-title">
//                 Categories
//               </h3>
//               <div className="space-y-3 pl-4">
//                 <button 
//                   onClick={() => handleCategoryClick("new-trends")}
//                   className="block w-full text-left text-foreground hover:text-primary transition-colors py-2 border-b border-gray-100 last:border-b-0" 
//                   data-testid="link-new-trends"
//                 >
//                   New Trends
//                 </button>
//                 <button 
//                   onClick={() => handleCategoryClick("banarasi-silk")}
//                   className="block w-full text-left text-foreground hover:text-primary transition-colors py-2 border-b border-gray-100 last:border-b-0" 
//                   data-testid="link-banarasi-silk"
//                 >
//                   Banarasi Silk
//                 </button>
//                 <button 
//                   onClick={() => handleCategoryClick("georgette")}
//                   className="block w-full text-left text-foreground hover:text-primary transition-colors py-2 border-b border-gray-100 last:border-b-0" 
//                   data-testid="link-georgette"
//                 >
//                   Georgette
//                 </button>
//                 <button 
//                   onClick={() => handleCategoryClick("printed-silk")}
//                   className="block w-full text-left text-foreground hover:text-primary transition-colors py-2 border-b border-gray-100 last:border-b-0" 
//                   data-testid="link-printed-silk"
//                 >
//                   Printed Silk
//                 </button>
//                 <button 
//                   onClick={() => handleCategoryClick("satin")}
//                   className="block w-full text-left text-foreground hover:text-primary transition-colors py-2 border-b border-gray-100 last:border-b-0" 
//                   data-testid="link-satin"
//                 >
//                   Satin
//                 </button>
//                 <button 
//                   onClick={() => handleCategoryClick("pure-cotton")}
//                   className="block w-full text-left text-foreground hover:text-primary transition-colors py-2 border-b border-gray-100 last:border-b-0" 
//                   data-testid="link-pure-cotton"
//                 >
//                   Pure Cotton
//                 </button>
//               </div>
//             </div>

//             {/* Shop Information Section */}
//             <div className="border-t border-gray-200 pt-4">
//               <h3 className="text-lg font-semibold text-primary mb-4" data-testid="shop-info-title">
//                 Shop Information
//               </h3>
//               <div className="space-y-4 pl-4">
//                 {/* Store Name & Address */}
//                 <div className="text-sm" data-testid="store-info">
//                   <h4 className="font-medium text-foreground mb-1">Elegant Sarees Collection</h4>
//                   <p className="text-gray-600">Shop no 45A, Fashion Plaza, MG Road, Commercial Street, Bangalore, Karnataka 560001</p>
//                 </div>

//                 {/* Phone */}
//                 <div className="text-sm" data-testid="phone-info">
//                   <h4 className="font-medium text-foreground mb-1">09876543210</h4>
//                   <p className="text-gray-600">For inquiries & orders</p>
//                 </div>

//                 {/* Hours */}
//                 <div className="text-sm" data-testid="hours-info">
//                   <h4 className="font-medium text-foreground mb-1">10:00 AM - 9:00 PM</h4>
//                   <p className="text-gray-600">Open all days</p>
//                 </div>

//                 {/* Social Media */}
//                 <div className="text-sm" data-testid="social-info">
//                   <h4 className="font-medium text-foreground mb-1">@elegantsareescollection</h4>
//                   <p className="text-gray-600">Follow us for updates</p>
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }













import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft, Facebook, Instagram, Twitter, User, Package, IndianRupee, Video, Tag, Star } from "lucide-react";
import { useLocation } from "wouter";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [, setLocation] = useLocation();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCategoryClick = (category: string) => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = 'unset';
    }, 300);
    
    // Use window.location to ensure the page properly reads the URL parameters
    const url = `/home?category=${category}#categories`;
    window.location.href = url;
  };

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      // Opening menu - from left to right
      setIsMobileMenuOpen(true);
      // Start animation after a small delay to ensure DOM is updated
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Closing menu - from right to left
      setIsAnimating(false);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        // Restore body scroll
        document.body.style.overflow = 'unset';
      }, 500);
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const handleNavigation = (path: string) => {
    setIsAnimating(false);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
    setLocation(path);
  };

  // Close menu when clicking on backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleMobileMenu();
    }
  };

  return (
    <header className="bg-card shadow-md sticky top-0 z-40 border-b border-border" data-testid="header">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="flex items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors"
          data-testid="button-back"
        >
          <ArrowLeft size={24} className="text-foreground" />
        </button>

        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          <div className="w-6 h-0.5 bg-[#faeedc]"></div>
          <h1 className="font-serif text-xl font-bold tracking-widest text-[#8B4513]" data-testid="logo-text" style={{ letterSpacing: '0.15em' }}>
            ATAURUM
          </h1>
          <div className="w-6 h-0.5 bg-[#faeedc]"></div>
        </div>

        {/* Hamburger Menu - Always visible */}
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

      {/* Dropdown Menu with Background Image */}
      {(isMobileMenuOpen || isAnimating) && (
        <div
          className={`fixed inset-0 z-[60] bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-in-out ${
            isAnimating 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-full opacity-100'
          }`}
          style={{ backgroundImage: "url('/images/image.png')" }}
          data-testid="nav-menu"
          onClick={handleBackdropClick}
        >
          {/* Content Container */}
          <div className="relative z-[70] h-full overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-transparent">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <button
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center p-2 rounded-lg hover:bg-primary/10 transition-all duration-200"
                >
                  <X size={24} className="text-foreground" />
                </button>
              </div>
            </div>

            {/* Menu Content */}
            <div className="container mx-auto px-6 py-8 space-y-8">

              {/* Categories Section - Updated with proper spacing */}
              <div
                className="mb-6 transform transition-all duration-500 ease-out delay-200"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? 'translateX(0)' : 'translateX(-20px)'
                }}
                >
                <h2 className="text-xl font-serif font-bold text-foreground mb-4">Categories</h2>
                <div className="grid grid-cols-2 gap-3 px-1">
                  <button
                    onClick={() => handleCategoryClick("new-trends")}
                    className="flex items-center justify-center p-3 text-foreground hover:bg-accent rounded-xl transition-all duration-300 border border-border hover:border-primary hover:scale-105 text-center"
                  >
                    <span className="font-medium text-sm">New Trends</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick("banarasi-silk")}
                    className="flex items-center justify-center p-3 text-foreground hover:bg-accent rounded-xl transition-all duration-300 border border-border hover:border-primary hover:scale-105 text-center"
                  >
                    <span className="font-medium text-sm">Banarasi Silk</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick("georgette")}
                    className="flex items-center justify-center p-3 text-foreground hover:bg-accent rounded-xl transition-all duration-300 border border-border hover:border-primary hover:scale-105 text-center"
                  >
                    <span className="font-medium text-sm">Georgette</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick("printed-silk")}
                    className="flex items-center justify-center p-3 text-foreground hover:bg-accent rounded-xl transition-all duration-300 border border-border hover:border-primary hover:scale-105 text-center"
                  >
                    <span className="font-medium text-sm">Printed Silk</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick("satin")}
                    className="flex items-center justify-center p-3 text-foreground hover:bg-accent rounded-xl transition-all duration-300 border border-border hover:border-primary hover:scale-105 text-center"
                  >
                    <span className="font-medium text-sm">Satin</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick("pure-cotton")}
                    className="flex items-center justify-center p-3 text-foreground hover:bg-accent rounded-xl transition-all duration-300 border border-border hover:border-primary hover:scale-105 text-center"
                  >
                    <span className="font-medium text-sm">Pure Cotton</span>
                  </button>
                </div>
              </div>

              {/* Shop Information Section */}
              <div
                className="border-t border-border pt-6 transform transition-all duration-500 ease-out delay-300"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? 'translateX(0)' : 'translateX(-20px)'
                }}
              >
                <h3 className="text-xl font-serif font-bold text-foreground mb-4">Shop Information</h3>
                <div className="space-y-4">
                  <div className="text-sm p-4 rounded-xl border border-border hover:bg-accent transition-all duration-300 hover:scale-105">
                    <h4 className="font-bold text-foreground mb-2">Elegant Sarees Collection</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Shop no 45A, Fashion Plaza, MG Road, Commercial Street,
                      Bangalore, Karnataka 560001
                    </p>
                  </div>

                  <div className="text-sm p-4 rounded-xl border border-border hover:bg-accent transition-all duration-300 hover:scale-105">
                    <h4 className="font-bold text-foreground mb-2">09876543210</h4>
                    <p className="text-muted-foreground">For inquiries & orders</p>
                  </div>

                  <div className="text-sm p-4 rounded-xl border border-border hover:bg-accent transition-all duration-300 hover:scale-105">
                    <h4 className="font-bold text-foreground mb-2">10:00 AM - 9:00 PM</h4>
                    <p className="text-muted-foreground">Open all days</p>
                  </div>

                  {/* Social Media */}
                  <div className="text-sm p-4 rounded-xl border border-border hover:bg-accent transition-all duration-300 hover:scale-105">
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
        </div>
      )}
    </header>
  );
}