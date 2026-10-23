import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  Command,
  FileText,
  Mail,
  Bot,
  Moon,
  Sun,
  Sparkles,
  ExternalLink,
  CornerDownLeft,
  X,
  Layers,
  Award,
  GraduationCap,
  Briefcase,
  Code2,
  Phone,
  Copy,
  Check,
  Flame,
  ArrowRight,
  Eye,
  Compass,
  Rocket,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  personalData,
  selectedProjects,
  technicalArchive,
  awards,
  trainings,
  techStack,
} from '../data/portfolioData';

export default function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onOpenMessage,
  onOpenAI,
  onSelectProject,
  onSelectAward,
  toggleTheme,
  theme = 'dark',
  isArchiveView = false,
  onToggleArchive,
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  const showToast = (msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Keyboard shortcut listener to close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto focus input on open & reset state
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
    }
  }, [isOpen]);

  // Fire celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ffffff'],
    });
    showToast('🎉 Confetti selebrasi berhasil ditembakkan!');
  };

  // Copy helper
  const copyToClipboard = (text, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`${label} disalin ke clipboard! 📋`);
    } else {
      showToast(`${text}`);
    }
  };

  // Build searchable database
  const allItems = useMemo(() => {
    const list = [];

    // 1. QUICK ACTIONS
    list.push(
      {
        id: 'action-cv',
        category: 'Aksi Cepat',
        title: 'Unduh CV Resmi Terbaru (PDF)',
        subtitle: 'Curriculum Vitae lengkap Andrian (Pendidikan, Proyek, Pengalaman BPS)',
        icon: <FileText size={18} className="cmd-icon-cyan" />,
        badge: 'PDF',
        keywords: 'cv resume riwayat hidup berkas pdf download unduh',
        perform: () => {
          const link = document.createElement('a');
          link.href = personalData.resumeUrl || '/CV ANDRIAN TERBARU.pdf';
          link.download = 'CV ANDRIAN TERBARU.pdf';
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          showToast('Mengunduh CV resmi Andrian... 📄');
          onClose();
        },
      },
      {
        id: 'action-hire',
        category: 'Aksi Cepat',
        title: 'Kirim Pesan / Rekrut Andrian (Hire Me)',
        subtitle: 'Buka formulir pesan langsung untuk penawaran kerja sama',
        icon: <Mail size={18} className="cmd-icon-blue" />,
        badge: 'Kontak',
        keywords: 'hire me rekrut pesan kontak email freelance kerja',
        perform: () => {
          onClose();
          setTimeout(() => onOpenMessage(), 150);
        },
      },
      {
        id: 'action-ai',
        category: 'Aksi Cepat',
        title: 'Tanya Asisten AI Virtual Andrian',
        subtitle: 'Chat interaktif tentang keahlian, tech stack, dan proyek Andrian',
        icon: <Bot size={18} className="cmd-icon-purple" />,
        badge: 'AI Chat',
        keywords: 'ai assistant bot tanya asisten virtual chat',
        perform: () => {
          onClose();
          setTimeout(() => onOpenAI(), 150);
        },
      },
      {
        id: 'action-theme',
        category: 'Aksi Cepat',
        title: `Ganti Tema: ${theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}`,
        subtitle: `Saat ini menggunakan mode ${theme === 'dark' ? 'Gelap (Obsidian Dark)' : 'Terang (Clean Light)'}`,
        icon: theme === 'dark' ? <Sun size={18} className="cmd-icon-amber" /> : <Moon size={18} className="cmd-icon-blue" />,
        badge: 'Tema',
        keywords: 'tema theme dark light gelap terang mode ganti',
        perform: () => {
          toggleTheme();
          showToast(`Tema diganti ke mode ${theme === 'dark' ? 'Terang' : 'Gelap'}! 🎨`);
        },
      },
      {
        id: 'action-email',
        category: 'Aksi Cepat',
        title: `Salin Email (${personalData.email})`,
        subtitle: 'Salin alamat email resmi Andrian untuk korespondensi',
        icon: <Copy size={18} className="cmd-icon-emerald" />,
        badge: 'Salin',
        keywords: 'email gmail salin copy kontak surat',
        perform: () => {
          copyToClipboard(personalData.email, 'Alamat Email');
        },
      },
      {
        id: 'action-wa',
        category: 'Aksi Cepat',
        title: `Salin WhatsApp (${personalData.phone})`,
        subtitle: 'Salin nomor WhatsApp aktif Andrian',
        icon: <Phone size={18} className="cmd-icon-emerald" />,
        badge: 'WhatsApp',
        keywords: 'wa whatsapp telepon phone kontak nomor salin',
        perform: () => {
          copyToClipboard(personalData.phone, 'Nomor WhatsApp');
        },
      },
      {
        id: 'action-confetti',
        category: 'Aksi Cepat',
        title: 'Luncurkan Confetti Selebrasi 🎉',
        subtitle: 'Tembakkan animasi perayaan prestasi Wisudawan Terbaik Ke-130',
        icon: <Sparkles size={18} className="cmd-icon-amber" />,
        badge: 'Easter Egg',
        keywords: 'confetti selebrasi pesta rayakan selamat prestasi',
        perform: () => {
          triggerConfetti();
        },
      },
      {
        id: 'action-archive',
        category: 'Aksi Cepat',
        title: isArchiveView ? 'Kembali ke Beranda Utama' : 'Buka Arsip Lengkap (28+ Proyek Sistem)',
        subtitle: 'Daftar komprehensif seluruh sistem informasi dan proyek teknis',
        icon: <Layers size={18} className="cmd-icon-cyan" />,
        badge: 'Arsip',
        keywords: 'arsip archive 28 proyek list daftar semua',
        perform: () => {
          onToggleArchive();
          onClose();
        },
      }
    );

    // 2. NAVIGATION (SECTIONS)
    const sections = [
      { id: 'work', title: 'Galeri Karya (Work Gallery)', subtitle: 'Koleksi 9 aplikasi web produksi dan sistem cerdas', badge: 'Section' },
      { id: 'capabilities', title: 'Keahlian Teknis (Capabilities & Tech Ecosystem)', subtitle: '20 tools, arsitektur sistem, dan software QA', badge: 'Section' },
      { id: 'about', title: 'Tentang Saya (About Me)', subtitle: 'Latar belakang, lulusan wisudawan terbaik, bio & traits', badge: 'Section' },
      { id: 'awards', title: 'Penghargaan (Awards & Achievements)', subtitle: 'Wisudawan Terbaik UNPAM & Apresiasi Pusdiklat BPS RI', badge: 'Section' },
      { id: 'trainings', title: 'Pengalaman & Pelatihan (Trainings & Publications)', subtitle: 'Magang BPS RI, PKM, dan 3 publikasi jurnal SINTA', badge: 'Section' },
      { id: 'contact', title: 'Hubungi Saya (Contact & Get In Touch)', subtitle: 'Tautan sosial media, resume, dan jalur komunikasi', badge: 'Section' },
    ];

    sections.forEach((sec) => {
      list.push({
        id: `nav-${sec.id}`,
        category: 'Navigasi Halaman',
        title: sec.title,
        subtitle: sec.subtitle,
        icon: <Compass size={18} className="cmd-icon-blue" />,
        badge: sec.badge,
        keywords: `navigasi ke section loncat lompat ${sec.id} ${sec.title}`,
        perform: () => {
          onClose();
          if (isArchiveView) {
            onToggleArchive();
            setTimeout(() => onNavigate(sec.id), 120);
          } else {
            onNavigate(sec.id);
          }
        },
      });
    });

    // 3. FEATURED PROJECTS (SELECTED)
    selectedProjects.forEach((proj) => {
      list.push({
        id: `proj-${proj.id}`,
        category: 'Proyek Unggulan',
        title: proj.title,
        subtitle: proj.description,
        icon: <Rocket size={18} style={{ color: proj.uiColor || '#06b6d4' }} />,
        badge: proj.awardBadge || 'Live Web',
        tags: proj.tags || [],
        keywords: `proyek project ${proj.title} ${proj.shortTitle} ${(proj.tags || []).join(' ')} ${proj.architecture || ''}`,
        perform: () => {
          onClose();
          setTimeout(() => {
            if (onSelectProject) {
              onSelectProject(proj);
            } else if (proj.demoUrl && proj.demoUrl !== '#') {
              window.open(proj.demoUrl, '_blank', 'noopener,noreferrer');
            }
          }, 150);
        },
      });
    });

    // 4. AWARDS & ACHIEVEMENTS
    awards.forEach((award) => {
      list.push({
        id: `award-${award.id}`,
        category: 'Penghargaan & Prestasi',
        title: award.title,
        subtitle: `${award.organization} (${award.year}) — ${award.summary || award.description}`,
        icon: <Award size={18} className="cmd-icon-amber" />,
        badge: award.badge || 'Prestasi',
        keywords: `penghargaan prestasi award wisudawan terbaik bps pkm capstone ${award.title} ${award.organization}`,
        perform: () => {
          onClose();
          setTimeout(() => {
            if (onSelectAward) {
              onSelectAward(award);
            }
          }, 150);
        },
      });
    });

    // 5. TRAININGS, INTERNSHIP & SINTA PUBLICATIONS
    trainings.forEach((tr) => {
      list.push({
        id: `training-${tr.id}`,
        category: 'Pelatihan & Publikasi Ilmiah',
        title: tr.title,
        subtitle: `${tr.organization} (${tr.date}) — ${tr.categoryLabel || tr.badge}`,
        icon: <GraduationCap size={18} className="cmd-icon-cyan" />,
        badge: tr.badge || 'Sertifikat',
        keywords: `pelatihan training magang bps pkm publikasi jurnal sinta seminar ${tr.title} ${tr.organization}`,
        perform: () => {
          onClose();
          setTimeout(() => {
            if (onSelectAward) {
              onSelectAward({
                title: tr.title,
                organization: tr.organization,
                year: tr.date,
                badge: tr.badge,
                image: tr.certificatePages?.[0] || tr.images?.[0] || '/award-1.jpg',
                description: tr.description,
              });
            }
          }, 150);
        },
      });
    });

    // 6. TECHNICAL ARCHIVE (NOTABLE HIGHLIGHTS)
    technicalArchive.slice(0, 10).forEach((item) => {
      list.push({
        id: `archive-${item.id}`,
        category: 'Koleksi Sistem & Riset',
        title: item.title,
        subtitle: item.description,
        icon: <Code2 size={18} className="cmd-icon-purple" />,
        badge: item.year || 'Sistem',
        tags: item.stack || [],
        keywords: `arsip sistem teknis ${item.title} ${(item.stack || []).join(' ')}`,
        perform: () => {
          if (item.liveUrl && item.liveUrl !== '#') {
            window.open(item.liveUrl, '_blank', 'noopener,noreferrer');
          } else if (item.githubUrl) {
            window.open(item.githubUrl, '_blank', 'noopener,noreferrer');
          }
          onClose();
        },
      });
    });

    // 7. TECH STACK DIRECT SEARCH
    techStack.forEach((tech) => {
      list.push({
        id: `tech-${tech.name}`,
        category: 'Keahlian & Tools',
        title: `Keahlian: ${tech.name} (${tech.level})`,
        subtitle: `Kategori: ${tech.category} — Klik untuk melihat implementasi di section Capabilities`,
        icon: <Flame size={18} style={{ color: tech.color || '#06b6d4' }} />,
        badge: tech.level,
        keywords: `tech stack keahlian alat tools skill ${tech.name} ${tech.category} ${tech.level}`,
        perform: () => {
          onClose();
          if (isArchiveView) {
            onToggleArchive();
            setTimeout(() => onNavigate('capabilities'), 120);
          } else {
            onNavigate('capabilities');
          }
        },
      });
    });

    // 8. EXTERNAL LINKS
    list.push(
      {
        id: 'ext-github',
        category: 'Tautan Eksternal',
        title: `GitHub Profile: ${personalData.githubUsername}`,
        subtitle: 'Kunjungi repositori kode sumber dan kontribusi proyek Andrian',
        icon: <ExternalLink size={18} className="cmd-icon-cyan" />,
        badge: 'Eksternal',
        keywords: 'github repositori kode git link',
        perform: () => {
          window.open(personalData.github, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'ext-linkedin',
        category: 'Tautan Eksternal',
        title: `LinkedIn Profile: ${personalData.linkedinUsername}`,
        subtitle: 'Koneksi profesional dan riwayat karir terverifikasi Andrian',
        icon: <ExternalLink size={18} className="cmd-icon-blue" />,
        badge: 'Eksternal',
        keywords: 'linkedin koneksi karir profil link',
        perform: () => {
          window.open(personalData.linkedin, '_blank', 'noopener,noreferrer');
          onClose();
        },
      }
    );

    return list;
  }, [theme, isArchiveView, onNavigate, onOpenMessage, onOpenAI, onSelectProject, onSelectAward, toggleTheme, onToggleArchive, onClose]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default view: highlight popular actions and projects
      return allItems.filter(
        (item) => item.category === 'Aksi Cepat' || item.category === 'Navigasi Halaman' || item.category === 'Proyek Unggulan'
      );
    }

    const words = q.split(/\s+/).filter(Boolean);
    return allItems.filter((item) => {
      const matchText = `${item.title} ${item.subtitle} ${item.category} ${item.keywords || ''} ${(item.tags || []).join(' ')}`.toLowerCase();
      return words.every((word) => matchText.includes(word));
    });
  }, [query, allItems]);

  // Adjust selected index on filter change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation inside the list
  const handleKeyDown = (e) => {
    if (filteredItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const currentItem = filteredItems[selectedIndex];
      if (currentItem && currentItem.perform) {
        currentItem.perform();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector('.cmd-item.is-selected');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="cmd-palette-overlay" onClick={onClose}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="cmd-toast" role="status" aria-live="polite">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Dialog Box */}
      <div
        className="cmd-palette-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Spotlight Command Search"
      >
        {/* Header Search Input */}
        <div className="cmd-header">
          <Search size={20} className="cmd-search-icon" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Cari proyek, keahlian, sertifikasi, atau aksi cepat..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck="false"
          />
          {query ? (
            <button
              className="cmd-clear-btn"
              onClick={() => setQuery('')}
              aria-label="Hapus pencarian"
              title="Bersihkan input"
            >
              <X size={16} />
            </button>
          ) : (
            <div className="cmd-shortcut-tag">
              <kbd>ESC</kbd>
            </div>
          )}
        </div>

        {/* Results List */}
        <div className="cmd-list" ref={listRef} role="listbox">
          {filteredItems.length === 0 ? (
            <div className="cmd-empty-state">
              <Search size={36} className="cmd-empty-icon" />
              <h4>Tidak ada hasil untuk "{query}"</h4>
              <p>Coba kata kunci lain seperti <strong>React</strong>, <strong>KNN</strong>, <strong>Wisudawan</strong>, <strong>CV</strong>, atau <strong>BPS</strong>.</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const isFirstOfCategory =
                idx === 0 || filteredItems[idx - 1].category !== item.category;

              return (
                <React.Fragment key={item.id}>
                  {isFirstOfCategory && (
                    <div className="cmd-category-header">
                      <span>{item.category}</span>
                    </div>
                  )}
                  <div
                    className={`cmd-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      if (item.perform) item.perform();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="cmd-item-icon-wrap" aria-hidden="true">
                      {item.icon}
                    </div>
                    <div className="cmd-item-content">
                      <div className="cmd-item-title-row">
                        <span className="cmd-item-title">{item.title}</span>
                        {item.badge && (
                          <span className="cmd-item-badge">{item.badge}</span>
                        )}
                      </div>
                      {item.subtitle && (
                        <div className="cmd-item-subtitle">{item.subtitle}</div>
                      )}
                      {item.tags && item.tags.length > 0 && (
                        <div className="cmd-item-tags">
                          {item.tags.slice(0, 4).map((tag, tIdx) => (
                            <span key={tIdx} className="cmd-tag-pill">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="cmd-item-enter-hint" aria-hidden="true">
                      <CornerDownLeft size={13} />
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          )}
        </div>

        {/* Footer with Keyboard Hints & Quick Prompts */}
        <div className="cmd-footer">
          <div className="cmd-footer-hints">
            <span className="cmd-hint-item">
              <kbd>↑</kbd><kbd>↓</kbd> Navigasi
            </span>
            <span className="cmd-hint-item">
              <kbd>↵</kbd> Pilih
            </span>
            <span className="cmd-hint-item">
              <kbd>ESC</kbd> Tutup
            </span>
          </div>

          <div className="cmd-footer-branding">
            <Command size={12} />
            <span>ANDRIAN SPOTLIGHT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
