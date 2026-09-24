import React, { useState, useEffect, useRef } from 'react';

/**
 * TypewriterText:
 * Efek teks ketik presisi dengan ZERO LAYOUT SHIFT:
 * - Mengetik 1 kali secara mulus saat bagian judul memasuki tampilan layar (Intersection Observer).
 * - Teks tetap utuh dan TIDAK dihapus berulang kali, sehingga pembaca dapat fokus membaca tanpa pusing.
 * - Menggunakan invisible sizer untuk mengunci ruang tata letak (tinggi & pembungkusan baris) sejak awal di HP / Desktop.
 * - Kursor berkedip techy tetap aktif untuk menjaga estetika modern.
 */
export default function TypewriterText({
  text = '',
  typingSpeed = 50,
  delay = 150,
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

  const visibleText = inView ? cleanText.slice(0, displayedLength) : '';
  const hiddenText = inView ? cleanText.slice(displayedLength) : cleanText;

  return (
    <span
      ref={containerRef}
      className="typewriter-heading-wrap"
      style={{ display: 'inline', position: 'relative' }}
    >
      <span>{visibleText}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
      {/* Invisible Sizer: Mengunci dimensi/tinggi persis sama sejak awal di semua layar */}
      <span
        aria-hidden="true"
        style={{
          opacity: 0,
          visibility: 'hidden',
          display: hiddenText ? 'inline' : 'none',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {hiddenText}
      </span>
    </span>
  );
}
