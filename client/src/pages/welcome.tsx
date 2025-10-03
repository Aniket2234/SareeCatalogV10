import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

export default function Welcome() {
  const [, setLocation] = useLocation();
  const [isExiting, setIsExiting] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleExplore = () => {
    setIsExiting(true);
    setTimeout(() => {
      setLocation("/home");
    }, 500);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Video Background */}
      {!videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/Videos/Welcome.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Premium Gradient Fallback */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#faeedc] via-[#faeedc] to-[#faeedc] transition-opacity duration-500 ${
          videoLoaded && !videoError ? "opacity-0" : "opacity-100"
        }`}
      />
      
      {/* Soft Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#8B4513]/20 via-transparent to-[#8B4513]/20" />
      
      {/* Content */}
      <div className="relative text-center flex flex-col justify-between min-h-screen py-20" data-testid="welcome-content">
        {/* Top Section - Title and Slogan */}
        <div className="animate-float-slow flex flex-col items-center">
          <h1 
            className="font-serif text-6xl md:text-8xl font-bold mb-4 text-[#8B4513]"
            style={{
              animation: 'fadeInUp 1.5s ease-out forwards',
              letterSpacing: '0.1em',
              textShadow: '0 0 30px rgba(250, 238, 220, 0.9), 0 0 60px rgba(250, 238, 220, 0.7), 0 4px 10px rgba(0, 0, 0, 0.3)'
            }}
            data-testid="welcome-title"
          >
            ATAURUM
          </h1>
          
          <p 
            className="text-xl md:text-2xl font-light tracking-wider text-[#8B4513]"
            style={{
              animation: 'fadeInUp 1.8s ease-out 0.3s forwards, breathe 4s ease-in-out infinite',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              textShadow: '0 0 20px rgba(250, 238, 220, 0.9), 0 0 40px rgba(250, 238, 220, 0.7), 0 2px 8px rgba(0, 0, 0, 0.3)'
            }}
            data-testid="welcome-subtitle"
          >
            where traditions meets elegance
          </p>
        </div>
        
        {/* Bottom Section - Social Icons and Button */}
        <div 
          className="animate-float-fast delay-600 flex flex-col items-center gap-6"
          style={{
            animation: 'fadeInUp 2s ease-out 0.6s forwards, pulse-gentle 3s ease-in-out infinite'
          }}
        >
          {/* Social Media Icons */}
          <div className="flex items-center gap-8">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#faeedc] hover:text-white transition-all duration-300 hover:scale-110 drop-shadow-lg"
              aria-label="Instagram"
            >
              <FaInstagram size={42} />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#faeedc] hover:text-white transition-all duration-300 hover:scale-110 drop-shadow-lg"
              aria-label="Facebook"
            >
              <FaFacebook size={42} />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#faeedc] hover:text-white transition-all duration-300 hover:scale-110 drop-shadow-lg"
              aria-label="YouTube"
            >
              <FaYoutube size={42} />
            </a>
          </div>
          
          {/* Explore Button */}
          <button
            onClick={handleExplore}
            className="group bg-[#faeedc] hover:bg-[#faeedc] text-[#8B4513] px-10 py-5 rounded-full font-semibold text-lg transition-all duration-500 shadow-2xl hover:shadow-[#faeedc]/50 hover:scale-105 transform hover:-translate-y-1 border border-[#faeedc]/40 backdrop-blur-sm"
            data-testid="button-explore"
          >
            <span className="flex items-center justify-center">
              Explore Our Catalog 
              <ArrowRight className="ml-3 inline-block group-hover:translate-x-2 transition-transform duration-300" size={22} />
            </span>
          </button>
          
          {/* Google Review Section */}
          <a
            href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star 
                  key={index} 
                  className="w-6 h-6 fill-[#faeedc] text-[#faeedc] group-hover:scale-110 transition-transform duration-200" 
                  style={{ transitionDelay: `${index * 50}ms` }}
                />
              ))}
            </div>
            <p className="text-[#faeedc] text-sm font-medium tracking-wide drop-shadow-lg">
              Review us on Google in one tap
            </p>
          </a>
        </div>
      </div>
      
      {/* Custom Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.02);
            opacity: 1;
          }
        }
        
        @keyframes pulse-gentle {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes float-medium {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        
        @keyframes float-fast {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}