import React, { useState, useRef } from 'react';
import { personalData } from '../data/portfolioData';

export default function Hero({ onScrollDown, theme = 'dark' }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
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

  // Clean, elegant text exactly like in the reference video (no clutter, no confusing dots)
  const nameTrack = "ANDRIAN   ANDRIAN   ANDRIAN   ANDRIAN   ";
  const majorTrack = "INFORMATIKA   INFORMATIKA   INFORMATIKA   INFORMATIKA   ";

  // Transparent cutout portrait used for both light and dark themes
  const portraitSrc = personalData.hero.portraitImg || '/Poto.png';

  return (
    <section
      className="hero-section"
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Giant Ultra-Slow Outline Marquee */}
      <div className="hero-marquee-wrapper" aria-hidden="true">
        <div className="hero-marquee-track track-left">
          <span className="hero-outline-text">{nameTrack}</span>
          <span className="hero-outline-text">{nameTrack}</span>
        </div>
        <div className="hero-marquee-track track-right">
          <span className="hero-outline-text">{majorTrack}</span>
          <span className="hero-outline-text">{majorTrack}</span>
        </div>
      </div>

      {/* Foreground Hero Portrait with subtle 3D Tilt */}
      <div
        className="hero-portrait-wrapper"
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.02)`,
        }}
      >
        <img
          src={portraitSrc}
          alt={`Portrait of ${personalData.fullName}`}
          className="hero-portrait-img"
          loading="eager"
        />
      </div>

      {/* Vertical Scroll Down Indicator */}
      <div
        className="hero-scroll-indicator"
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
