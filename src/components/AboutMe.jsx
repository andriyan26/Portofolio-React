import React, { useState, useRef } from 'react';
import { Download, Code2, FlaskConical, Rocket, RefreshCw, Sparkles } from 'lucide-react';
import { personalData } from '../data/portfolioData';
import TypewriterText from './TypewriterText';

export default function AboutMe() {
  const [traitIndex, setTraitIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shineX: 50, shineY: 50 });
  const cardRef = useRef(null);

  const traits = personalData.about.traits;
  const currentTrait = traits[traitIndex];
  const nextTraitItem = traits[(traitIndex + 1) % traits.length];
  const thirdTraitItem = traits[(traitIndex + 2) % traits.length];

  // 3D Card mouse tracking tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current || isShuffling) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: x * 14, // rotateY
      y: -y * 14, // rotateX
      shineX: ((e.clientX - rect.left) / rect.width) * 100,
      shineY: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, shineX: 50, shineY: 50 });
  };

  // 3D Shuffle animation on click
  const handleShuffle = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    setTimeout(() => {
      setTraitIndex((prev) => (prev + 1) % traits.length);
      setIsShuffling(false);
    }, 420);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 size={18} />;
      case 'FlaskConical':
        return <FlaskConical size={18} />;
      case 'Rocket':
        return <Rocket size={18} />;
      default:
        return <Sparkles size={18} />;
    }
  };

  return (
    <section className="section-container" id="about">
      {/* Header Eyebrow & Headline */}
      <div className="section-header reveal">
        <span className="section-tag">ABOUT ME</span>
        <h2 className="section-title">
          <TypewriterText text={personalData.about.tagline || "Problem Solver. Digital Generalist."} />
        </h2>
      </div>

      {/* Profile Header Row (Avatar + Name + Verified Badge + Inline Stats) */}
      <div className="about-profile-header reveal delay-1">
        {/* Circular Avatar */}
        <div className="about-avatar-wrapper">
          <img
            src={personalData.about.avatarImg || '/foto-depan.png'}
            alt={personalData.about.fullName}
            className="about-avatar-img"
            onError={(e) => {
              e.currentTarget.src = '/andrian-portrait.jpg';
            }}
          />
          <div className="about-avatar-glow" aria-hidden="true" />
        </div>

        {/* Profile Info & Inline Stats */}
        <div className="about-profile-info">
          <div className="about-name-row">
            <h3 className="about-profile-name">{personalData.about.fullName}</h3>
            {/* Official Blue Verified Badge */}
            <span className="about-verified-badge" title="Verified Profile">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path
                  fill="#0084ff"
                  d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 10.45.7 11.82.7 13.4c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.05 1.273 2.42 2.148 4 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.05 2.148-2.42 2.148-4z"
                />
                <path
                  fill="#FFFFFF"
                  d="M10.2 16.2l-3.5-3.5 1.4-1.4 2.1 2.1 5.6-5.6 1.4 1.4z"
                />
              </svg>
            </span>
          </div>

          {/* Inline Stats (PROYEK, SERTIFIKAT, LULUSAN S1) */}
          <div className="about-inline-stats">
            {personalData.about.stats.map((stat, idx) => (
              <div key={idx} className="about-inline-stat-item">
                <span className="stat-label-mini">{stat.label}</span>
                <span className="stat-value-mini">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio Paragraph in Bahasa Indonesia */}
      <p className="about-bio-text reveal delay-2">
        {personalData.about.bio}
      </p>

      {/* Resume CTA Download Prompt */}
      <div className="about-resume-cta-wrap reveal delay-2">
        <span className="about-resume-prompt-text">
          {personalData.about.resumePrompt}{' '}
        </span>
        <a
          href={personalData.resumeUrl || '/CV-ANDRIAN.pdf'}
          download="CV ANDRIAN.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="about-resume-link"
          title="Unduh Resume / CV Resmi Andrian (PDF)"
        >
          <span>{personalData.about.resumeLinkText}</span>
          <Download size={15} />
        </a>
      </div>

      {/* Bottom Row: Currently (Horizontal) + Compact 3D Interactive Trait Deck */}
      <div className="about-bottom-grid reveal delay-3">
        {/* CURRENTLY Section (Compact horizontal layout) */}
        <div className="currently-container">
          <span className="mono-label">CURRENTLY</span>
          <div className="currently-horizontal-row">
            {personalData.about.currently.map((item, idx) => (
              <div key={idx} className="currently-horizontal-item">
                <div className="currently-icon-badge">{getIcon(item.icon)}</div>
                <div className="currently-info-wrap">
                  <div className="currently-title">{item.label}</div>
                  <div className="currently-detail">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compact 3D Interactive Trait Card Deck (Exact match to reference video) */}
        <div className="trait-deck-section">
          <div
            className={`trait-deck-wrapper ${isShuffling ? 'shuffling' : ''}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleShuffle}
            title="Klik untuk membalik kartu trait"
          >
            {/* Third Card in Stack (deepest background peeking left) */}
            <div className="trait-card-layer layer-3" aria-hidden="true">
              <div className="trait-card-inner">
                <div className="trait-card-peek-label">{thirdTraitItem.name}</div>
              </div>
            </div>

            {/* Second Card in Stack (middle background peeking right) */}
            <div className="trait-card-layer layer-2" aria-hidden="true">
              <div className="trait-card-inner">
                <div className="trait-card-peek-label">{nextTraitItem.name}</div>
              </div>
            </div>

            {/* Active Foreground Card with 3D Tilt & Specular Light */}
            <div
              className={`trait-card-layer layer-active ${isShuffling ? 'fly-out' : ''}`}
              style={{
                transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(8px)`,
              }}
            >
              {/* Dynamic Specular Light Glare */}
              <div
                className="card-glare-effect"
                style={{
                  background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255,255,255,0.2) 0%, transparent 65%)`,
                }}
                aria-hidden="true"
              />

              <div className="trait-card-content">
                <div className="trait-card-top-row">
                  <div className="trait-badge-pill">
                    <span>TRAIT</span>
                  </div>
                  <span className="trait-counter-badge">
                    0{traitIndex + 1}/0{traits.length}
                  </span>
                </div>

                <div className="trait-card-body">
                  <h3 className="trait-title">{currentTrait.name}</h3>
                </div>

                <div className="trait-card-footer">
                  <div className="trait-shuffle-hint">
                    <RefreshCw size={11} className={isShuffling ? 'spin-icon' : ''} />
                    <span>{currentTrait.title || 'Klik untuk acak'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
