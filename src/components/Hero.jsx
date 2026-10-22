import React, { useState, useRef } from 'react';
import { personalData } from '../data/portfolioData';

/**
 * Hero Component (Landing Page):
 * - Foto potret utama Andrian tepat di tengah-tengah layar (Dead Center)
 * - Muka bersih, jelas, tanpa badge yang menghalangi (Zero Obstruction)
 * - Tanpa teks/paragraf keterangan yang berlebihan di awal (karena sudah lengkap di About Me / section bawah)
 * - Marquee outline elegan ANDRIAN & INFORMATIKA di latar belakang
 * - Aura pencahayaan ambient (cyan & violet glow)
 * - Bottom gradient fade lembut pada potret agar menyatu natural dengan background
 * - Interaksi 3D tilt pada desktop
 * - Indikator scroll down vertikal di bagian bawah
 * - Tampilan proporsional, mewah, dan responsif sempurna di Web & HP
 */
export default function Hero({ onScrollDown, theme = 'dark', isIntroActive = false }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!heroRef.current || window.innerWidth < 768) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: x * 10,
      y: -y * 10,
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
      className="hero-section hero-revealed"
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Ambient Radial Glow */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      {/* Background Giant Infinite Outline Marquee Track */}
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

      {/* Foreground Hero Portrait - Posisi di Tengah-Tengah, Muka Bersih Tanpa Halangan */}
      <div
        className="hero-portrait-wrapper"
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        }}
      >
        <div className="hero-portrait-aura" />
        <img
          src={portraitSrc}
          alt={`Portrait of ${personalData.fullName}`}
          className="hero-portrait-img"
          loading="eager"
        />
      </div>

      {/* Vertical Scroll Down Indicator di Bawah */}
      <div
        className="hero-scroll-indicator"
        onClick={onScrollDown}
        style={{ cursor: 'pointer' }}
        title="Scroll down to explore"
      >
        <span className="hero-scroll-text">{personalData.hero.scrollPrompt || "SCROLL DOWN"}</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  );
}
