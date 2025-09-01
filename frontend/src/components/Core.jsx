import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Eye,
  Award,
  MapPin,
} from "lucide-react";

const Core = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Touch/swipe support
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const containerRef = useRef(null);

  // Define core values with Lucide icons
  const crafts = [
    {
      id: 1,
      title: "Trust",
      description:
        "Building lasting relationships through honesty, integrity, and transparent communication in every transaction.",
      icon: (
        <Shield
          strokeWidth={1}
          className="w-16 h-16 sm:w-20 sm:h-20 text-red-600 transition-transform duration-300 group-hover:scale-110"
        />
      ),
    },
    {
      id: 2,
      title: "Transparency",
      description:
        "Clear, honest communication and full disclosure throughout your real estate journey with no hidden surprises.",
      icon: (
        <Eye
          strokeWidth={1}
          className="w-16 h-16 sm:w-20 sm:h-20 text-red-600 transition-transform duration-300 group-hover:scale-110"
        />
      ),
    },
    {
      id: 3,
      title: "Excellence",
      description:
        "Delivering exceptional service with attention to detail and commitment to exceeding your expectations.",
      icon: (
        <Award
          strokeWidth={1}
          className="w-16 h-16 sm:w-20 sm:h-20 text-red-600 transition-transform duration-300 group-hover:scale-110"
        />
      ),
    },
    {
      id: 4,
      title: "Local Expertise",
      description:
        "Deep knowledge of Berlin neighborhoods, market trends, and insider insights for informed decisions.",
      icon: (
        <MapPin
          strokeWidth={1}
          className="w-16 h-16 sm:w-20 sm:h-20 text-red-600 transition-transform duration-300 group-hover:scale-110"
        />
      ),
    },
  ];

  // Responsive items per view
  const updateItemsPerView = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 640) setItemsPerView(1); // Mobile
      else if (width < 1024) setItemsPerView(2); // Tablet
      else if (width < 1280) setItemsPerView(3); // Small desktop
      else setItemsPerView(4); // Large desktop
    }
  };

  // Update items per view on mount and resize
  useEffect(() => {
    updateItemsPerView();
    const handleResize = () => updateItemsPerView();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, itemsPerView]);

  const maxIndex = Math.max(0, crafts.length - itemsPerView);
  const cardWidth = 100 / itemsPerView;
  const gap = itemsPerView === 1 ? 0 : 1.5;

  // Touch handlers for swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
    setIsAutoPlaying(false); // Pause auto-play on touch
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;

    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    // Resume auto-play after 3 seconds
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
    <section
      className="relative w-full bg-gray-50 font-sans py-12 sm:py-16 lg:py-24"
      role="region"
      aria-label="Our core values"
    >
      {/* Background Shape */}
      <div className="absolute top-0 left-0 w-full h-3/5 bg-gradient-to-br from-red-500 to-red-700"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-white tracking-wide mb-4">
            OUR CORE VALUES
          </h1>
          <div className="flex items-center justify-center gap-4 text-white text-base sm:text-lg font-light">
            <div className="w-8 sm:w-12 h-px bg-white opacity-50"></div>
            <span>Living Made Simple</span>
            <div className="w-8 sm:w-12 h-px bg-white opacity-50"></div>
          </div>
        </header>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="overflow-hidden rounded-xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            ref={containerRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Core values showcase"
          >
            <div
              className="flex transition-all duration-700 ease-in-out"
              style={{
                gap: `${gap}%`,
                transform: `translateX(-${currentIndex * (cardWidth + gap)}%)`,
              }}
              role="group"
              aria-live="polite"
            >
              {crafts.map((craft, index) => (
                <article
                  key={craft.id}
                  className="flex-shrink-0 group cursor-pointer"
                  style={{ width: `${cardWidth - gap}%` }}
                  role="tabpanel"
                  aria-roledescription="slide"
                  aria-label={`${craft.title}: ${craft.description}`}
                  tabIndex={
                    index >= currentIndex && index < currentIndex + itemsPerView
                      ? 0
                      : -1
                  }
                >
                  <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 rounded-xl overflow-hidden transform hover:-translate-y-3 hover:scale-[1.02] h-full">
                    {/* Card Content */}
                    <div className="relative h-64 sm:h-72 lg:h-80 flex flex-col items-center justify-center p-6 text-center">
                      {/* Default state - Icon and Title */}
                      <div className="flex flex-col items-center justify-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-95">
                        <div className="mb-4">{craft.icon}</div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
                          {craft.title}
                        </h2>
                      </div>

                      {/* Hover state - Description */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-white text-sm sm:text-base leading-relaxed">
                          {craft.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - HIDDEN ON DESKTOP (lg:hidden) */}
          {itemsPerView < crafts.length && (
            <div className="flex justify-center mt-8 gap-4 lg:hidden">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous slide"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </button>

              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next slide"
                disabled={currentIndex >= maxIndex}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </button>
            </div>
          )}

          {/* Pagination Dots - HIDDEN ON DESKTOP (lg:hidden) */}
          {itemsPerView < crafts.length && (
            <div
              className="flex justify-center mt-6 gap-2 lg:hidden"
              role="tablist"
              aria-label="Slide navigation"
            >
              {Array.from({ length: maxIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  role="tab"
                  aria-selected={index === currentIndex}
                />
              ))}
            </div>
          )}

          {/* Progress Bar - HIDDEN ON DESKTOP (lg:hidden) */}
          {itemsPerView < crafts.length && (
            <div className="mt-4 w-full bg-white/20 rounded-full h-1 overflow-hidden lg:hidden">
              <div
                className="h-full bg-white transition-all duration-300 ease-out"
                style={{
                  width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Core;
