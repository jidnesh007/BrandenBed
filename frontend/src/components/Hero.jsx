import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

const videos = [
  { name: "About Us", src: "/videos/berlin3.mp4" },
  { name: "Service", src: "/videos/berlin5.mp4" },
  { name: "Destination", src: "/videos/berlin2.mp4" },
  { name: "Comunity", src: "/videos/berlin1.mp4" },

];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState("right");

  const transitionDuration = 800;

  const startTransition = (target, dir) => {
    if (transitioning || target === current) return;
    setDirection(dir);
    setNext(target);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(target);
      setNext(null);
      setTransitioning(false);
    }, transitionDuration);
  };

  const nextVideo = () =>
    startTransition((current + 1) % videos.length, "right");
  const prevVideo = () =>
    startTransition((current - 1 + videos.length) % videos.length, "left");
  const selectVideo = (index) => {
    if (index > current) startTransition(index, "right");
    else if (index < current) startTransition(index, "left");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <style>
        {`
          .video-slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 0;
            transition: transform ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1), opacity ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes slide-in-right {
            from { transform: translateX(100%); }
            to { transform: translateX(0%); }
          }
          @keyframes slide-in-left {
            from { transform: translateX(-100%); }
            to { transform: translateX(0%); }
          }
          @media (max-width: 640px) {
            .video-slide {
              object-fit: cover;
            }
          }
        `}
      </style>

      {/* Current video */}
      <video
        key={videos[current].src}
        src={videos[current].src}
        autoPlay
        muted={isMuted}
        loop
        className="video-slide"
        style={{
          zIndex: transitioning ? 0 : 1,
          transform: transitioning
            ? direction === "right"
              ? "translateX(-100%)"
              : "translateX(100%)"
            : "translateX(0%)",
          opacity: transitioning ? 0.7 : 1,
        }}
      />

      {/* Next video (for transition) */}
      {transitioning && next !== null && (
        <video
          key={videos[next].src}
          src={videos[next].src}
          autoPlay
          muted={isMuted}
          loop
          className="video-slide"
          style={{
            zIndex: 1,
            transform:
              direction === "right" ? "translateX(0%)" : "translateX(0%)",
            opacity: 1,
            left: 0,
            ...(direction === "right"
              ? { transform: "translateX(100%)" }
              : { transform: "translateX(-100%)" }),
            animation: `slide-in-${direction} ${transitionDuration}ms forwards`,
          }}
        />
      )}

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-0 right-0 z-10 px-4">
        {/* Video category tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 text-white text-xs sm:text-sm mb-4">
          {videos.map((video, index) => (
            <React.Fragment key={video.name}>
              <span
                className={`cursor-pointer px-3 py-1 transition-all duration-300 ${
                  current === index
                    ? "text-yellow-400 font-medium"
                    : "text-white/80 hover:text-white font-light"
                }`}
                onClick={() => selectVideo(index)}
              >
                {video.name}
              </span>
              {index < videos.length - 1 && (
                <div className="w-px h-3 bg-white/40"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevVideo}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white text-2xl sm:text-3xl z-10 transition-all duration-300 hover:scale-110"
        disabled={transitioning}
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 h-7" />
      </button>
      <button
        onClick={nextVideo}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white text-2xl sm:text-3xl z-10 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 h-7" />
      </button>

      {/* Mute/Unmute button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-4 right-4 text-white/80 hover:text-white z-10 transition-all duration-300"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 sm:w-6 h-6" />
        ) : (
          <Volume2 className="w-5 h-5 sm:w-6 h-6" />
        )}
      </button>
    </div>
  );
}
