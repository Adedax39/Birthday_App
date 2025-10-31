import React, { useState, useEffect, useRef } from 'react';
import { Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function BirthdayGift() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);

  // Load images from src/images directory so webpack bundles them (works with CRA / webpack)
  const importAll = (r) => r.keys().map((key) => ({ key, src: r(key) }));
  const importedImages = importAll(require.context('./images', false, /\.(jpe?g|png|svg)$/));
  // Sort filenames numerically (1.jpg, 2.jpg, ...)
  importedImages.sort((a, b) =>
    a.key.replace('./', '').localeCompare(b.key.replace('./', ''), undefined, { numeric: true })
  );
  const photos = importedImages.map((i) => i.src);

  const messages = [
    "Happy Birthday! 🎉",
    "You make every day special! 💕",
    "Here's to celebrating YOU! 🌟",
    "With love and appreciation! 💝",
  ];

  // Create confetti effect
  const triggerConfetti = () => {
    const hearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setFloatingHearts(hearts);

    setTimeout(() => {
      setFloatingHearts([]);
    }, 3000);
  };

  // Gallery navigation
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      nextPhoto();
    }
    if (touchStart - touchEnd < -50) {
      prevPhoto();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Floating hearts confetti */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: `${heart.left}%`,
            top: '-20px',
            animation: `float 3s ease-in forwards`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        </div>
      ))}

      <style>{`
        @keyframes float {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes rotateGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes floatY {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes carousel-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-in {
          animation: fadeInScale 0.6s ease-out;
        }
        .animate-bounce-custom {
          animation: bounce 2s infinite;
        }
        .animate-pulse-custom {
          animation: pulse 2s infinite;
        }
        .animate-slide-in {
          animation: slideInLeft 0.8s ease-out;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .animate-float-y {
          animation: floatY 3s ease-in-out infinite;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col w-full max-w-full">
        {/* Header Section */}
        <div className="text-center pt-8 px-5 md:pt-20">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-in mb-2">
            Happy Birthday! 🎂
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl animate-slide-in mt-2">
            A special day for a special person
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-5 px-5 py-5 md:py-0 md:gap-8">
          {/* Left Side - Message & Button */}
          <div className="w-full md:w-1/2 max-w-lg space-y-4 md:space-y-6 animate-in">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl md:rounded-2xl p-5 md:p-8 shadow-2xl hover:shadow-2xl hover:bg-slate-800/70 transition-all duration-300 border border-purple-500/30 animate-in hover:border-purple-400/60">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-3 md:mb-4">
                {messages[Math.floor(Math.random() * messages.length)]}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                This website is created with love to celebrate your special day. Below you'll find a gallery of wonderful memories we've shared together. Thank you for bringing so much joy and happiness into my life!
              </p>
              <button
                onClick={triggerConfetti}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold py-3 md:py-4 px-6 rounded-lg hover:shadow-2xl transform active:scale-95 md:hover:scale-110 transition-all duration-300 flex items-center justify-center gap-2 animate-pulse-custom shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 text-base md:text-base"
              >
                <Heart className="w-5 h-5 md:w-5 md:h-5 animate-bounce-custom" />
                Celebrate! 🎉
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-lg md:rounded-xl p-3 md:p-4 text-white text-center shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 transform active:scale-95 md:hover:scale-105 animate-in">
                <div className="text-2xl md:text-3xl font-bold animate-bounce-custom">∞</div>
                <div className="text-sm md:text-base mt-1 font-semibold">Memories</div>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg md:rounded-xl p-3 md:p-4 text-white text-center shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform active:scale-95 md:hover:scale-105 animate-in">
                <div className="text-2xl md:text-3xl font-bold animate-pulse-custom">💕</div>
                <div className="text-sm md:text-base mt-1 font-semibold">Love Always</div>
              </div>
            </div>
          </div>

          {/* Right Side - Carousel Gallery */}
          <div className="w-full md:w-1/2 flex flex-col items-center gap-3 md:gap-6 animate-in max-w-lg">
            {/* Main Carousel */}
            <div 
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full"
            >
              {/* Carousel Container */}
              <div className="relative w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/50 bg-slate-800 border border-purple-500/30">
                {/* Photos Carousel with Smooth Transition */}
                <div className="relative w-full h-full">
                  {photos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={`Memory ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out cursor-pointer ${
                        idx === currentPhotoIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95'
                      }`}
                      onClick={() => setSelectedPhoto(idx)}
                    />
                  ))}
                </div>

                {/* Navigation Buttons - Hidden on Mobile, Visible on Tablet+ */}
                <button
                  onClick={prevPhoto}
                  className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-500 p-2 rounded-full shadow-lg shadow-purple-500/50 transition-all hover:scale-125 z-20 text-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-500 p-2 rounded-full shadow-lg shadow-purple-500/50 transition-all hover:scale-125 z-20 text-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Mobile Only Navigation - Swipe Indicators */}
                <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-xs bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  ← Swipe to navigate →
                </div>

                {/* Photo Counter */}
                <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-purple-500/50">
                  {currentPhotoIndex + 1} / {photos.length}
                </div>
              </div>

              {/* Dots Indicator - Mobile Optimized */}
              <div className="flex justify-center gap-1.5 md:gap-2 mt-3 md:mt-4 flex-wrap">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhotoIndex(idx)}
                    className={`h-2 md:h-3 transition-all duration-300 rounded-full ${
                      idx === currentPhotoIndex
                        ? 'bg-purple-500 w-6 md:w-8 shadow-lg shadow-purple-500/50'
                        : 'bg-purple-300/40 w-2 md:w-3 hover:bg-purple-300/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Preview Strip - Optimized for Mobile */}
            <div className="w-full overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 md:gap-3 justify-start md:justify-center px-1 pb-2 min-w-max md:min-w-0">
                {photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhotoIndex(idx)}
                    className={`flex-shrink-0 w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden transition-all transform active:scale-95 md:hover:scale-110 border-2 ${
                      idx === currentPhotoIndex
                        ? 'ring-2 md:ring-4 ring-purple-400 scale-100 md:scale-110 border-purple-400 shadow-lg shadow-purple-500/50'
                        : 'opacity-60 hover:opacity-100 border-purple-500/30'
                    }`}
                  >
                    <img
                      src={photo}
                      alt={`Thumb ${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Full Screen Photo */}
        {selectedPhoto !== null && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative w-full max-w-3xl max-h-[80vh] rounded-lg overflow-hidden shadow-2xl shadow-purple-500/50 border border-purple-500/30 transform scale-100 animate-in">
              <img
                src={photos[selectedPhoto]}
                alt="Full view"
                className="w-full h-full object-contain"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(null);
                }}
                className="absolute top-3 right-3 md:top-4 md:right-4 bg-purple-600/80 hover:bg-purple-500 p-2 md:p-2.5 rounded-full text-white transition-all active:scale-95 md:hover:scale-110 shadow-lg shadow-purple-500/50"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pb-6 md:pb-8 px-4">
          <p className="text-gray-400 text-sm md:text-base font-semibold">
            Made with <Heart className="w-4 h-4 md:w-4 md:h-4 inline text-red-500 fill-red-500 animate-bounce-custom" /> by someone who cares about you
          </p>
        </div>
      </div>
    </div>
  );
}