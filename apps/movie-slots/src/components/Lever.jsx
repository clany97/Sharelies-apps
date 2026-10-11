import { useEffect, useRef, useState } from "react";

/**
 * The pokies lever. Drag the red ball down past halfway, tap it, or press Space.
 * `--pull` (0 = up, 1 = fully down) drives all the motion in CSS.
 */
export function Lever({ onPull, disabled }) {
  const [pull, setPull] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef(null);
  const dragged = useRef(false); // the click after a drag shouldn't pull again

  const fire = () => {
    if (disabled) return;
    setPull(1);
    setTimeout(() => {
      setPull(0);
      onPull();
    }, 140);
  };

  // Space or Enter pulls the lever when nothing else has focus.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === " " || e.key === "Enter") && e.target === document.body) {
        e.preventDefault();
        fire();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onPointerDown = (e) => {
    if (disabled) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { y: e.clientY, travel: e.currentTarget.offsetHeight / 2, moved: false };
    setDragging(true);
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dy = e.clientY - d.y;
    if (Math.abs(dy) > 6) d.moved = true;
    setPull(Math.min(1, Math.max(0, dy / d.travel)));
  };
  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    dragged.current = !!d?.moved;
    if (!d?.moved) return; // a tap: onClick handles it
    if (pull > 0.55) onPull();
    setPull(0);
  };

  return (
    <button
      type="button"
      className="lever"
      aria-label="Pull the lever"
      disabled={disabled}
      data-dragging={dragging}
      data-down={pull === 1}
      style={{ "--pull": pull }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={() => (dragged.current ? (dragged.current = false) : fire())}
    >
      <span className="lever-arm" />
      <span className="lever-ball" />
      <span className="lever-hub" />
    </button>
  );
}
