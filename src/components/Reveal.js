'use client';
import { useState, useRef, useEffect } from "react";

export const Reveal = ({ children, width = "100%", delay = 0, ready = true, style={} }) => {
  const [isInView, setIsInView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // watch intersection as before, but only store it — don't show yet
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  // only trigger visibility when BOTH ready and in view
  useEffect(() => {
    if (!ready || !isInView) return;
    const t = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(t);
  }, [ready, isInView, delay]);

  return (
    <div
      ref={ref}
      style={{...style, width, position: "relative", transitionDelay: `${delay}ms`}}
      className={`reveal-section ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
};