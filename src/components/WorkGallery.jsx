import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ExternalLink,
  Eye,
  Rocket
} from 'lucide-react';
import { selectedProjects } from '../data/portfolioData';
import ProjectDetailModal from './ProjectDetailModal';
import TypewriterText from './TypewriterText';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function WorkGallery({ onOpenArchive }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedDetailProject, setSelectedDetailProject] = useState(null);
  const [timerProgressKey, setTimerProgressKey] = useState(0);

  const total = selectedProjects.length;
  const AUTOPLAY_INTERVAL = 5500; // 5.5 detik (sesuai permintaan user: 5-6 detik)

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % total);
    setTimerProgressKey((prev) => prev + 1);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setTimerProgressKey((prev) => prev + 1);
  };

  const goToProject = (idx) => {
    setActiveIndex(idx);
    setTimerProgressKey((prev) => prev + 1);
  };

  // Auto-Play Timer: Otomatis berganti setiap 5.5 detik jika tidak di-hover / sedang melihat modal
  useEffect(() => {
    if (isPaused || selectedDetailProject) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
      setTimerProgressKey((prev) => prev + 1);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, selectedDetailProject, total, activeIndex]);

  const activeProject = selectedProjects[activeIndex];

  const handleLaunchApp = (project, e) => {
    if (e) e.stopPropagation();
    if (project.demoUrl && project.demoUrl !== '#' && project.demoUrl.startsWith('http')) {
      window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Jika belum diisi, buka modal detail yang menampilkan info lengkap cara memasang link aplikasi
      setSelectedDetailProject(project);
    }
  };

  const handleOpenDetail = (project, e) => {
    if (e) e.stopPropagation();
    setSelectedDetailProject(project);
  };

  const getCardClass = (index) => {
    if (index === activeIndex) return 'coverflow-card active';
    if (index === (activeIndex - 1 + total) % total) return 'coverflow-card prev';
    if (index === (activeIndex + 1) % total) return 'coverflow-card next';
    if (index < activeIndex) return 'coverflow-card hidden-left';
    return 'coverflow-card hidden-right';
  };

  return (
    <section className="section-container" id="work">
      {/* Header Row with Scroll Reveal */}
      <div className="work-header-row reveal">
        <div>
          <span className="section-tag">PORTFOLIO</span>
          <h2 className="section-title">
            <TypewriterText text="Work Gallery" />
          </h2>
          <p className="section-desc">
            Koleksi aplikasi web produksi, sistem cerdas, dan proyek rekayasa perangkat lunak terpilih.
          </p>
        </div>

        <button className="view-more-btn" onClick={onOpenArchive}>
          <span>View More Projects</span>
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* 3D Coverflow Carousel Stage with Auto-Play & Hover Pause */}
      <div
        className="coverflow-carousel reveal delay-1"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Navigation Left Button */}
        <button
          className="carousel-nav-btn left"
          onClick={prevProject}
          aria-label="Previous Project"
          title="Proyek Sebelumnya"
        >
          <ChevronLeft size={22} />
        </button>

        {/* 3D Cards Track */}
        <div className="coverflow-track">
          {selectedProjects.map((project, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={project.id}
                className={getCardClass(idx)}
                onClick={() => goToProject(idx)}
              >
                {/* Window top bar */}
                <div className="card-browser-bar">
                  <div className="browser-dots">
                    <span className="browser-dot red"></span>
                    <span className="browser-dot yellow"></span>
                    <span className="browser-dot green"></span>
                  </div>
                  <span className="browser-title-badge">system://{project.id}.app</span>
                  <span
                    className="card-status-pill"
                    style={{ fontSize: '0.68rem', opacity: isActive ? 1 : 0.4 }}
                  >
                    {isActive ? 'ACTIVE' : project.number}
                  </span>
                </div>

                {/* Card Viewport Graphic with Project Mockup */}
                <div className="card-content-viewport">
                  {/* Mockup Dashboard Image */}
                  <img
                    src={project.image}
                    alt={project.shortTitle}
                    className="card-mockup-bg"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for Text Legibility */}
                  <div className="card-mockup-gradient-overlay" />

                  {/* Scanning Laser Beam (on active card) */}
                  {isActive && <div className="scanning-laser-beam" />}

                  {/* Card Content Overlay */}
                  <div className="card-overlay-content">
                    <div className="card-overlay-top">
                      <span className="card-mini-tag">{project.tag}</span>
                      <span className="card-num-watermark">{project.number}</span>
                    </div>

                    <div className="card-overlay-bottom">
                      <div className="card-title-group">
                        <h3>{project.shortTitle}</h3>
                        {project.awardBadge && (
                          <div className="card-award-text">
                            {project.awardBadge}
                          </div>
                        )}
                      </div>

                      {/* Quick Action Buttons on Active Card */}
                      {isActive && (
                        <div className="card-quick-actions">
                          <button
                            className="card-action-chip primary"
                            onClick={(e) => handleLaunchApp(project, e)}
                            title="Buka atau uji langsung aplikasi ini"
                          >
                            <Rocket size={13} />
                            <span>Lihat Aplikasi</span>
                          </button>
                          <button
                            className="card-action-chip secondary"
                            onClick={(e) => handleOpenDetail(project, e)}
                            title="Lihat informasi dan fitur lengkap proyek"
                          >
                            <Eye size={13} />
                            <span>View Detail</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Right Button */}
        <button
          className="carousel-nav-btn right"
          onClick={nextProject}
          aria-label="Next Project"
          title="Proyek Berikutnya"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Auto-Play Pagination Indicator Bar (5.5s timer countdown) */}
      <div className="carousel-indicators-bar reveal delay-1">
        <div className="carousel-pills-row">
          {selectedProjects.map((proj, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={proj.id}
                className={`carousel-indicator-pill ${isActive ? 'active' : ''}`}
                onClick={() => goToProject(idx)}
                title={`Pindah ke ${proj.shortTitle}`}
                aria-label={`Slide ${idx + 1}: ${proj.shortTitle}`}
              >
                <span className="indicator-pill-num">{proj.number}</span>
                <span className="indicator-pill-title">{proj.shortTitle}</span>
                {isActive && !isPaused && !selectedDetailProject && (
                  <span
                    key={timerProgressKey}
                    className="indicator-progress-fill"
                    style={{ animationDuration: `${AUTOPLAY_INTERVAL}ms` }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Project Details & Actions Below Carousel */}
      {activeProject && (
        <div className="active-project-details reveal delay-2">
          <h3 className="active-project-title">{activeProject.title}</h3>
          <p className="active-project-desc">{activeProject.description}</p>

          <div className="project-tags-cloud">
            {activeProject.tags.map((tag, i) => (
              <span key={i} className="tech-tag-pill">
                {tag}
              </span>
            ))}
          </div>

          {/* Primary Action Buttons: Lihat Aplikasi, View Detail, Repository */}
          <div className="project-cta-group">
            <button
              className="project-launch-btn primary"
              onClick={() => handleLaunchApp(activeProject)}
              title="Buka atau uji langsung aplikasi ini"
            >
              <Rocket size={17} />
              <span>Lihat Aplikasi</span>
            </button>

            <button
              className="project-launch-btn secondary"
              onClick={() => handleOpenDetail(activeProject)}
              title="Lihat spesifikasi, arsitektur, dan fitur lengkap"
            >
              <Eye size={17} />
              <span>View Detail</span>
            </button>

            {activeProject.repoUrl && (
              <a
                href={activeProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-launch-btn tertiary"
                title="Buka repositori kode di GitHub"
              >
                <GithubIcon size={17} />
                <span>GitHub Code</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Interactive Project Detail Modal */}
      {selectedDetailProject && (
        <ProjectDetailModal
          project={selectedDetailProject}
          onClose={() => setSelectedDetailProject(null)}
        />
      )}
    </section>
  );
}
