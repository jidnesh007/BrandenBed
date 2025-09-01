import React, { useEffect, useMemo, useRef, useState } from "react";

const useCountUp = ({ end, duration = 800, startOn = true }) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!startOn) return;
    cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    const animate = (ts) => {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(1, elapsed / duration); // progress 0..1
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(Math.round(end * eased));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, startOn]);

  return value;
};

const useOnceInView = (threshold = 0.3) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
};

const nf = new Intl.NumberFormat("en-US");

const Stat = ({ target, suffix = "", className = "" , duration=800}) => {
  const { ref, inView } = useOnceInView(0.35);
  const value = useCountUp({ end: target, duration, startOn: inView });
  const display = useMemo(() => nf.format(value), [value]);
  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section className="w-full min-h-[540px] bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-8xl sm:text-7xl font-bold tracking-wide text-neutral-900 mb-8 montserrat">
            Quick Stats
          </h2>
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm px-6 sm:px-10 md:px-14 py-10 md:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-14">
            {/* Properties Sold */}
            <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col justify-start">
              <div className="flex items-end flex-wrap">
                <Stat
                  target={500}
                  suffix="+"
                  duration={700}
                  className="leading-none font-serif text-[76px] sm:text-[96px] md:text-[118px] font-light text-neutral-900"
                />
              </div>
              <p className="mt-6 max-w-xs pl-10 text-[28px] leading-5 text-neutral-600">
                Properties Sold
              </p>
            </div>

            {/* Happy Clients */}
            <div className="flex flex-col items-start">
              <div className="flex items-end">
                <Stat
                  target={1200} 
                  suffix="+"
                  duration={900}
                  className="leading-none font-serif text-[76px] sm:text-[96px] md:text-[110px] font-light text-neutral-900"
                />
              </div>
              <p className="mt-8 max-w-xs pl-10 text-[28px] leading-5 text-neutral-600">
                Happy Clients
              </p>
            </div>

            {/* Years Experience */}
            <div className="flex flex-col items-start">
              <div className="flex items-end">
                <Stat
                  target={18}
                  suffix="+"
                  duration={750}
                  className="leading-none font-serif text-[76px] sm:text-[96px] md:text-[110px] font-light text-neutral-900"
                />
              </div>
              <p className="mt-8 max-w-xs text-[28px] leading-5 text-neutral-600">
                Years Experience
              </p>
            </div>

            {/* Districts in Berlin */}
            <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-start">
              <div className="flex items-end">
                <Stat
                  target={8}
                  suffix="+"
                  duration={700}
                  className="leading-none font-serif text-[76px] sm:text-[96px] md:text-[118px] font-light text-neutral-900"
                />
              </div>
              <p className="mt-4 max-w-sm pl-15 text-[28px] leading-5 text-neutral-600">
                Districts in Berlin
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
