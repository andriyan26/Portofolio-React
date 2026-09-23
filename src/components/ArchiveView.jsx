import React, { useState } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { technicalArchive, digitalArchive } from '../data/portfolioData';

export default function ArchiveView({ onClose }) {
  const [activeTab, setActiveTab] = useState('technical');

  return (
    <div className="archive-page section-container">
      {/* Archive Top Navigation Bar */}
      <div className="archive-header-nav">
        <button className="back-to-portfolio-btn" onClick={onClose}>
          <ArrowLeft size={18} />
          <span>Kembali ke Portofolio</span>
        </button>

        {/* Tab Controls: Technical & Digital */}
        <div className="archive-tabs">
          <button
            className={`archive-tab-btn ${activeTab === 'technical' ? 'active' : ''}`}
            onClick={() => setActiveTab('technical')}
          >
            TECHNICAL
          </button>
          <button
            className={`archive-tab-btn ${activeTab === 'digital' ? 'active' : ''}`}
            onClick={() => setActiveTab('digital')}
          >
            DIGITAL
          </button>
        </div>
      </div>

      {/* Archive Header Info */}
      <div className="section-header">
        <span className="section-tag">
          {activeTab === 'technical' ? 'ARCHIVE' : 'DIGITAL PROJECTS'}
        </span>
        <h1 className="section-title">
          {activeTab === 'technical' ? 'Technical Projects' : 'Beyond Code'}
        </h1>
        <p className="section-desc">
          {activeTab === 'technical'
            ? 'Koleksi lengkap dari 20+ sistem perangkat lunak, sistem terintegrasi, dan proyek rekayasa yang telah saya kerjakan.'
            : 'Karya kreatif, aset visual, sistem manajemen konten, dan workflow digital yang dikembangkan berdampingan dengan pekerjaan teknis.'}
        </p>
      </div>

      {/* Tab 1: Technical Projects List */}
      {activeTab === 'technical' && (
        <div className="technical-list">
          {technicalArchive.map((item) => (
            <div key={item.id} className="tech-project-row">
              <div className="tech-row-number">
                {String(item.id).padStart(2, '0')}
              </div>

              <div className="tech-row-info">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className="tech-row-tags">
                  {item.stack.map((tech, i) => (
                    <span key={i} className="tech-tag-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="tech-row-links">
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-link-icon-btn"
                  title="View GitHub Repository"
                >
                  <GithubIcon size={17} />
                </a>
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-link-icon-btn"
                  title="External Link"
                >
                  <ExternalLink size={17} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Digital Projects Grid */}
      {activeTab === 'digital' && (
        <div className="digital-grid">
          {digitalArchive.map((item) => (
            <div key={item.id} className="digital-card">
              <div>
                <span
                  className="digital-card-tag"
                  style={{ color: item.color }}
                >
                  {item.category} • {item.year}
                </span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>

              <div style={{ marginTop: '20px' }}>
                <span className="mono-label" style={{ fontSize: '0.75rem' }}>
                  EXPLORE ASSET ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom CTA Banner (matches video 01:02) */}
      <div
        style={{
          marginTop: '70px',
          padding: '50px 36px',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div>
          <span className="mono-label" style={{ letterSpacing: '0.2em' }}>
            HAVE A PROJECT IN MIND?
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', marginTop: '6px' }}>
            Let's build something useful.
          </h2>
        </div>

        <button
          className="hire-me-btn"
          style={{ padding: '12px 28px', fontSize: '0.95rem' }}
          onClick={() => {
            onClose();
            setTimeout(() => {
              const contactEl = document.getElementById('contact');
              if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        >
          <span>Hire Me</span>
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
}
