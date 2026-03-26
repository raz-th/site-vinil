'use client';
import { useState, useRef, useEffect } from "react";

export const Reveal = ({ children, width = "100%", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width,
        position: "relative",
        transitionDelay: `${delay}ms`
      }}
      className={`reveal-section ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
};