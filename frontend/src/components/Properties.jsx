import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Properties = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Berlin locations instead of heritageData
  const berlinData = [
    {
      id: "brandenburg-gate",
      name: "Brandenburg Gate",
      location: "Pariser Platz",
      image: "/images/berlin3.jpg",

    },
    {
      id: "museum-island",
      name: "Museum Island",
      location: "Mitte",
     image: "/images/berlin2.jpg",

    },
    {
      id: "reichstag",
      name: "Reichstag Building",
      location: "Platz der Republik",
      image: "/images/berlin6.jpg",

    },
    {
      id: "east-side-gallery",
      name: "East Side Gallery",
      location: "Friedrichshain",
      image: "/images/berlin7.jpg",

    },
    {
      id: "checkpoint-charlie",
      name: "Checkpoint Charlie",
      location: "Friedrichstraße",
      image: "/images/berlin8.jpg",

    },
  ]; // Example Berlin list; tailor images/paths per project structure. [7]

  const cardsPerView =
    window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4;
  const maxIndex = Math.max(0, berlinData.length - cardsPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return 0;
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      if (prev <= 0) return maxIndex;
      return prev - 1;
    });
  };

  // Helper: open maps on hover CTA click
  const viewLocation = (name) => {
    const q = encodeURIComponent(`${name}, Berlin`);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${q}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background image is static; no hover styles applied here */}
      <div className="absolute inset-0 pointer-events-none">
        <div
  className="w-full h-full bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `
      linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 20%),
      linear-gradient(to bottom, rgba(255,255,255,1) 5%, rgba(255,255,255,0) 18%),
      linear-gradient(to bottom, rgba(255,255,255,0) 40%, rgba(255,255,255,1) 100%),
      url("/images/berlin5.png")
    `,
  }}
/>

      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-6xl sm:text-6xl md:text-10xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4 tracking-wider">
            Our Properties
          </h1>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-lg sm:text-xl font-light tracking-wide"></p>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-4 sm:mt-8 rounded-full"></div>
        </div>

        <div className="relative max-w-full sm:max-w-7xl mx-auto">
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md rounded-full p-2 sm:p-3 hover:bg-white/30 transition-all duration-300 group"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md rounded-full p-2 sm:p-3 hover:bg-white/30 transition-all duration-300 group"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:scale-110 transition-transform" />
          </button>

          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / cardsPerView)
                }%)`,
              }}
            >
              {berlinData.map((site, index) => (
                <div
                  key={site.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 px-2 sm:px-3"
                >
                  {/* Card group isolates hover so bg image never changes */}
                  <div className="group relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-500 border border-white/20 cursor-pointer">
                    {/* Base media area */}
                    <div className="relative h-64 sm:h-80 lg:h-140 overflow-hidden">
                      <img
                        src={site.image}
                        alt={site.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Title/location */}
                      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                        <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold transition-colors">
                          {site.name}
                        </h3>
                        <p className="text-cyan-200 text-xs sm:text-sm mt-1">
                          {site.location}
                        </p>
                      </div>

                      {/* Small hint */}
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-cyan-500/80 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to explore
                      </div>
                    </div>

                    {/* Expand-down panel (rag) revealing CTA */}
                    <div className="absolute left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                      <div className="bg-zinc-900/80 backdrop-blur-md border-t border-white/20 p-4 flex items-center justify-between">
                        <p className="text-sm text-zinc-100 line-clamp-2">
                          {site.description}
                        </p>
                        <button
                          onClick={() => viewLocation(site.name)}
                          className="ml-4 shrink-0 rounded-full bg-cyan-500 text-white text-xs font-semibold px-3 py-2 hover:bg-cyan-400 transition-colors"
                        >
                          View location
                        </button>
                      </div>
                    </div>

                    {/* Subtle grow in Y without affecting layout jump */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4 sm:mt-6">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
