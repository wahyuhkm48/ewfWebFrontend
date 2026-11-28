"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  const current = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const begin = current.current;
    const startedAt = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = reduce ? 1 : Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(begin + (target - begin) * eased);
      current.current = next;
      setValue(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}