import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkGallery from './components/WorkGallery';
import Capabilities from './components/Capabilities';
import AboutMe from './components/AboutMe';
import Awards from './components/Awards';
import Trainings from './components/Trainings';
import Contact from './components/Contact';
import ArchiveView from './components/ArchiveView';
import AIAssistantWidget from './components/AIAssistantWidget';
import MessageModal from './components/MessageModal';
import AwardModal from './components/AwardModal';
import IntroScreen from './components/IntroScreen';
import { ArrowUp } from 'lucide-react';
import './styles/components.css';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isArchiveView, setIsArchiveView] = useState(false);
  const [activeSection, setActiveSection] = useState('work');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [rippleStyle, setRippleStyle] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [showIntro, setShowIntro] = useState(true);

  // Sync theme with document attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Track global mouse position for spotlight glow
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // Scroll Reveal Observer: Triggers smooth fade-in for every section
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isArchiveView]);

  // Handle circular theme toggle transition (matches video at 00:03)
  const toggleTheme = (e) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    if (e && e.clientX && e.clientY) {
      const x = e.clientX;
      const y = e.clientY;
      const overlayColor = nextTheme === 'dark' ? '#09090b' : '#f8f9fb';

      setRippleStyle({
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: overlayColor,
        animating: true,
      });

      setTimeout(() => {
        setTheme(nextTheme);
      }, 250);

      setTimeout(() => {
        setRippleStyle(null);
      }, 700);
    } else {
      setTheme(nextTheme);
    }
  };

  // Track scroll position for navbar highlighting and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 450);

      if (isArchiveView) return;

      const sections = ['work', 'capabilities', 'about', 'awards', 'trainings', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isArchiveView]);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -55;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="portfolio-app-root">
      {/* Intro Animation Screen */}
      {showIntro && (
        <IntroScreen onComplete={() => setShowIntro(false)} />
      )}

      {/* Interactive Cursor Spotlight Follower */}
      <div
        className="spotlight-glow"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* Ripple Animation Overlay for Theme Switch */}
      {rippleStyle && (
        <div
          className={`theme-switch-overlay ${rippleStyle.animating ? 'animating' : ''}`}
          style={{
            left: rippleStyle.left,
            top: rippleStyle.top,
            backgroundColor: rippleStyle.backgroundColor,
          }}
        />
      )}

      {/* Global Sticky Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenMessage={() => setIsMessageModalOpen(true)}
        isArchiveView={isArchiveView}
        onToggleArchive={() => {
          setIsArchiveView(!isArchiveView);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main View or Archive View */}
      {!isArchiveView ? (
        <main>
          <Hero
            onScrollDown={() => scrollToSection('work')}
            theme={theme}
            isIntroActive={showIntro}
          />
          <WorkGallery
            onOpenArchive={() => {
              setIsArchiveView(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
          <Capabilities />
          <AboutMe />
          <Awards onSelectAward={(award) => setSelectedAward(award)} />
          <Trainings onSelectCertificate={(cert) => setSelectedAward(cert)} />
          <Contact onOpenMessageModal={() => setIsMessageModalOpen(true)} />
        </main>
      ) : (
        <ArchiveView
          onClose={() => {
            setIsArchiveView(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Floating Bottom-Left AI Assistant Widget ("Tanya AI Andrian") */}
      <AIAssistantWidget />

      {/* Floating Bottom-Right Contact Form Modal (matches video 00:43) */}
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
      />

      {/* Award / Certificate Detail Modal */}
      <AwardModal
        award={selectedAward}
        onClose={() => setSelectedAward(null)}
      />

      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Kembali ke atas"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
