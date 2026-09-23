import React, { useState } from 'react';
import { Mail, ArrowRight, Download, Send, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personalData } from '../data/portfolioData';
import TypewriterText from './TypewriterText';

export default function Contact({ onOpenMessageModal }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="section-container" id="contact" style={{ paddingBottom: 140 }}>
      <div className="contact-grid">
        {/* Left Column: Big Typography with Scroll Reveal */}
        <div className="contact-left reveal">
          <span className="section-tag">GET IN TOUCH</span>
          <h2 className="section-title">
            <TypewriterText text="Let's Work Together" />
          </h2>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
            Terbuka Untuk Kolaborasi &amp; Peluang Karir
          </div>
          <p>
            Siap berkontribusi dalam rekayasa perangkat lunak, web engineering, system testing, dan solusi teknologi digital. Hubungi saya untuk mendiskusikan peluang kolaborasi.
          </p>

          <a
            href={personalData.resumeUrl || '/CV-ANDRIAN.pdf'}
            download="CV ANDRIAN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="view-more-btn"
            style={{
              padding: '12px 26px',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
            }}
            title="Unduh Resume / CV Resmi Andrian (PDF)"
          >
            <span>DOWNLOAD RESUME (CV)</span>
            <Download size={16} />
          </a>
        </div>

        {/* Right Column: Channels with Scroll Reveal */}
        <div className="contact-right reveal delay-1">
          <div className="contact-channels-list">
            {/* 01 Email */}
            <div className="channel-card" onClick={copyEmail} style={{ cursor: 'pointer' }} title="Klik untuk menyalin email">
              <div className="channel-left">
                <span className="channel-num">01</span>
                <Mail size={18} color="var(--text-muted)" />
                <div>
                  <div className="channel-type">EMAIL</div>
                  <div className="channel-val">{personalData.email}</div>
                </div>
              </div>
              <div style={{ color: 'var(--text-muted)' }}>
                {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              </div>
            </div>

            {/* 02 GitHub */}
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-card"
            >
              <div className="channel-left">
                <span className="channel-num">02</span>
                <GithubIcon size={18} color="var(--text-muted)" />
                <div>
                  <div className="channel-type">GITHUB</div>
                  <div className="channel-val">{personalData.githubUsername}</div>
                </div>
              </div>
              <ArrowRight size={16} color="var(--text-muted)" />
            </a>

            {/* 03 LinkedIn */}
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-card"
            >
              <div className="channel-left">
                <span className="channel-num">03</span>
                <LinkedinIcon size={18} color="var(--text-muted)" />
                <div>
                  <div className="channel-type">LINKEDIN</div>
                  <div className="channel-val">{personalData.linkedinUsername}</div>
                </div>
              </div>
              <ArrowRight size={16} color="var(--text-muted)" />
            </a>
          </div>

          {/* Big Action Button: Send Me A Message */}
          <button className="send-msg-cta-btn" onClick={onOpenMessageModal}>
            <span>SEND ME A MESSAGE</span>
            <Send size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
