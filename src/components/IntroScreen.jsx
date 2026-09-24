import React, { useState, useEffect, useRef } from 'react';

/**
 * IntroScreen Component:
 * Animasi pembuka portofolio yang bersih, mewah, dan berfokus penuh pada animasi visual:
 * - Kilatan Petir Elektrik Hebat (Vibrant Electric Lightning) yang mencolok dan berpendar nyata
 * - Pusaran Partikel Galaksi 3D (Swirling Star Vortex) seperti di video referensi
 * - Tipografi elegan & bersih: "Welcome To My Portofolio Website" (tanpa kata-kata berlebihan)
 * - Indikator loading halus (0% -> 100%) dengan garis progress neon cyan/blue
 * - Transisi mulus menuju Landing Page (Gambar Ke-1)
 */
export default function IntroScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef(null);

  // Counter 0% to 100% in ~2.6 seconds
  useEffect(() => {
    const startTime = performance.now();
    const duration = 2600; // ms

    let animId;
    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
        }, 200);
      } else {
        animId = requestAnimationFrame(updateProgress);
      }
    };

    animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  // High-Performance 60FPS Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 1. Starfield Background (Deep Space)
    const bgStars = [];
    for (let i = 0; i < 180; i++) {
      bgStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    // 2. Swirling 3D Particle Galaxy Vortex (Identik dengan video 00:01)
    const vortexParticles = [];
    const particleCount = window.innerWidth < 768 ? 240 : 480;
    for (let i = 0; i < particleCount; i++) {
      vortexParticles.push({
        angle: Math.random() * Math.PI * 2,
        radiusX: Math.random() * (Math.min(canvas.width, canvas.height) * 0.44) + 15,
        radiusY: Math.random() * (Math.min(canvas.width, canvas.height) * 0.22) + 8,
        tiltAngle: -0.22, // Tilted orbital plane
        speed: (Math.random() * 0.014 + 0.007) * (Math.random() > 0.1 ? 1 : -1),
        size: Math.random() * 2.4 + 0.7,
        color: ['#ffffff', '#ffffff', '#67e8f9', '#38bdf8', '#818cf8', '#a5f3fc'][Math.floor(Math.random() * 6)],
      });
    }

    // 3. High-Intensity Procedural Lightning Engine
    let lightningBolts = [];
    let persistentSparks = [];
    let lastStrikeTime = 0;
    let flashAlpha = 0;
    let strikeCenterX = canvas.width * 0.5;

    const createLightningStrike = (w, h) => {
      const segments = [];
      const originX = w * (0.42 + Math.random() * 0.16);
      strikeCenterX = originX;
      let currentX = originX;
      let currentY = 0;
      const targetY = h;

      while (currentY < targetY) {
        const stepY = Math.random() * 24 + 12;
        const stepX = (Math.random() - 0.5) * 55;
        const nextX = currentX + stepX;
        const nextY = Math.min(targetY, currentY + stepY);

        segments.push({
          x1: currentX,
          y1: currentY,
          x2: nextX,
          y2: nextY,
          isSub: false,
          thickness: Math.random() * 1.5 + 2.5,
        });

        // Dynamic branching forks
        if (Math.random() < 0.52) {
          let branchX = nextX;
          let branchY = nextY;
          const branchDir = Math.random() > 0.5 ? 1 : -1;
          const branchLength = Math.floor(Math.random() * 5 + 3);

          for (let b = 0; b < branchLength; b++) {
            const bNextX = branchX + (Math.random() * 0.8 + 0.2) * branchDir * 45;
            const bNextY = branchY + Math.random() * 26 + 8;
            segments.push({
              x1: branchX,
              y1: branchY,
              x2: bNextX,
              y2: bNextY,
              isSub: true,
              thickness: Math.max(1, 2.5 - b * 0.4),
            });
            branchX = bNextX;
            branchY = bNextY;
          }
        }

        currentX = nextX;
        currentY = nextY;
      }

      return segments;
    };

    // Initial strike so there's never a blank screen
    lightningBolts = createLightningStrike(canvas.width, canvas.height);
    lastStrikeTime = Date.now();
    flashAlpha = 0.8;

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space background gradient
      const bgGrad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        30,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.85
      );
      bgGrad.addColorStop(0, '#0a102b');
      bgGrad.addColorStop(0.35, '#040714');
      bgGrad.addColorStop(0.7, '#02030a');
      bgGrad.addColorStop(1, '#010104');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Thunder flash lighting up the cosmic sky
      if (flashAlpha > 0) {
        // Ambient cyan-white flash
        ctx.fillStyle = `rgba(56, 189, 248, ${flashAlpha * 0.26})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Center localized lightning explosion glow
        const radialGlow = ctx.createRadialGradient(
          strikeCenterX,
          canvas.height * 0.45,
          10,
          strikeCenterX,
          canvas.height * 0.45,
          Math.min(canvas.width, canvas.height) * 0.55
        );
        radialGlow.addColorStop(0, `rgba(165, 243, 252, ${flashAlpha * 0.4})`);
        radialGlow.addColorStop(0.4, `rgba(56, 189, 248, ${flashAlpha * 0.2})`);
        radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radialGlow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        flashAlpha *= 0.87;
      }

      // Draw static twinkling background stars
      bgStars.forEach((star) => {
        star.alpha += Math.sin(tick * star.twinkleSpeed) * 0.018;
        const a = Math.max(0.12, Math.min(0.95, star.alpha));
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Swirling 3D Galaxy Vortex Particles (Pusaran partikel seperti di video)
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      vortexParticles.forEach((p) => {
        p.angle += p.speed;
        const cos = Math.cos(p.angle);
        const sin = Math.sin(p.angle);

        // Elliptical rotation with tilt
        const x = cos * p.radiusX;
        const y = sin * p.radiusY;

        const rotatedX = cx + x * Math.cos(p.tiltAngle) - y * Math.sin(p.tiltAngle);
        const rotatedY = cy + x * Math.sin(p.tiltAngle) + y * Math.cos(p.tiltAngle);

        // Depth perspective (front particles are larger & brighter)
        const depth = (sin + 1) / 2; // 0 to 1
        const scale = 0.5 + depth * 0.85;
        const alpha = 0.25 + depth * 0.75;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 6;
        ctx.beginPath();
        ctx.arc(rotatedX, rotatedY, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      // Dynamic High-Voltage Lightning Strikes
      const now = Date.now();
      const timeSinceStrike = now - lastStrikeTime;

      // Strike every 190ms - 280ms continuously for that intense storm look
      if (timeSinceStrike > 200 && Math.random() < 0.75) {
        lightningBolts = createLightningStrike(canvas.width, canvas.height);
        lastStrikeTime = now;
        flashAlpha = Math.random() * 0.4 + 0.6;
      }

      // Render Active Lightning Bolt with Multi-Pass Blooming Glow
      if (lightningBolts.length > 0 && timeSinceStrike < 220) {
        const fade = Math.pow(1 - timeSinceStrike / 220, 0.8);

        // Pass 1: Extra-Wide Atmospheric Electric Cyan Bloom
        ctx.lineWidth = 14;
        ctx.strokeStyle = `rgba(6, 182, 212, ${fade * 0.4})`;
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 35;
        ctx.beginPath();
        lightningBolts.forEach((seg) => {
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        });
        ctx.stroke();

        // Pass 2: Intense Electric Blue Core Aura
        ctx.lineWidth = 6;
        ctx.strokeStyle = `rgba(56, 189, 248, ${fade * 0.85})`;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        lightningBolts.forEach((seg) => {
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        });
        ctx.stroke();

        // Pass 3: Blazing Pure White Plasma Core
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${fade * 1})`;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        lightningBolts.forEach((seg) => {
          if (!seg.isSub) {
            ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
          }
        });
        ctx.stroke();

        // Pass 4: Sub-branches Core
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(224, 242, 254, ${fade * 0.9})`;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        lightningBolts.forEach((seg) => {
          if (seg.isSub) {
            ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
          }
        });
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleQuickSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 350);
  };

  return (
    <div
      className={`intro-screen-overlay ${isExiting ? 'is-exiting' : ''}`}
      onClick={handleQuickSkip}
      title="Klik untuk langsung masuk"
    >
      {/* 60FPS Lightning & Galaxy Canvas */}
      <canvas ref={canvasRef} className="intro-canvas" />

      {/* Center Cinematic Content (Persis seperti di video: Bersih, Mewah, Tidak Ramai) */}
      <div className="intro-minimal-center">
        {/* Title: Welcome To My Portofolio Website */}
        <h1 className="intro-video-title">
          Welcome To My <br />
          <span className="intro-video-highlight">Portofolio</span> Website
        </h1>

        {/* Minimalist Clean Loader (Seperti di video) */}
        <div className="intro-video-loader">
          <div className="loader-info-row">
            <span className="loader-label">Loading...</span>
            <span className="loader-percentage">{progress}%</span>
          </div>
          <div className="loader-track-bar">
            <div className="loader-fill-glow" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
