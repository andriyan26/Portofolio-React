import React from 'react';
import { ExternalLink, Award, Trophy, Medal, Star, ZoomIn } from 'lucide-react';
import { awards } from '../data/portfolioData';
import TypewriterText from './TypewriterText';

export default function Awards({ onSelectAward }) {
  const getAwardIcon = (index) => {
    switch (index) {
      case 0:
        return <Trophy size={20} color="#f59e0b" />;
      case 1:
        return <Award size={20} color="#0284c7" />;
      case 2:
        return <Medal size={20} color="#10b981" />;
      default:
        return <Star size={20} color="#8b5cf6" />;
    }
  };

  // 5 Real Photographic Evidences from User
  const awardPhotos = [
    {
      id: 1,
      src: '/award-1.jpg',
      alt: 'Wisudawan Terbaik Wisuda Ke-130 Universitas Pamulang',
      badge: 'Wisudawan Terbaik Wisuda 130',
      awardIndex: 0,
      gridClass: 'item-featured',
    },
    {
      id: 2,
      src: '/award-2.jpg',
      alt: 'Award & Rekognisi Magang Pusdiklat BPS RI',
      badge: 'Magang Pusdiklat BPS RI',
      awardIndex: 1,
      gridClass: 'item-top-right',
    },
    {
      id: 3,
      src: '/award-3.jpg',
      alt: 'Pemberian Award PKM Mahasiswa Teknik Informatika',
      badge: 'Award PKM Mahasiswa',
      awardIndex: 2,
      gridClass: 'item-mid-right',
    },
    {
      id: 5,
      src: '/award-5.jpg',
      alt: 'Selebrasi IPK Terbaik S1 Wisuda Ke-130',
      badge: 'IPK Terbaik S1 UNPAM',
      awardIndex: 0,
      gridClass: 'item-bottom-left',
    },
    {
      id: 4,
      src: '/award-4.jpg',
      alt: 'Prodi Teknik Informatika Fakultas Ilmu Komputer UNPAM',
      badge: 'Teknik Informatika UNPAM',
      awardIndex: 3,
      gridClass: 'item-bottom-right',
    },
  ];

  return (
    <section className="section-container" id="awards">
      <div className="section-header reveal">
        <span className="section-tag">RECOGNITION</span>
        <h2 className="section-title">
          <TypewriterText text="Awards &amp; Achievements" />
        </h2>
        <p className="section-desc">
          Dokumentasi resmi penghargaan Wisudawan Terbaik S1, apresiasi Pusdiklat BPS RI, dan rekognisi program PKM.
        </p>
      </div>

      <div className="awards-grid">
        {/* Left: 5 Real Photographic Collage Gallery */}
        <div className="awards-collage-card reveal delay-1">
          <div className="awards-photo-collage-5">
            {awardPhotos.map((photo) => (
              <div
                key={photo.id}
                className={`collage-img-wrap-5 ${photo.gridClass}`}
                onClick={() =>
                  onSelectAward(
                    awards[photo.awardIndex] || {
                      title: photo.alt,
                      organization: 'Universitas Pamulang & Mitra',
                      year: '2026',
                      badge: photo.badge,
                      image: photo.src,
                      description: 'Dokumentasi resmi rekognisi dan penghargaan prestasi.',
                    }
                  )
                }
                title="Klik untuk melihat foto & sertifikat penghargaan"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="collage-photo-5"
                  loading="lazy"
                />
                <div className="collage-photo-badge">
                  <span>{photo.badge}</span>
                </div>
                <div className="collage-photo-hover-overlay">
                  <ZoomIn size={20} color="#ffffff" />
                  <span>Lihat Detail</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Awards Interactive Rich Cards */}
        <div className="awards-list-col reveal delay-2">
          {awards.map((item, index) => (
            <div
              key={item.id}
              className="award-rich-card"
              onClick={() => onSelectAward(item)}
              title="Klik untuk melihat sertifikat penghargaan resmi"
            >
              {/* Card Top Row: Icon + Badge + Date + Action */}
              <div className="award-card-header">
                <div className="award-card-identity">
                  <div
                    className="award-card-icon-squircle"
                    style={{
                      background: `rgba(${index === 0 ? '245, 158, 11' : index === 1 ? '2, 132, 199' : index === 2 ? '16, 185, 129' : '139, 92, 246'}, 0.12)`,
                      borderColor: `rgba(${index === 0 ? '245, 158, 11' : index === 1 ? '2, 132, 199' : index === 2 ? '16, 185, 129' : '139, 92, 246'}, 0.35)`,
                    }}
                  >
                    {getAwardIcon(index)}
                  </div>
                  <span
                    className="award-card-badge-pill"
                    style={{
                      borderColor: `rgba(${index === 0 ? '245, 158, 11' : index === 1 ? '2, 132, 199' : index === 2 ? '16, 185, 129' : '139, 92, 246'}, 0.35)`,
                      color: index === 0 ? '#f59e0b' : index === 1 ? '#38bdf8' : index === 2 ? '#34d399' : '#c084fc',
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                <div className="award-card-right-meta">
                  <span className="award-card-year">{item.year}</span>
                  <div className="award-card-arrow-pill">
                    <ExternalLink size={13} />
                  </div>
                </div>
              </div>

              {/* Card Body: Title & Organization */}
              <div className="award-card-body">
                <h4 className="award-card-title">{item.title}</h4>
                <div className="award-card-org">{item.organization}</div>
                {item.summary && (
                  <p className="award-card-summary">{item.summary}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
