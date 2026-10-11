import { useLayoutEffect, useRef } from "react";

/**
 * One slot reel. Each spin it scrolls from the first item of `strip` to the last,
 * overshooting slightly so it lands with a clunk.
 */
export function Reel({ strip, spinId, duration, className, children }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!spinId || strip.length < 2) return;
    el.style.transition = "none";
    el.style.transform = "translateY(0)";
    el.getBoundingClientRect(); // commit the reset before animating
    el.style.transition = `transform ${duration}ms cubic-bezier(.15,.85,.3,1.06)`;
    el.style.transform = `translateY(${(-100 * (strip.length - 1)) / strip.length}%)`;
  }, [spinId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`reel ${className}`}>
      <div ref={ref} key={spinId} className="reel-strip" data-spinning={spinId > 0 && strip.length > 1}>
        {strip.map((item, i) => (
          <div key={i} className="reel-item" aria-hidden={i < strip.length - 1}>
            {children(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
