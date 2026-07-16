"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  labelClassName?: string;
  label?: string;
}

export default function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
  labelClassName = "",
  label,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();
    const startValue = 0;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (end - startValue) * eased);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className={`font-mono-nums ${className}`}>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      {label && <div className={labelClassName}>{label}</div>}
    </div>
  );
}
