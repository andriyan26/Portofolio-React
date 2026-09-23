import React from 'react';
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

export default function Capabilities() {
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

  return (
    <section className="section-container" id="capabilities">
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

          {/* 4x5 Grid of Squircle Icons - No Text, Pure Icons */}
          <div className="tech-squircles-grid" aria-label="Tech Stack Icons">
            {techIconsList.map((item, idx) => (
              <div
                key={idx}
                className="tech-squircle-tile"
                title={item.name}
                aria-label={item.name}
              >
                {item.icon}
              </div>
            ))}
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

