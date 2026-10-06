import React, { useState, useEffect, useRef } from 'react';
import {
  Html5Icon,
  Css3Icon,
  JsIcon,
  TypeScriptIcon,
  ReactIcon,
  TailwindIcon,
  NodeIcon,
  PhpIcon,
  LaravelIcon,
  PythonIcon,
  DjangoIcon,
  MysqlIcon,
  GitIcon,
  GitHubTechIcon,
  DockerIcon,
  PostmanIcon,
  OpenCvIcon,
  FlameIcon,
  VsCodeIcon,
  FigmaIcon,
  WebDevCenterIcon,
  IntelligentSystemsCenterIcon,
} from './TechIcons';
import TypewriterText from './TypewriterText';

// Koordinat sebaran partikel awal yang jauh lebih lebar, dinamis & sinematik
const scatterConfigs = [
  // Baris 1: React, JS, TS, Tailwind
  { x: -190, y: -160, r: -48, s: 0.40 }, // React (jauh ke kiri atas)
  { x: -65,  y: -220, r: 35,  s: 0.45 }, // JS (melayang tinggi ke atas)
  { x: 95,   y: -205, r: -32, s: 0.42 }, // TS (melayang tinggi kanan atas)
  { x: 260,  y: -150, r: 52,  s: 0.46 }, // Tailwind (jauh ke kanan atas)

  // Baris 2: PHP, Laravel, Python, Django
  { x: -250, y: -80,  r: -58, s: 0.38 }, // PHP (jauh menyebar ke sisi kiri)
  { x: -125, y: -70,  r: 28,  s: 0.50 }, // Laravel (kiri atas agak dalam)
  { x: 145,  y: -75,  r: -38, s: 0.48 }, // Python (kanan atas agak dalam)
  { x: 285,  y: -65,  r: 65,  s: 0.42 }, // Django (jauh ke sisi kanan)

  // Baris 3: MySQL, Node.js, HTML5, CSS3
  { x: -275, y: 15,   r: -42, s: 0.38 }, // MySQL (sayap paling kiri tengah)
  { x: -115, y: 25,   r: 44,  s: 0.52 }, // Node.js (tengah kiri)
  { x: 135,  y: 20,   r: -45, s: 0.48 }, // HTML5 (tengah kanan)
  { x: 295,  y: 25,   r: 36,  s: 0.40 }, // CSS3 (sayap paling kanan tengah)

  // Baris 4: Git, GitHub, Docker, Postman
  { x: -245, y: 125,  r: -62, s: 0.40 }, // Git (jauh ke sisi kiri bawah)
  { x: -120, y: 115,  r: 32,  s: 0.50 }, // GitHub (kiri bawah agak dalam)
  { x: 125,  y: 130,  r: -28, s: 0.48 }, // Docker (kanan bawah agak dalam)
  { x: 270,  y: 120,  r: 58,  s: 0.42 }, // Postman (jauh ke sisi kanan bawah)

  // Baris 5: OpenCV, Flame, VS Code, Figma
  { x: -195, y: 225,  r: -52, s: 0.38 }, // OpenCV (jauh ke kiri bawah)
  { x: -65,  y: 250,  r: 40,  s: 0.44 }, // Flame (melayang jauh ke bawah)
  { x: 95,   y: 240,  r: -36, s: 0.44 }, // VS Code (melayang jauh ke kanan bawah)
  { x: 245,  y: 215,  r: 68,  s: 0.40 }, // Figma (jauh ke sudut kanan bawah)
];

export default function Capabilities() {
  const [isAssembled, setIsAssembled] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  // 20 Tech Stack Squircles (4 columns x 5 rows) - Pure icons only, no text labels
  const techIconsList = [
    { name: 'React', icon: <ReactIcon /> },
    { name: 'JavaScript', icon: <JsIcon /> },
    { name: 'TypeScript', icon: <TypeScriptIcon /> },
    { name: 'Tailwind CSS', icon: <TailwindIcon /> },

    { name: 'PHP', icon: <PhpIcon /> },
    { name: 'Laravel', icon: <LaravelIcon /> },
    { name: 'Python', icon: <PythonIcon /> },
    { name: 'Django', icon: <DjangoIcon /> },

    { name: 'MySQL', icon: <MysqlIcon /> },
    { name: 'Node.js', icon: <NodeIcon /> },
    { name: 'HTML5', icon: <Html5Icon /> },
    { name: 'CSS3', icon: <Css3Icon /> },

    { name: 'Git', icon: <GitIcon /> },
    { name: 'GitHub', icon: <GitHubTechIcon /> },
    { name: 'Docker', icon: <DockerIcon /> },
    { name: 'Postman', icon: <PostmanIcon /> },

    { name: 'OpenCV', icon: <OpenCvIcon /> },
    { name: 'CodeIgniter / Firebase', icon: <FlameIcon /> },
    { name: 'VS Code', icon: <VsCodeIcon /> },
    { name: 'Figma', icon: <FigmaIcon /> },
  ];

  // Helper untuk memicu sebaran lalu menyusun bertahap secara otomatis
  const triggerAssembly = (delayMs = 360) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsAssembled(false);
    timerRef.current = setTimeout(() => {
      setIsAssembled(true);
    }, delayMs);
  };

  // Picu animasi menyebar luas -> menyusun satu per satu secara otomatis saat section memasuki layar
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Saat masuk layar, biarkan mata melihat posisi menyebar sejenak (360ms), lalu susun satu per satu
          triggerAssembly(360);
        } else {
          // Saat user scroll menjauh dari section, reset kembali ke posisi menyebar
          if (timerRef.current) clearTimeout(timerRef.current);
          setIsAssembled(false);
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Re-trigger animasi ketika user menavigasi ke bagian ini melalui navbar
  useEffect(() => {
    const handleReassembleEvent = () => {
      // Berikan jeda agar smooth-scroll navbar tiba di target sebelum perakitan dimulai
      triggerAssembly(460);
    };
    window.addEventListener('reassemble-tech-icons', handleReassembleEvent);
    return () => {
      window.removeEventListener('reassemble-tech-icons', handleReassembleEvent);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className="section-container" id="capabilities" ref={containerRef}>
      <div className="capabilities-layout-grid">
        {/* Left Column: Heading, Description & 4x5 Tech Squircle Grid */}
        <div className="capabilities-left-col reveal">
          <span className="section-tag">CAPABILITIES</span>
          <h2 className="section-title">
            <TypewriterText text="What I Can Do" />
          </h2>
          <p className="capabilities-intro-desc">
            Rekayasa perangkat lunak, arsitektur web modern, sistem cerdas (Machine Learning), dan pengujian kualitas sistem (Software QA).
          </p>

          {/* Tech Ecosystem Label (Tanpa tombol tambahan) */}
          <div className="tech-assembly-header">
            <span className="tech-assembly-label">TECH ECOSYSTEM (20 TOOLS)</span>
          </div>

          {/* 4x5 Grid of Squircle Icons - Scatter Luas & Menyusun Perlahan Otomatis */}
          <div
            className={`tech-squircles-grid ${isAssembled ? 'is-grid-assembled' : 'is-grid-scattered'}`}
            aria-label="Tech Stack Icons"
            onClick={() => triggerAssembly(300)}
          >
            {techIconsList.map((item, idx) => {
              const conf = scatterConfigs[idx] || { x: 0, y: 0, r: 0, s: 1 };
              const tileStyle = isAssembled
                ? {
                    transform: 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)',
                    opacity: 1,
                    filter: 'blur(0px)',
                    transitionDelay: `${idx * 80}ms`,
                  }
                : {
                    transform: `translate3d(calc(${conf.x}px * var(--scatter-scale, 1)), calc(${conf.y}px * var(--scatter-scale, 1)), 0px) rotate(${conf.r}deg) scale(${conf.s})`,
                    opacity: 0.22,
                    filter: 'blur(2.5px)',
                    transitionDelay: '0ms',
                  };

              return (
                <div
                  key={idx}
                  className={`tech-squircle-tile ${isAssembled ? 'assembled' : 'scattered'}`}
                  title={`${item.name} (${idx + 1}/20)`}
                  aria-label={item.name}
                  style={tileStyle}
                >
                  {item.icon}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Two Tall Side-by-Side Cards (01 and 02) */}
        <div className="capabilities-right-cards reveal delay-1">
          {/* Card 01: Software Engineering & Full-Stack Web */}
          <div className="capability-card-tall">
            <div className="cap-card-top-row">
              <span className="cap-big-number">01</span>
              <div className="cap-corner-label">
                <span>SOFTWARE</span>
                <span>ENGINEERING &amp;</span>
                <span>FULL-STACK WEB</span>
              </div>
            </div>

            <div className="cap-white-badge-box" aria-hidden="true">
              <WebDevCenterIcon />
            </div>

            <p className="cap-card-body-text">
              Building and architecting robust digital systems, scalable full-stack web applications, and database-driven platforms with clean code standards, high performance, and seamless user experiences.
            </p>

            <div className="cap-pills-container">
              <span className="cap-pill">Full-Stack Web</span>
              <span className="cap-pill">React.js</span>
              <span className="cap-pill">Laravel</span>
              <span className="cap-pill">PHP 8</span>
              <span className="cap-pill">Python</span>
              <span className="cap-pill">Django</span>
              <span className="cap-pill">Node.js</span>
              <span className="cap-pill">MySQL Enterprise</span>
              <span className="cap-pill">RESTful APIs</span>
              <span className="cap-pill">Tailwind CSS</span>
              <span className="cap-pill">JavaScript</span>
              <span className="cap-pill">TypeScript</span>
              <span className="cap-pill">Git &amp; GitHub</span>
            </div>
          </div>

          {/* Card 02: AI, Machine Learning & Software QA */}
          <div className="capability-card-tall">
            <div className="cap-card-top-row">
              <span className="cap-big-number">02</span>
              <div className="cap-corner-label">
                <span>AI, MACHINE</span>
                <span>LEARNING &amp;</span>
                <span>SOFTWARE QA</span>
              </div>
            </div>

            <div className="cap-white-badge-box" aria-hidden="true">
              <IntelligentSystemsCenterIcon />
            </div>

            <p className="cap-card-body-text">
              Developing applied machine learning systems (KNN &amp; SVM), computer vision, IoT/RFID integrations, and structured software QA to guarantee high reliability, precision, and security.
            </p>

            <div className="cap-pills-container">
              <span className="cap-pill">Machine Learning</span>
              <span className="cap-pill">KNN Classifier</span>
              <span className="cap-pill">SVM Algorithm</span>
              <span className="cap-pill">Software QA</span>
              <span className="cap-pill">Computer Vision</span>
              <span className="cap-pill">OpenCV</span>
              <span className="cap-pill">IoT &amp; RFID</span>
              <span className="cap-pill">System Analysis</span>
              <span className="cap-pill">Data Mining</span>
              <span className="cap-pill">API Testing</span>
              <span className="cap-pill">Bug Tracking</span>
              <span className="cap-pill">System Security</span>
              <span className="cap-pill">Agile / Scrum</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

