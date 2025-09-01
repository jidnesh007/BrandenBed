// src/components/Service.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Service() {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const viewportRef = useRef(null);

  // Scroll progress while this section is in view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Measure exact overflow so we can map 0->1 progress to 0->-maxScroll
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      const vp = viewportRef.current;
      if (!rail || !vp) return;
      const overflow = Math.max(0, rail.scrollWidth - vp.clientWidth);
      setMaxScroll(overflow);
    };
    measure();
    // Recalculate on resize/orientation changes
    const ro = new ResizeObserver(measure);
    if (railRef.current) ro.observe(railRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Map vertical progress to horizontal translation in pixels
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  // Larger card sizing variables
  const sizes = useMemo(
    () => ({
      cardWidth: "clamp(320px, 88vw, 860px)",
      cardHeight: "min(70vh, 680px)",
      gapPx: 28,
    }),
    []
  );

  return (
    <section ref={sectionRef} className="relative w-full text-white">
      {/* FIXED full-bleed section background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(/images/berlin2.jpg)" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/35" />
      {/* Pre-sticky spacer */}
      <div className="h-[25vh]" />
      {/* Sticky viewport */}
      <div className="sticky top-0 h-[85vh] flex items-center">
        <div className="mx-auto w-[94vw] max-w-[1400px]">
          <header className="mb-4 flex items-baseline justify-center">
            <h2 className="m-0 text-[clamp(40px,10vw,100px)] font-bold tracking-tight">
              Our Services
            </h2>
          </header>

          {/* Viewport mask */}
          <div ref={viewportRef} className="relative overflow-hidden">
            {/* Track translating left */}
            <motion.div
              ref={railRef}
              className="flex gap-7 px-3 snap-x snap-mandatory"
              style={{ x }}
            >
              {cards.map((c) => (
                <Card
                  key={c.id}
                  title={c.title}
                  url={c.url}
                  width={sizes.cardWidth}
                  height={sizes.cardHeight}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      {/* Post-sticky spacer */}
      <div className="h-[140vh]" />
    </section>
  );
}

// 1. Add a `url` property to each card object
const cards = [
  { id: 1, title: "High Speed Wifi", url: "/images/wifi.jpg" },
  { id: 2, title: "Fully Furnished Room", url: "/images/pg.jpg" },
  { id: 3, title: "Near Public Transport.", url: "/images/trans.jpg" },
  { id: 4, title: "24/7 security & support", url: "/images/secr.jpg" },
  { id: 5, title: "Dedicated Desk", url: "/images/desk.jpg" },
];

// 2. Update Card component to accept and display the image
function Card({ title, width, height, url }) {
  return (
    <article
      className="
        relative snap-center rounded-3xl shadow-2xl overflow-hidden
        bg-white/6 backdrop-blur-sm ring-1 ring-white/15
      "
      style={{
        flex: `0 0 ${width}`,
        height,
      }}
    >
      {/* Image background */}
      <img
        src={url}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-black/20" />
      {/* Title */}
      <h3
        className="
          absolute bottom-[8%] left-[8%] m-0
          text-[clamp(24px,5vw,48px)] font-extrabold tracking-tight drop-shadow
          text-white
        "
      >
        {title}
      </h3>
    </article>
  );
}
