import React, { useState, useRef } from 'react';
import { ArrowDown, Download, Mail, Award, Sparkles } from 'lucide-react';
import { personalData } from '../data/portfolioData';

/**
 * Hero Component:
 * Tampilan potret bersih, elegan, dan berkelas dunia untuk Andrian.
 * 2-Kolom di Desktop (Teks Kiri, Potret Kanan dengan Ambient Glow & Floating Badges),
 * dan Stack Rapi, Seimbang & Indah di Layar HP (Mobile).
 */
export default function Hero({ onScrollDown, onOpenMessage, theme = 'dark', isIntroActive = false }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!heroRef.current || window.innerWidth < 900) return;
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

      {/* Background Outline Marquee */}
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

      <div className="hero-container">
        {/* Main 2-Column Grid (Desktop) / Stacked (Mobile) */}
        <div className="hero-grid-layout">
          {/* Left Column: Identity, Titles, Bio, CTA Buttons */}
          <div className="hero-left-content">
            {/* Top Status Pill */}
            <div className="hero-status-pill">
              <span className="status-dot"></span>
              <span className="hero-status-text">Wisudawan Terbaik S1 • {personalData.status}</span>
            </div>

            <div className="hero-greeting-tag">
              <span className="greeting-line"></span>
              <span>PORTFOLIO TEKNIK INFORMATIKA</span>
            </div>

            <h1 className="hero-main-title">
              <span className="title-name">{personalData.name}</span>
              <span className="title-title">, S.Kom.</span>
            </h1>

            <p className="hero-role-title">
              Software Engineer & Wisudawan Terbaik S1
            </p>

            <p className="hero-bio-summary">
              Lulusan S1 Teknik Informatika peraih predikat Wisudawan Terbaik (IPK Tertinggi) Wisuda Ke-130 Universitas Pamulang.
              Berpengalaman dalam rekayasa aplikasi web produksi performa tinggi, sistem cerdas (AI/ML), dan Software QA.
            </p>

            {/* Hero Action CTA Buttons */}
            <div className="hero-cta-group">
              <button
                className="hero-btn primary"
                onClick={onScrollDown}
                title="Lihat portofolio proyek unggulan Andrian"
              >
                <span>Jelajahi Proyek</span>
                <ArrowDown size={16} />
              </button>

              <a
                href={personalData.resumeUrl || '/CV ANDRIAN TERBARU.pdf'}
                download="CV ANDRIAN TERBARU.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn secondary"
                title="Unduh CV Terbaru Andrian (PDF)"
              >
                <Download size={16} />
                <span>Unduh CV</span>
              </a>

              {onOpenMessage && (
                <button
                  className="hero-btn tertiary"
                  onClick={onOpenMessage}
                  title="Kirim pesan langsung ke Andrian"
                >
                  <Mail size={16} />
                  <span>Hubungi Saya</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Hero Portrait with Ambient Aura & Badges */}
          <div className="hero-right-visual">
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

              {/* Floating Glassmorphism Badges (Desktop) */}
              <div className="hero-floating-badge badge-left">
                <div className="badge-icon-box gold">
                  <Award size={18} />
                </div>
                <div className="badge-text-group">
                  <span className="badge-label">PREDIKAT UTAMA</span>
                  <span className="badge-value">Wisudawan Terbaik Ke-130</span>
                </div>
              </div>

              <div className="hero-floating-badge badge-right">
                <div className="badge-icon-box cyan">
                  <Sparkles size={18} />
                </div>
                <div className="badge-text-group">
                  <span className="badge-label">KEAHLIAN UTAMA</span>
                  <span className="badge-value">Full-Stack & Intelligent Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Down Prompt */}
        <div
          className="hero-scroll-indicator"
          onClick={onScrollDown}
          title="Gulir ke bawah untuk melihat proyek"
        >
          <span className="hero-scroll-text">SCROLL TO EXPLORE</span>
          <div className="hero-scroll-line"></div>
        </div>
      </div>
    </section>
  );
}
