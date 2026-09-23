import React from 'react';
import { X, Award, ShieldCheck, Calendar, Download, ExternalLink } from 'lucide-react';

export default function AwardModal({ award, onClose }) {
  if (!award) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="certificate-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-corner"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <Award size={30} color="#f59e0b" />
          </div>

          <span className="mono-label" style={{ color: '#f59e0b' }}>
            {award.badge || 'VERIFIED CREDENTIAL'}
          </span>
          <h3 style={{ fontSize: '1.45rem', marginTop: 8, marginBottom: 6 }}>
            {award.title}
          </h3>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {award.organization} • {award.year || award.date}
          </div>
        </div>

        {/* Real Award Photo / Stacked Certificate Pages Preview (Atas Bawah) */}
        {award.certificatePages && award.certificatePages.length > 0 ? (
          <div className="award-modal-stacked-pages">
            {award.certificatePages.map((pageSrc, pIdx) => (
              <div key={pIdx} className="certificate-page-wrap">
                {award.certificatePages.length > 1 && (
                  <div className="certificate-page-indicator">
                    <span className="mono-label">
                      {award.isPublication
                        ? `PUBLIKASI ILMIAH ${pIdx + 1} DARI ${award.certificatePages.length}`
                        : `HALAMAN / ITEM ${pIdx + 1} DARI ${award.certificatePages.length}`}
                    </span>
                  </div>
                )}
                <img
                  src={pageSrc}
                  alt={`${award.title} - Item ${pIdx + 1}`}
                  className="award-modal-photo stacked-page"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : award.image ? (
          <div className="award-modal-photo-container">
            <img
              src={award.image}
              alt={award.title}
              className="award-modal-photo"
            />
            {award.secondaryImage && (
              <div className="award-modal-secondary-badge">
                <span className="mono-label" style={{ fontSize: '0.68rem' }}>
                  Dokumentasi Wisuda 130
                </span>
              </div>
            )}
          </div>
        ) : null}

        <div
          style={{
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            border: '1px solid var(--border-color)',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: 8,
              color: 'var(--text-primary)',
            }}
          >
            <ShieldCheck size={16} color="#10b981" />
            <span>{award.isPublication ? 'Keterangan Publikasi Ilmiah' : 'Keterangan Pencapaian'}</span>
          </div>
          <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            {award.description}
          </p>

          {/* Direct Journal Article Links when multiple publications are in view */}
          {award.credentials && award.credentials.some((c) => c.verifyUrl) && (
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: 10,
                }}
              >
                {award.isPublication ? 'Tautan Resmi Artikel Publikasi Jurnal:' : 'Tautan Kredensial:'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {award.credentials.map(
                  (cred, cIdx) =>
                    cred.verifyUrl && (
                      <a
                        key={cIdx}
                        href={cred.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '6px 12px',
                          fontSize: '0.8rem',
                          textDecoration: 'none',
                          background: 'rgba(6, 182, 212, 0.1)',
                          border: '1px solid rgba(6, 182, 212, 0.3)',
                          borderRadius: '6px',
                          color: '#06b6d4',
                          fontWeight: 600,
                        }}
                        title={`Buka Artikel: ${cred.title}`}
                      >
                        <span>{cred.shortTitle || cred.title}</span>
                        <ExternalLink size={13} />
                      </a>
                    )
                )}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {award.verifyUrl && (
            <a
              href={award.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="submit-msg-btn"
              style={{
                flex: 1,
                minWidth: '220px',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <ExternalLink size={15} />
              <span>{award.verifyLabel || (award.isPublication ? 'Buka Artikel Jurnal ↗' : 'Verifikasi Kredensial ↗')}</span>
            </a>
          )}
          <button
            className="submit-msg-btn"
            style={{ flex: 1, minWidth: '180px' }}
            onClick={() => {
              const downloadUrl = (award.certificatePages && award.certificatePages[0]) || award.image;
              if (downloadUrl) {
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `${award.title}.jpg`;
                link.target = '_blank';
                link.click();
              }
            }}
          >
            <Download size={15} />
            <span>Unduh Berkas</span>
          </button>
          <button
            className="view-more-btn"
            style={{ flex: '0 0 auto', padding: '0 24px', justifyContent: 'center' }}
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
