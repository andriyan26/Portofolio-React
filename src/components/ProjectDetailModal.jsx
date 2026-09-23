import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  Award,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Code2
} from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const handleLaunchApp = () => {
    if (project.demoUrl && project.demoUrl !== '#') {
      window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(
        `Aplikasi "${project.shortTitle}" siap dihubungkan!\n\nUntuk menautkan aplikasi Anda, buka file:\nsrc/data/portfolioData.js\nlalu masukkan URL aplikasi Anda pada field "demoUrl".`
      );
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="project-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Window Topbar */}
        <div className="project-modal-topbar">
          <div className="browser-dots">
            <span className="browser-dot red" onClick={onClose} style={{ cursor: 'pointer' }}></span>
            <span className="browser-dot yellow"></span>
            <span className="browser-dot green"></span>
          </div>
          <div className="project-modal-topbar-title">
            <span>system://projects/{project.id}.app</span>
          </div>
          <button
            className="modal-close-corner"
            onClick={onClose}
            aria-label="Tutup detail proyek"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="project-modal-body">
          {/* Hero Banner Preview */}
          <div className="project-modal-hero">
            <img
              src={project.image}
              alt={project.shortTitle}
              className="project-modal-hero-img"
            />
            <div className="project-modal-hero-overlay"></div>

            <div className="project-modal-hero-content">
              <div className="project-modal-tags">
                <span className="card-mini-tag">{project.tag}</span>
                {project.year && (
                  <span className="card-mini-tag" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />
                    {project.year}
                  </span>
                )}
              </div>

              <h2 className="project-modal-title">{project.title}</h2>

              {project.awardBadge && (
                <div className="project-modal-award-badge">
                  <Award size={16} color="#fbbf24" />
                  <span>{project.awardBadge}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Button Strip */}
          <div className="project-modal-action-bar">
            <button
              className="project-action-btn primary"
              onClick={handleLaunchApp}
              title="Buka atau uji langsung aplikasi ini"
            >
              <span>Lihat Aplikasi</span>
              <ArrowUpRight size={16} />
            </button>

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-btn secondary"
              >
                <GithubIcon size={16} />
                <span>Source Code (GitHub)</span>
              </a>
            )}
          </div>

          {/* Two-Column Details Content */}
          <div className="project-modal-grid">
            {/* Left Column: Description & Features */}
            <div className="project-modal-left">
              <div className="modal-section-block">
                <h4 className="modal-block-heading">
                  <Sparkles size={16} className="heading-icon" />
                  <span>Tentang Aplikasi &amp; Solusi</span>
                </h4>
                <p className="modal-text-desc">
                  {project.overview || project.description}
                </p>
                {project.overview && (
                  <p className="modal-text-desc" style={{ marginTop: '12px' }}>
                    {project.description}
                  </p>
                )}
              </div>

              {project.features && project.features.length > 0 && (
                <div className="modal-section-block">
                  <h4 className="modal-block-heading">
                    <CheckCircle2 size={16} className="heading-icon text-emerald" />
                    <span>Fitur Unggulan Sistem</span>
                  </h4>
                  <ul className="modal-feature-list">
                    {project.features.map((feature, i) => (
                      <li key={i} className="modal-feature-item">
                        <span className="feature-bullet-check">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Metrics, Tech Stack, & Specs */}
            <div className="project-modal-right">
              {/* Metrics & Performance */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="modal-section-block">
                  <h4 className="modal-block-heading">
                    <ShieldCheck size={16} className="heading-icon text-sky" />
                    <span>Metrik &amp; Kinerja</span>
                  </h4>
                  <div className="modal-metrics-grid">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="modal-metric-card">
                        <span className="metric-value">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="modal-section-block">
                <h4 className="modal-block-heading">
                  <Layers size={16} className="heading-icon text-indigo" />
                  <span>Teknologi &amp; Tools</span>
                </h4>
                <div className="project-tags-cloud" style={{ justifyContent: 'flex-start', margin: 0 }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tech-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* System Architecture */}
              {project.architecture && (
                <div className="modal-section-block">
                  <h4 className="modal-block-heading">
                    <Cpu size={16} className="heading-icon text-amber" />
                    <span>Arsitektur &amp; Integrasi</span>
                  </h4>
                  <p className="modal-mono-note">
                    {project.architecture}
                  </p>
                </div>
              )}

              {/* Role */}
              {project.role && (
                <div className="modal-section-block">
                  <h4 className="modal-block-heading">
                    <Code2 size={16} className="heading-icon" />
                    <span>Peran Pengembang</span>
                  </h4>
                  <span className="modal-role-badge">{project.role}</span>
                </div>
              )}
            </div>
          </div>

          {/* User Guide Banner for Andrian */}
          <div className="modal-helper-tip">
            <span className="tip-badge">TIPS PENGEMBANG</span>
            <p>
              Untuk menaruh aplikasi Anda di portofolio ini, cukup edit data di file{' '}
              <code>src/data/portfolioData.js</code> pada bagian <code>selectedProjects</code>.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="project-modal-footer">
          <button
            className="view-more-btn"
            onClick={onClose}
          >
            Tutup
          </button>
          <button
            className="submit-msg-btn"
            onClick={handleLaunchApp}
          >
            <span>Buka Aplikasi Langsung</span>
            <ExternalLink size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
