import React, { useState, useEffect } from 'react';

/**
 * TypewriterText:
 * Menghadirkan efek animasi teks ketik & hapus kontinu:
 * Terhapus dari ujung kanan, lalu muncul kembali dari ujung kiri satu per satu secara berulang.
 */
export default function TypewriterText({
  text,
  typingSpeed = 100,
  deletingSpeed = 48,
  pauseDelay = 2600,
  emptyDelay = 550,
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting) {
      // Sedang mengetik maju
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Teks sudah lengkap, jeda sejenak agar user bisa membaca dengan nyaman
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    } else {
      // Sedang menghapus mundur dari ujung kanan
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Teks sudah kosong, jeda singkat lalu mulai mengetik kembali dari ujung kiri
        timeout = setTimeout(() => {
          setIsDeleting(false);
        }, emptyDelay);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, text, typingSpeed, deletingSpeed, pauseDelay, emptyDelay]);

  return (
    <span className="typewriter-heading-wrap">
      <span>{displayText}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  );
}
