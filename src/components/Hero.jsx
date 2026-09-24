import React, { useState, useEffect, useRef } from 'react';
import { personalData } from '../data/portfolioData';

/**
 * Hero Component (Landing Page Awal):
 * Tampilan potret bersih, elegan, dan original Andrian.
 * Setelah animasi intro selesai, elemen-elemen muncul secara perlahan (smooth fade-in entrance):
 * - Marquee outline raksasa teks ANDRIAN & INFORMATIKA
 * - Foto potret utama Andrian dengan interaksi 3D tilt
 * - Indikator scroll down vertikal
 */
export default function Hero({ onScrollDown, theme = 'dark', isIntroActive = false }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isAppeared, setIsAppeared] = useState(!isIntroActive);
  const heroRef = useRef(null);

  // Muncul secara perlahan tepat setelah intro selesai
  useEffect(() => {
    if (!isIntroActive) {
      const timer = setTimeout(() => {
        setIsAppeared(true);
      }, 120);
      return () => clearTimeout(timer);
    } else {
      setIsAppeared(false);
    }
  }, [isIntroActive]);

  const handleMouseMove = (e) => {
    if (!heroRef.current || !isAppeared) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: x * 10, // subtle rotateY
      y: -y * 10, // subtle rotateX
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const nameTrack = "ANDRIAN   ANDRIAN   ANDRIAN   ANDRIAN   ";
  const majorTrack = "INFORMATIKA   INFORMATIKA   INFORMATIKA   INFORMATIKA   ";
  const portraitSrc = personalData.hero.portraitImg || '/Poto.png';

  return (
    <section
      className={`hero-section ${isAppeared ? 'hero-revealed' : ''}`}
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Giant Ultra-Slow Outline Marquee (Muncul Perlahan) */}
      <div className="hero-marquee-wrapper hero-entrance-bg" aria-hidden="true">
        <div className="hero-marquee-track track-left">
          <span className="hero-outline-text">{nameTrack}</span>
          <span className="hero-outline-text">{nameTrack}</span>
        </div>
        <div className="hero-marquee-track track-right">
          <span className="hero-outline-text">{majorTrack}</span>
          <span className="hero-outline-text">{majorTrack}</span>
        </div>
      </div>

      {/* Foreground Hero Portrait with 3D Tilt (Muncul Perlahan) */}
      <div
        className="hero-portrait-wrapper hero-entrance-portrait"
        style={{
          transform: isAppeared
            ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.02)`
            : 'perspective(1000px) scale(0.92) translateY(35px)',
          opacity: isAppeared ? 1 : 0,
          filter: isAppeared ? 'blur(0)' : 'blur(10px)',
          transition: isAppeared && (tilt.x !== 0 || tilt.y !== 0)
            ? 'transform 0.15s ease-out'
            : 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s ease',
        }}
      >
        <img
          src={portraitSrc}
          alt={`Portrait of ${personalData.fullName}`}
          className="hero-portrait-img"
          loading="eager"
        />
      </div>

      {/* Vertical Scroll Down Indicator (Muncul Perlahan) */}
      <div
        className="hero-scroll-indicator hero-entrance-indicator"
        onClick={onScrollDown}
        style={{ cursor: 'pointer' }}
        title="Scroll down to explore"
      >
        <span className="hero-scroll-text">{personalData.hero.scrollPrompt}</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  );
}
