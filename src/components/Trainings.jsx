import React, { useState, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { trainings } from '../data/portfolioData';
import TypewriterText from './TypewriterText';

// Multi-Photo Carousel Slider for 1 Training / Seminar / Publication Item
// Supports direction='right' (slides towards right when photo is on left) and direction='left' (slides towards left when photo is on right)
function TrainingPhotoSlider({
  images = [],
  title,
  onZoom,
  isCertificate = false,
  isPublication = false,
  direction = 'left',
}) {
  const photoList = Array.isArray(images) && images.length > 0
    ? images
    : ['/training-presentation.jpg'];

  const N = photoList.length;

  // Seamless continuous track setup:
  // For direction === 'right' (photo on left, slides towards right):
  // We arrange slides so track moves from negative towards 0 (+X motion):
  // [P1, ...P_reversed, P1] -> e.g. [P1, PN, PN-1, ..., P2, P1]
  // Start at index N (P1), decrement to N-1 (P2), down to 0 (P1 clone), then snap to N.
  // For direction === 'left' (photo on right, slides towards left):
  // [P1, P2, ..., PN, P1]
  // Start at index 0 (P1), increment to N (P1 clone), then snap to 0.
  const extendedList = N > 1
    ? (direction === 'right'
        ? [photoList[0], ...photoList.slice(1).reverse(), photoList[0]]
        : [...photoList, photoList[0]])
    : photoList;

  const [currentIndex, setCurrentIndex] = useState(direction === 'right' ? N : 0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play timer for multi-photo items (auto-slides every 2.4 seconds)
  useEffect(() => {
    if (N <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      if (direction === 'right') {
        setCurrentIndex((prev) => (prev <= 0 ? N - 1 : prev - 1));
      } else {
        setCurrentIndex((prev) => (prev >= N ? 1 : prev + 1));
      }
    }, 2400);

    return () => clearInterval(timer);
  }, [N, isHovered, direction]);

  // Handle transition end for seamless infinite loop (invisible snap)
  const handleTransitionEnd = () => {
    if (direction === 'right') {
      if (currentIndex <= 0) {
        setIsTransitioning(false);
        setCurrentIndex(N);
      }
    } else {
      if (currentIndex >= N) {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }
    }
  };

  // Re-enable CSS transition after invisible snap
  useEffect(() => {
    if (!isTransitioning) {
      const rId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(rId);
    }
  }, [isTransitioning]);

  const handlePrev = (e) => {
    e.stopPropagation();
    if (direction === 'right') {
      if (currentIndex >= N) {
        setIsTransitioning(false);
        setCurrentIndex(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
            setCurrentIndex(1);
          });
        });
      } else {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
      }
    } else {
      if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(N);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
            setCurrentIndex(N - 1);
          });
        });
      } else {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setIsTransitioning(true);
    if (direction === 'right') {
      setCurrentIndex((prev) => (prev <= 0 ? N - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev >= N ? 1 : prev + 1));
    }
  };

  const handleDotClick = (dotIdx) => {
    setIsTransitioning(true);
    if (direction === 'right') {
      setCurrentIndex(dotIdx === 0 ? N : N - dotIdx);
    } else {
      setCurrentIndex(dotIdx);
    }
  };

  const displayIndex = direction === 'right'
    ? (currentIndex <= 0 || currentIndex >= N ? 0 : N - currentIndex)
    : (currentIndex >= N ? 0 : currentIndex);

  return (
    <div
      className={`training-slider-wrap ${isCertificate ? 'is-certificate-wrap' : ''} slide-${direction}`}
      onClick={() => onZoom(photoList[displayIndex])}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={
        isPublication
          ? `Klik untuk melihat artikel publikasi (Geser ke ${direction === 'right' ? 'kanan' : 'kiri'} otomatis)`
          : isCertificate
          ? `Klik untuk memperbesar sertifikat (Geser ke ${direction === 'right' ? 'kanan' : 'kiri'} otomatis)`
          : `Klik untuk memperbesar foto (Geser ke ${direction === 'right' ? 'kanan' : 'kiri'} otomatis)`
      }
    >
      <div className={`training-slider-media ${isCertificate ? 'certificate-media-canvas' : ''}`}>
        {/* Horizontal Sliding Track: all photos rendered side-by-side */}
        <div
          className="training-slider-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning
              ? 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)'
              : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedList.map((photo, idx) => (
            <div key={idx} className="training-slider-slide">
              <img
                src={photo}
                alt={`${title} - Foto ${(idx % photoList.length) + 1}`}
                className={`training-slider-photo ${isCertificate ? 'photo-certificate' : ''}`}
                loading="eager"
                draggable="false"
              />
            </div>
          ))}
        </div>

        {/* Multi-Photo Navigation Controls */}
        {photoList.length > 1 ? (
          <>
            <button
              className="training-nav-btn prev"
              onClick={handlePrev}
              aria-label="Previous photo"
              title="Sebelumnya"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="training-nav-btn next"
              onClick={handleNext}
              aria-label="Next photo"
              title="Selanjutnya"
            >
              <ChevronRight size={18} />
            </button>

            {/* Counter Pill */}
            <div className="training-slider-badge">
              <span>{displayIndex + 1} / {photoList.length} {isPublication ? 'Publikasi' : isCertificate ? 'Sertifikat' : 'Foto'}</span>
            </div>

            {/* Interactive Dots */}
            <div className="training-slider-dots">
              {photoList.map((_, idx) => (
                <button
                  key={idx}
                  className={`training-dot-pill ${idx === displayIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDotClick(idx);
                  }}
                  aria-label={`Lihat slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        ) : isCertificate ? (
          <div className="training-slider-badge">
            <span>{isPublication ? 'Publikasi Jurnal' : 'Sertifikat Resmi'}</span>
          </div>
        ) : null}

        {/* Hover Zoom Overlay */}
        <div className="training-slider-hover-overlay">
          <ZoomIn size={22} />
          <span>{isPublication ? 'Buka Publikasi Jurnal' : isCertificate ? 'Perbesar Sertifikat' : 'Lihat Foto Penuh'}</span>
        </div>
      </div>
    </div>
  );
}

// Training Info Column (Header with Title & Date, Org, Desc, Action Links)
function TrainingInfoCol({ item, onSelectCertificate }) {
  const isPub = item.category === 'publication' || item.isPublication;

  return (
    <div className="training-content-col">
      {item.badge && (
        <div className="training-badge-chip-wrap">
          <span className="mono-label training-badge-chip">{item.badge}</span>
        </div>
      )}

      <div className="training-title-date-row">
        <h3 className="training-entry-title">{item.title}</h3>
        <span className="training-entry-date">{item.date}</span>
      </div>

      <div className="training-entry-org">{item.organization}</div>

      <p className="training-entry-desc">{item.description}</p>

      {/* Action Links with External Arrow Icon */}
      <div className="training-entry-actions">
        {item.credentials && item.credentials.length > 0 ? (
          <>
            {item.credentials.map((cred, cIdx) => (
              <button
                key={cIdx}
                className="training-action-link"
                onClick={() =>
                  onSelectCertificate({
                    title: `${cred.title} — ${cred.org || (item.id === 't-sololearn' ? 'SoloLearn' : item.id === 't-hackerrank' ? 'HackerRank' : item.organization)}`,
                    organization: cred.org || item.organization,
                    year: cred.date || item.date,
                    description:
                      cred.description ||
                      (isPub
                        ? `Publikasi artikel ilmiah resmi: ${cred.title}.`
                        : `Sertifikasi resmi yang memvalidasi kompetensi dalam ${cred.title}.`),
                    badge: cred.badge || (isPub ? 'Verified Publication' : 'Verified Credential'),
                    image: cred.image,
                    verifyUrl: cred.verifyUrl,
                    verifyLabel: cred.verifyLabel,
                    isPublication: isPub,
                    certificatePages: item.certificatePages || null,
                  })
                }
                title={`Lihat Detail & Laman: ${cred.title}`}
              >
                <span>{cred.shortTitle || cred.title}</span>
                <ExternalLink size={14} />
              </button>
            ))}

            <button
              className="training-action-link"
              style={{ color: '#06b6d4', fontWeight: 800 }}
              onClick={() =>
                onSelectCertificate({
                  title: item.title,
                  organization: item.organization,
                  year: item.date,
                  description: item.description,
                  badge: item.badge || item.certificateLabel,
                  image:
                    (item.certificatePages && item.certificatePages[0]) ||
                    (item.images && item.images[0]),
                  certificatePages: item.certificatePages || null,
                  credentials: item.credentials || null,
                  isPublication: isPub,
                })
              }
              title={isPub ? 'Lihat semua publikasi dalam 1 tampilan modal' : 'Lihat semua sertifikat dalam 1 tampilan'}
            >
              <span>{item.certificateLabel || (isPub ? 'LIHAT SEMUA PUBLIKASI' : 'Lihat Semua Sertifikat')}</span>
              <ExternalLink size={14} />
            </button>
          </>
        ) : (
          <>
            {item.certificateLabel && (
              <button
                className="training-action-link"
                onClick={() =>
                  onSelectCertificate({
                    title: item.title,
                    organization: item.organization,
                    year: item.date,
                    description: item.description,
                    badge: item.badge || item.certificateLabel,
                    image:
                      (item.certificatePages && item.certificatePages[0]) ||
                      (item.images && item.images[0]) ||
                      '/training-presentation.jpg',
                    certificatePages: item.certificatePages || null,
                    credentials: item.credentials || null,
                    isPublication: isPub,
                  })
                }
              >
                <span>{item.certificateLabel}</span>
                <ExternalLink size={14} />
              </button>
            )}

            {item.secondaryLabel && (
              <button
                className="training-action-link"
                onClick={() =>
                  onSelectCertificate({
                    title: item.title,
                    organization: item.organization,
                    year: item.date,
                    description: item.description,
                    badge: item.secondaryLabel,
                    image:
                      (item.images && item.images[1]) ||
                      (item.images && item.images[0]) ||
                      '/awards-hackathon.jpg',
                    credentials: item.credentials || null,
                    isPublication: isPub,
                  })
                }
              >
                <span>{item.secondaryLabel}</span>
                <ExternalLink size={14} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Trainings({ onSelectCertificate }) {
  const handleZoomItem = (item, imgUrl) => {
    const isPub = item.category === 'publication' || item.isPublication;
    const matchedCred = item.credentials && item.credentials.find((c) => c.image === imgUrl);
    if (matchedCred) {
      onSelectCertificate({
        title: `${matchedCred.title} — ${matchedCred.org || (item.id === 't-sololearn' ? 'SoloLearn' : item.id === 't-hackerrank' ? 'HackerRank' : item.organization)}`,
        organization: matchedCred.org || item.organization,
        year: matchedCred.date || item.date,
        description:
          matchedCred.description ||
          (isPub
            ? `Publikasi artikel ilmiah resmi: ${matchedCred.title}.`
            : `Sertifikasi resmi yang memvalidasi kompetensi ${matchedCred.title}.`),
        badge: matchedCred.badge || (isPub ? 'Verified Publication' : 'Verified Credential'),
        image: matchedCred.image,
        verifyUrl: matchedCred.verifyUrl,
        verifyLabel: matchedCred.verifyLabel,
        isPublication: isPub,
        certificatePages: item.certificatePages || null,
      });
    } else {
      onSelectCertificate({
        title: item.title,
        organization: item.organization,
        year: item.date,
        description: item.description,
        badge: item.badge || item.certificateLabel,
        image: imgUrl,
        certificatePages: item.certificatePages || null,
        credentials: item.credentials || null,
        isPublication: isPub,
      });
    }
  };

  return (
    <section className="section-container" id="trainings">
      <div className="section-header reveal">
        <span className="section-tag">EXPERIENCE, PUBLICATIONS &amp; SEMINARS</span>
        <h2 className="section-title">
          <TypewriterText text="Trainings &amp; Hackathons" />
        </h2>
        <p className="section-desc">
          Program magang profesional, pengabdian masyarakat, publikasi jurnal ilmiah terakreditasi nasional (SINTA), sertifikasi standar industri, serta rangkaian seminar nasional &amp; kuliah umum Universitas Pamulang bersama para pakar teknologi.
        </p>
      </div>

      {/* Alternating 2-Column Zig-Zag Rows */}
      <div className="trainings-alternating-container">
        {trainings.map((item, index) => {
          const isEven = index % 2 === 0;
          const isPub = item.category === 'publication' || item.isPublication;
          const isCert = item.isCertificate || item.category === 'seminar' || isPub;

          const photoDirection = isEven ? 'right' : 'left';

          return (
            <div
              key={item.id}
              className={`training-alternating-row reveal ${isEven ? 'row-even photo-left' : 'row-odd photo-right'}`}
            >
              {isEven ? (
                <>
                  <div className="training-grid-media">
                    <TrainingPhotoSlider
                      images={item.images}
                      title={item.title}
                      direction={photoDirection}
                      isCertificate={isCert}
                      isPublication={isPub}
                      onZoom={(imgUrl) => handleZoomItem(item, imgUrl)}
                    />
                  </div>
                  <div className="training-grid-text">
                    <TrainingInfoCol
                      item={item}
                      onSelectCertificate={onSelectCertificate}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="training-grid-text">
                    <TrainingInfoCol
                      item={item}
                      onSelectCertificate={onSelectCertificate}
                    />
                  </div>
                  <div className="training-grid-media">
                    <TrainingPhotoSlider
                      images={item.images}
                      title={item.title}
                      direction={photoDirection}
                      isCertificate={isCert}
                      isPublication={isPub}
                      onZoom={(imgUrl) => handleZoomItem(item, imgUrl)}
                    />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
