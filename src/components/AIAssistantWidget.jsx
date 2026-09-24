import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Minus, RotateCcw, Bot, User, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import {
  personalData,
  techStack,
  capabilities,
  selectedProjects,
  technicalArchive,
  awards,
  trainings,
} from '../data/portfolioData';

// Knowledge Base Responder Engine
function generateAIResponse(userText) {
  const query = userText.toLowerCase().trim();

  // 1. Greetings
  if (/^(halo|hai|hey|hi|hello|selamat|assalamualaikum|pagi|siang|sore|malam|tes|test|ping)/i.test(query)) {
    return {
      text: `Halo! Senang bisa menyapa Anda 👋 Saya adalah Asisten AI Andrian. Ada yang ingin Anda ketahui tentang latar belakang, proyek unggulan, keahlian teknis (tech stack), atau cara bekerja sama dengan Andrian?`,
      chips: ['Unduh CV / Resume', 'Siapa itu Andrian?', 'Tech Stack & Keahlian', 'Proyek Unggulan'],
    };
  }

  // 1.5 CV / Resume Inquiry & Direct Download
  if (/(cv|resume|riwayat hidup|curriculum vitae|download cv|unduh cv|download resume|unduh resume|minta cv|berkas cv|pdf cv)/i.test(query)) {
    return {
      text: `📄 **Curriculum Vitae (CV) & Resume Resmi Andrian**

Dokumen CV resmi Andrian tersedia dalam format PDF lengkap dengan rincian:
• **Pendidikan**: Wisudawan Terbaik (IPK Tertinggi) S1 Teknik Informatika UNPAM.
• **Pengalaman**: Magang PUSDIKLAT Badan Pusat Statistik (BPS RI) & Ketua PKM.
• **Sertifikasi**: HackerRank Software Engineer & SoloLearn Certified Developer.
• **Publikasi Ilmiah**: 3x Publikasi Jurnal Nasional Terakreditasi SINTA (JUKTISI & BIIKMA).
• **Keahlian**: React, Laravel, PHP, Python, Django, OpenCV, MySQL, Software QA.

👉 [**Unduh CV Lengkap Andrian (PDF)**](/CV-ANDRIAN.pdf)`,
      chips: ['Prestasi & Penghargaan', 'Tech Stack & Keahlian', 'Cara Menghubungi'],
    };
  }

  // 2. Who is Andrian / Bio / Identity
  if (/(siapa|who|latar belakang|profil|biodata|tentang|tentang andrian|biodata andrian|about|profil andrian)/i.test(query)) {
    return {
      text: `**${personalData.fullName}** adalah seorang **${personalData.degree}** (${personalData.major}) dengan fokus keahlian pada:
• **Software Engineering & Web Development** (Full-Stack)
• **Software Testing & Quality Assurance (QA)**
• **Manajemen Basis Data & Integrasi Sistem** (MySQL, Cloud, API)
• **Solusi Berbasis Perangkat Keras & IoT** (RFID, OpenCV, QR Code)
• **Implementasi Alur Kerja AI (Artificial Intelligence)**

Andrian telah menyelesaikan **${personalData.stats.projects} proyek digital**, meraih **${personalData.stats.certificates} sertifikasi kompetensi & penghargaan**, dan memiliki dedikasi tinggi dalam memecahkan masalah nyata menjadi sistem yang handal.`,
      chips: ['Tech Stack & Keahlian', 'Proyek Unggulan', 'Prestasi & Penghargaan'],
    };
  }

  // 3. Education / Graduation / Wisudawan Terbaik
  if (/(kuliah|pendidikan|universitas|kampus|lulus|lulusan|s1|jurusan|ipk|wisuda|wisuda 130|wisudawan terbaik|akademik|education)/i.test(query)) {
    return {
      text: `Latar belakang pendidikan & prestasi akademik Andrian:
• **Gelar**: ${personalData.degree} (${personalData.major})
• **Predikat Kehormatan**: Dianugerahi Piagam Penghargaan sebagai **Wisudawan Terbaik (IPK Tertinggi)** pada **Wisuda Ke-130 Universitas Pamulang** (13 September 2026).
• **Magang Terakreditasi**: Menyelesaikan program magang bergengsi di **Pusat Pendidikan dan Pelatihan Badan Pusat Statistik (PUSDIKLAT BPS RI)**.
• **Pengabdian Masyarakat (PKM)**: Menerima plakat & award apresiasi atas kontribusi program **PKM Mahasiswa Teknik Informatika**.
• **Tugas Akhir / Capstone**: Meraih predikat **Best Capstone Research Paper** & **Best Capstone System Implementation** melalui riset pemantauan siswa berbasis RFID dan Computer Vision (OpenCV).`,
      chips: ['Award Wisudawan Terbaik', 'Award Magang BPS', 'Award PKM Mahasiswa'],
    };
  }

  // 4. Tech Stack / Skills / Languages
  if (/(tech stack|teknologi|bahasa|keahlian|skill|framework|database|backend|frontend|tools|programming)/i.test(query)) {
    const expertTech = techStack.filter((t) => t.level === 'Expert').map((t) => t.name).join(', ');
    const advTech = techStack.filter((t) => t.level === 'Advanced').map((t) => t.name).join(', ');
    const interTech = techStack.filter((t) => t.level === 'Intermediate').map((t) => t.name).join(', ');

    return {
      text: `Keahlian teknis dan perangkat teknologi yang dikuasai Andrian:

• 🚀 **Expert / Mahir**:
  ${expertTech}
• ⚡ **Advanced / Sangat Berpengalaman**:
  ${advTech}
• 🛠️ **Intermediate / Praktik Sistem**:
  ${interTech}

Spesialisasi mencakup arsitektur web modern (React, Laravel, Django), integrasi database relasional yang aman, pembuatan RESTful API, hingga integrasi kamera OpenCV & pembaca RFID.`,
      chips: ['Proyek Posyandu KNN', 'Proyek Rental Kamera', 'Proyek RFID Capstone'],
    };
  }

  // 5. Specific: Posyandu Belimbing (KNN)
  if (/(posyandu|knn|belimbing|stunting|gizi|balita|machine learning|ml)/i.test(query)) {
    const p = selectedProjects.find((proj) => proj.id === 'posyandu-belimbing') || selectedProjects[0];
    return {
      text: `🩺 **${p.title}**

• **Deskripsi**: Sistem web klasifikasi status gizi balita menggunakan algoritma Machine Learning **K-Nearest Neighbor (KNN)** untuk mendeteksi stunting dan gizi buruk secara otomatis.
• **Standar**: Mengikuti standar antropometri **WHO & Kemenkes RI** (indikator BB/U, TB/U, BB/TB).
• **Teknologi**: ${p.architecture}
• **Fitur Unggulan**: Analitik grafik tumbuh kembang, pencatatan rekam medis & imunisasi balita, cetak otomatis laporan KMS (Kartu Menuju Sehat).
• **Status**: Live Production Web & diuji langsung pada posyandu.`,
      chips: ['Lihat Proyek Rental Kamera', 'Lihat Proyek RFID Capstone', 'Arsip Proyek Lainnya'],
    };
  }

  // 6. Specific: Rental Kamera
  if (/(kamera|rental|sewa|booking|kancil|fotografi)/i.test(query)) {
    const p = selectedProjects.find((proj) => proj.id === 'rental-kamera') || selectedProjects[1];
    return {
      text: `📷 **${p.title}**

• **Deskripsi**: Platform web pemesanan dan manajemen persewaan kamera serta perlengkapan fotografi premium.
• **Teknologi**: ${p.architecture}
• **Fitur Unggulan**:
  1. Katalog interaktif unit kamera (DSLR, Mirrorless, Cinema), lensa, dan stabilizer.
  2. Booking jadwal ketersediaan alat secara real-time.
  3. Verifikasi identitas jaminan penyewa (KTP / SIM).
  4. Invoice digital dan notifikasi konfirmasi WhatsApp otomatis.
  5. Dashboard admin pemantauan perawatan alat dan pendapatan sewa.`,
      chips: ['Proyek Posyandu KNN', 'Proyek RFID Capstone', 'Tech Stack & Keahlian'],
    };
  }

  // 7. Specific: JOBTRACKR
  if (/(jobtrackr|job\s*track|lamaran|karir|career|interview|gmail sync|pipeline)/i.test(query)) {
    const p = selectedProjects.find((proj) => proj.id === 'jobtrackr') || selectedProjects[2];
    return {
      text: `💼 **${p.title}**

• **Deskripsi**: Platform pelacak lamaran kerja cerdas dengan command center operasional, pipeline status karir terpadu, dan sinkronisasi Gmail.
• **Status**: Live Hosted Web 👉 [Kunjungi JOBTRACKR](https://jobtrackrandrian.tplp004.com/)
• **Teknologi**: ${p.architecture}
• **Fitur Unggulan**:
  1. Operations Dashboard terpusat dengan ringkasan status 48+ lamaran secara real-time.
  2. Multi-stage Pipeline & Career Journey (Applied, Interview, Offer, Rejected).
  3. Metrik analitik: Interview Rate, Offer Success Rate, dan No Response Follow-up.
  4. Sinkronisasi akun Gmail untuk deteksi otomatis pembaruan email rekruter.
  5. Kalender penjadwalan interview kerja terintegrasi.`,
      chips: ['Proyek NEXORA', 'Proyek Posyandu KNN', 'Proyek Rental Kamera'],
    };
  }

  // 8. Specific: NEXORA IT Portal
  if (/(nexora|portal|nora\s*ai|tiket|ticketing|it support|registrasi)/i.test(query)) {
    const p = selectedProjects.find((proj) => proj.id === 'nexora') || selectedProjects[3];
    return {
      text: `🛡️ **${p.title}**

• **Deskripsi**: Portal autentikasi dan registrasi enterprise terenkripsi SSL 256-bit yang menghubungkan karyawan ke tiket IT dan asisten cerdas NORA AI.
• **Status**: Live Hosted Web 👉 [Kunjungi Portal NEXORA](https://nexora-andrian.tplp004.com/login)
• **Teknologi**: ${p.architecture}
• **Fitur Unggulan**:
  1. Sistem autentikasi masuk & registrasi karyawan terenkripsi SSL 256-bit.
  2. Integrasi asisten cerdas NORA AI untuk penanganan dan klasifikasi tiket IT otomatis.
  3. Manajemen tiket dukungan infrastruktur IT korporat.
  4. Verifikasi sesi login aman (remember session) dan pemulihan kata sandi.
  5. Antarmuka modern glassmorphic dengan mode gelap & terang.`,
      chips: ['Proyek Memento AI', 'Proyek Learnova AI', 'Proyek JOBTRACKR'],
    };
  }

  // 9. Specific: MEMENTO AI (Diary & Life Story Vault)
  if (/(memento|diary|jurnal|memori|kenangan|kisah hidup|sentiment)/i.test(query)) {
    const p = selectedProjects.find((proj) => proj.id === 'memento-ai') || selectedProjects[4];
    return {
      text: `📖 **${p.title}**

• **Deskripsi**: Platform brankas memori dan jurnal digital berbasis AI cerdas untuk merangkum goresan pikiran menjadi arsip kenangan abadi, analisis wawasan emosi, dan rak buku kenangan interaktif.
• **Status**: Live Hosted Web 👉 [Kunjungi Memento AI](https://diaryandrian.tplp004.com/)
• **Teknologi**: ${p.architecture}
• **Fitur Unggulan**:
  1. Brankas memori digital & editor jurnal interaktif dengan rich storytelling.
  2. Wawasan AI & analisis sentimen refleksi emosional pengguna.
  3. Garis waktu (timeline) kenangan terstruktur & pengingat kilas balik.
  4. Galeri rak buku kenangan berdasar suasana hati (Lega, Perenungan, Syukur, Teduh).
  5. Mode gelap / terang elegan dengan audio relaksasi penenang pikiran.`,
      chips: ['Proyek Learnova AI', 'Proyek JOBTRACKR', 'Proyek Posyandu KNN'],
    };
  }

  // 10. Specific: LEARNOVA AI (Corporate EdTech & RAG Platform)
  if (/(learnova|edtech|corporate learning|sop internal|rag|nova ai|pelatihan)/i.test(query)) {
    const p = selectedProjects.find((proj) => proj.id === 'learnova-ai') || selectedProjects[5];
    return {
      text: `🚀 **${p.title}**

• **Deskripsi**: Platform pembelajaran korporat berbasis Retrieval-Augmented Generation (RAG v2.4) dan AI Agent Nova yang menyajikan alur belajar adaptif terhubung ke 14 SOP internal perusahaan.
• **Status**: Live Hosted Web 👉 [Kunjungi Learnova AI](https://learnovandrian.tplp004.com/)
• **Teknologi**: ${p.architecture}
• **Fitur Unggulan**:
  1. Sistem RAG Aktif v2.4 terhubung langsung ke basis pengetahuan 14 SOP internal korporat.
  2. Alur belajar adaptif berbasis target kompetensi (cth: Junior DevOps Engineer).
  3. Asisten Belajar AI Nova untuk konsultasi teknis dan bimbingan kurikulum cerdas.
  4. Kuis evaluasi otomatis dengan pelacakan pemahaman materi dan streak belajar.
  5. Pencarian universal dokumen & SOP internal berbasis vector search shortcut (⌘K).`,
      chips: ['Proyek Memento AI', 'Proyek NEXORA', 'Proyek JOBTRACKR'],
    };
  }

  // 11. General Projects / Portfolio
  if (/(proyek|project|karya|portofolio|portfolio|aplikasi|sistem|app)/i.test(query)) {
    return {
      text: `Andrian memiliki **20+ proyek sistem informasi & aplikasi digital teruji**. 6 Proyek Unggulan Teratas di Galeri:

1. 🩺 **Posyandu Belimbing (ML KNN)**: Klasifikasi status gizi balita & stunting standar WHO. 👉 [Live Web](https://posyandubelimbing.tplp004.com/)
2. 📷 **Kancil Rental Kamera**: Platform booking online dan manajemen inventaris fotografi. 👉 [Live Web](https://rentalkamera.tplp004.com/)
3. 💼 **JOBTRACKR**: Operations dashboard pelacak lamaran kerja & Gmail sync. 👉 [Live Web](https://jobtrackrandrian.tplp004.com/)
4. 🛡️ **NEXORA**: Enterprise IT support portal terenkripsi SSL 256-bit & NORA AI. 👉 [Live Web](https://nexora-andrian.tplp004.com/login)
5. 📖 **MEMENTO AI**: Brankas memori & jurnal AI — Turn your thoughts into memories. 👉 [Live Web](https://diaryandrian.tplp004.com/)
6. 🚀 **LEARNOVA AI**: Agentic Corporate Learning Platform berbasis RAG v2.4 & AI Nova. 👉 [Live Web](https://learnovandrian.tplp004.com/)`,
      chips: ['Detail Memento AI', 'Detail Learnova AI', 'Detail JOBTRACKR', 'Lihat Arsip 20+ Proyek'],
    };
  }

  // 10. Awards & Honors
  if (/(penghargaan|prestasi|juara|award|lomba|hackathon|honor|pemenang)/i.test(query)) {
    const list = awards.map((a) => `• 🏆 **${a.title}** (${a.year})\n  _${a.organization}_ - ${a.description}`).join('\n\n');
    return {
      text: `Penghargaan yang telah diraih oleh Andrian:\n\n${list}`,
      chips: ['Sertifikasi & Pelatihan', 'Pendidikan & Kelulusan', 'Proyek Unggulan'],
    };
  }

  // 11. Trainings & Certifications
  if (/(sertifikat|pelatihan|training|sertifikasi|workshop|dict|ctf|cybersecurity)/i.test(query)) {
    const list = trainings.slice(0, 3).map((t) => `• 📜 **${t.title}**\n  _${t.organization}_ (${t.date})\n  ${t.description}`).join('\n\n');
    return {
      text: `Sertifikasi & Pelatihan Kompetensi Andrian:\n\n${list}\n\n_Dan masih banyak pelatihan kompetensi teknis lainnya._`,
      chips: ['Prestasi & Penghargaan', 'Tech Stack & Keahlian', 'Siapa itu Andrian?'],
    };
  }

  // 12. Contact / Hiring / Work / Availability
  if (/(kontak|hubungi|contact|hire|kerja|freelance|rekrut|email|telepon|wa|whatsapp|linkedin|github|tersedia)/i.test(query)) {
    return {
      text: `🤝 **Andrian siap bekerja sama!**

• **Status**: ${personalData.status} (Terbuka untuk posisi Full-time, Kontrak, maupun Proyek Freelance).
• **Email**: [${personalData.email}](mailto:${personalData.email})
• **LinkedIn**: [${personalData.linkedinUsername}](${personalData.linkedin})
• **GitHub**: [${personalData.githubUsername}](${personalData.github})

Anda juga dapat mengirimkan pesan langsung kepada Andrian melalui tombol **"Hire Me"** di sudut kanan atas portofolio ini!`,
      chips: ['Siapa itu Andrian?', 'Proyek Unggulan', 'Tech Stack & Keahlian'],
    };
  }

  // 13. Capstone
  if (/(capstone|tugas akhir|skripsi|thesis)/i.test(query)) {
    return {
      text: `Tugas Akhir / Capstone Andrian berjudul:
**"RFID-Based CPSC Student Monitoring System with Automated Photo Capture and Email Notification"**

Riset ini berhasil menyabet dua penghargaan sekaligus:
1. 🥇 **Best Capstone Research Paper** pada *Informatics Research Colloquium 2026*
2. 🏆 **Best Capstone System Implementation** pada *Annual Tech Innovation Expo*

Sistem mengintegrasikan pembaca kartu RFID (<300ms response), auto-capture foto kamera OpenCV untuk verifikasi kehadiran, notifikasi instan SMTP ke orang tua, serta backup data log otomatis ke Google Drive.`,
      chips: ['Detail RFID Capstone', 'Prestasi Lainnya', 'Cara Menghubungi'],
    };
  }

  // 14. Fallback / Default intelligent response
  return {
    text: `Terima kasih atas pertanyaannya! Sebagai asisten AI Andrian, saya memiliki data lengkap tentang:
• **Profil & Latar Belakang Andrian** (S1 Teknik Informatika)
• **Keahlian & Tech Stack** (React, Laravel, Python, MySQL, RFID, AI)
• **Proyek Nyata** (Posyandu KNN, Rental Kamera, Absensi RFID OpenCV, dsb.)
• **Prestasi & Sertifikat** (Best Capstone, Dean's Lister, Hackathon)
• **Kontak & Peluang Kerja Sama**

Silakan pilih topik di bawah ini atau ketikkan pertanyaan spesifik Anda:`,
    chips: ['Siapa itu Andrian?', 'Tech Stack & Keahlian', 'Proyek Unggulan', 'Cara Menghubungi'],
  };
}

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Halo! 👋 Saya **Asisten AI Andrian**.\nAda yang ingin Anda ketahui tentang profil, keahlian teknis (tech stack), proyek unggulan, atau cara bekerja sama dengan Andrian?`,
      chips: ['Siapa itu Andrian?', 'Tech Stack & Keahlian', 'Proyek Unggulan', 'Cara Menghubungi'],
      time: 'Baru saja',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = (textToSend) => {
    const question = (typeof textToSend === 'string' ? textToSend : inputValue).trim();
    if (!question) return;

    // Append user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate intelligent thinking & typing
    setTimeout(() => {
      const response = generateAIResponse(question);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        chips: response.chips,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: `Percakapan telah direset. Halo! 👋 Ada hal lain seputar Andrian yang ingin Anda ketahui?`,
        chips: ['Siapa itu Andrian?', 'Tech Stack & Keahlian', 'Proyek Unggulan', 'Cara Menghubungi'],
        time: 'Baru saja',
      },
    ]);
  };

  // Helper to render bold markdown and clickable links in AI responses
  const renderFormattedText = (raw) => {
    if (!raw) return null;
    const lines = raw.split('\n');

    return lines.map((line, lineIdx) => {
      // Parse markdown-style links [text](url) and bold text **text**
      const parts = [];
      let lastIndex = 0;
      const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|_.*?_)/g;
      let match;

      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }

        const matchText = match[0];
        if (matchText.startsWith('[') && matchText.includes('](')) {
          const title = matchText.substring(1, matchText.indexOf(']('));
          const url = matchText.substring(matchText.indexOf('](') + 2, matchText.length - 1);
          const isPdf = url.endsWith('.pdf');
          parts.push(
            <a
              key={match.index}
              href={url}
              download={isPdf ? 'CV ANDRIAN.pdf' : undefined}
              target={url.startsWith('http') || isPdf ? '_blank' : undefined}
              rel={url.startsWith('http') || isPdf ? 'noopener noreferrer' : undefined}
              className="ai-link"
              title={isPdf ? 'Klik untuk langsung mengunduh CV (PDF)' : undefined}
            >
              {title}
            </a>
          );
        } else if (matchText.startsWith('**') && matchText.endsWith('**')) {
          parts.push(
            <strong key={match.index}>
              {matchText.substring(2, matchText.length - 2)}
            </strong>
          );
        } else if (matchText.startsWith('_') && matchText.endsWith('_')) {
          parts.push(
            <em key={match.index}>
              {matchText.substring(1, matchText.length - 1)}
            </em>
          );
        }

        lastIndex = regex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      return (
        <span key={lineIdx} style={{ display: 'block', minHeight: line.trim() ? 'auto' : '8px' }}>
          {parts.length > 0 ? parts : line}
        </span>
      );
    });
  };

  return (
    <>
      {/* 1. Floating Pill Trigger Button (Replacing Coffee Widget at Bottom-Left) */}
      {!isOpen && (
        <button
          className="ai-widget-trigger-pill"
          onClick={() => setIsOpen(true)}
          title="Tanya AI tentang Andrian! 🤖"
          aria-label="Buka Asisten AI Andrian"
        >
          <div className="ai-trigger-avatar-wrapper">
            <img
              src="/Poto.png"
              alt="Andrian AI"
              className="ai-trigger-avatar"
            />
            <span className="ai-pulse-dot" />
          </div>

          <div className="ai-trigger-label-group">
            <span className="ai-trigger-title">Tanya AI Andrian</span>
            <span className="ai-trigger-subtitle">
              <Sparkles size={11} className="ai-sparkle-icon" /> Asisten Virtual
            </span>
          </div>

          <div className="ai-trigger-badge">
            <span>Online</span>
          </div>
        </button>
      )}

      {/* 2. Interactive AI Chat Window Modal */}
      {isOpen && (
        <div className={`ai-chat-window ${isMinimized ? 'minimized' : ''}`}>
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-header-left">
              <div className="ai-header-avatar-wrap">
                <img src="/Poto.png" alt="Andrian" className="ai-header-avatar" />
                <span className="ai-online-indicator" />
              </div>
              <div className="ai-header-text">
                <div className="ai-header-title-row">
                  <h4>Andrian AI</h4>
                  <span className="ai-bot-chip">
                    <Sparkles size={10} />
                    <span>IA Assistant</span>
                  </span>
                </div>
                <p className="ai-header-status">Siap menjawab seputar profil & proyek</p>
              </div>
            </div>

            <div className="ai-header-controls">
              <button
                className="ai-control-btn"
                onClick={handleResetChat}
                title="Reset Percakapan"
                aria-label="Reset Chat"
              >
                <RotateCcw size={14} />
              </button>
              <button
                className="ai-control-btn"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Perbesar' : 'Kecilkan'}
                aria-label="Minimize"
              >
                <Minus size={15} />
              </button>
              <button
                className="ai-control-btn close"
                onClick={() => setIsOpen(false)}
                title="Tutup Chat"
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          {!isMinimized && (
            <>
              <div className="ai-chat-body">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`ai-message-row ${msg.sender === 'user' ? 'user-row' : 'ai-row'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="ai-msg-avatar">
                        <Bot size={16} />
                      </div>
                    )}

                    <div className="ai-msg-bubble-wrapper">
                      <div className={`ai-msg-bubble ${msg.sender}`}>
                        <div className="ai-msg-text">
                          {renderFormattedText(msg.text)}
                        </div>
                      </div>

                      {/* Quick Chips suggestions attached to AI message */}
                      {msg.sender === 'ai' && msg.chips && msg.chips.length > 0 && (
                        <div className="ai-chips-list">
                          {msg.chips.map((chip, chipIdx) => (
                            <button
                              key={chipIdx}
                              className="ai-chip-btn"
                              onClick={() => handleSendMessage(chip)}
                            >
                              <span>{chip}</span>
                              <ArrowRight size={11} />
                            </button>
                          ))}
                        </div>
                      )}

                      <span className="ai-msg-timestamp">{msg.time}</span>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="ai-user-msg-avatar">
                        <User size={15} />
                      </div>
                    )}
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div className="ai-message-row ai-row">
                    <div className="ai-msg-avatar">
                      <Bot size={16} />
                    </div>
                    <div className="ai-typing-bubble">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                )}

                <div ref={chatMessagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form
                className="ai-chat-input-bar"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  className="ai-input-field"
                  placeholder="Tanya apa saja tentang Andrian..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  className="ai-send-btn"
                  disabled={!inputValue.trim() || isTyping}
                  aria-label="Kirim pertanyaan"
                  title="Kirim (Enter)"
                >
                  <Send size={15} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
