import React, { useState, useEffect, useRef } from 'react';

/**
 * TypewriterText:
 * Efek teks ketik presisi dengan ZERO LAYOUT SHIFT & RESPONSIF PENUH:
 * - Mengetik 1 kali secara mulus saat bagian judul memasuki tampilan layar (Intersection Observer).
 * - Teks membungkus (wrap) secara natural per kata di layar HP maupun Desktop tanpa melebihi batas (overflow).
 * - Menggunakan ghost/invisible text inline untuk mengunci ruang tata letak (tinggi & baris) sejak awal tanpa layout shift.
 * - Kursor berkedip techy dengan net layout width 0px agar tidak menggeser pembungkusan kata.
 */
export default function TypewriterText({
  text = '',
  typingSpeed = 40,
  delay = 120,
}) {
  const cleanText = typeof text === 'string' ? text.replace(/&amp;/g, '&') : '';
  const [displayedLength, setDisplayedLength] = useState(0);
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let current = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        current += 1;
        setDisplayedLength(current);
        if (current >= cleanText.length) {
          clearInterval(interval);
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [inView, cleanText, typingSpeed, delay]);

  const visiblePart = inView ? cleanText.slice(0, displayedLength) : '';
  const invisiblePart = inView ? cleanText.slice(displayedLength) : cleanText;
  const isDone = inView && displayedLength >= cleanText.length;

  return (
    <span
      ref={containerRef}
      className="typewriter-heading-wrap"
      role="text"
      aria-label={cleanText}
    >
      <span className="typewriter-visible">{isDone ? cleanText : visiblePart}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
      {!isDone && (
        <span className="typewriter-ghost" aria-hidden="true">
          {invisiblePart}
        </span>
      )}
    </span>
  );
}

