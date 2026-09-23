import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Coffee } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function CoffeeWidget() {
  const [count, setCount] = useState(personalData.coffeeCount);
  const [isBumping, setIsBumping] = useState(false);

  const handleCoffeeClick = (e) => {
    setCount((prev) => prev + 1);
    setIsBumping(true);
    setTimeout(() => setIsBumping(false), 300);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 24,
      spread: 50,
      origin: { x, y },
      colors: ['#f59e0b', '#d97706', '#b45309', '#ffffff'],
    });
  };

  return (
    <div
      className={`coffee-badge-widget ${isBumping ? 'bumping' : ''}`}
      onClick={handleCoffeeClick}
      title="Traktir secangkir kopi untuk Andrian! ☕"
    >
      <Coffee size={18} color="#f59e0b" />
      <span className="coffee-text">Get me a coffee</span>
      <span className="coffee-count-pill">{count}</span>
    </div>
  );
}
