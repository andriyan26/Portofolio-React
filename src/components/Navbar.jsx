import React, { useState } from 'react';
import { Sun, Moon, ArrowUpRight, Menu, X, Download } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Navbar({
  theme,
  toggleTheme,
  activeSection,
  onNavigate,
  onOpenMessage,
  isArchiveView,
  onToggleArchive,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'work', label: 'WORK' },
    { id: 'capabilities', label: 'WHAT I CAN DO' },
    { id: 'about', label: 'ABOUT' },
    { id: 'awards', label: 'AWARDS' },
    { id: 'trainings', label: 'TRAININGS' },
  ];

  const handleNavClick = (id) => {
    if (isArchiveView) {
      onToggleArchive();
      setTimeout(() => {
        onNavigate(id);
      }, 100);
    } else {
      onNavigate(id);
    }
    setMobileOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Monogram & Name */}
        <a
          href="#"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            if (isArchiveView) onToggleArchive();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="brand-badge">
            <img
              src={personalData.logoImg || "/favicon-32x32.png"}
              alt="Logo"
              className="brand-logo-img"
            />
          </div>
          <span className="brand-name">{personalData.name}</span>
        </a>

        {/* Desktop Navigation Links */}
        {!isArchiveView ? (
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <button
            className="back-to-portfolio-btn"
            onClick={onToggleArchive}
          >
            ← Kembali ke Portofolio Utama
          </button>
        )}

        {/* Action Buttons: Theme Toggle, CV Download & Hire Me */}
        <div className="nav-actions">
          <button
            className="theme-toggle-btn"
            onClick={(e) => toggleTheme(e)}
            aria-label="Toggle Dark/Light Theme"
            title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          >
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <a
            href={personalData.resumeUrl || '/CV-ANDRIAN.pdf'}
            download="CV ANDRIAN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cv-download-btn"
            title="Unduh CV Resmi Andrian (PDF)"
          >
            <Download size={14} />
            <span>CV</span>
          </a>

          <button
            className="hire-me-btn"
            onClick={onOpenMessage}
          >
            <span>Hire Me</span>
            <ArrowUpRight size={15} />
          </button>

          {/* Mobile menu toggle */}
          {!isArchiveView && (
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && !isArchiveView && (
        <div className="mobile-drawer">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
          <a
            href={personalData.resumeUrl || '/CV-ANDRIAN.pdf'}
            download="CV ANDRIAN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#06b6d4', textDecoration: 'none' }}
            onClick={() => setMobileOpen(false)}
          >
            <Download size={16} />
            <span>DOWNLOAD CV (PDF)</span>
          </a>
        </div>
      )}
    </header>
  );
}
