import React, { useState } from 'react';
import { Minus, X, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MessageModal({ isOpen, onClose }) {
  const [minimized, setMinimized] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.85, y: 0.85 },
    });

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 2800);
  };

  return (
    <div className={`floating-msg-modal ${minimized ? 'minimized' : ''}`}>
      {/* Modal Header */}
      <div className="msg-modal-header">
        <h4>Send Me a Message</h4>
        <div className="msg-window-controls">
          <button
            className="msg-control-btn"
            onClick={() => setMinimized(!minimized)}
            aria-label={minimized ? 'Expand' : 'Minimize'}
            title={minimized ? 'Perbesar' : 'Kecilkan'}
          >
            <Minus size={16} />
          </button>
          <button
            className="msg-control-btn"
            onClick={onClose}
            aria-label="Close"
            title="Tutup"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Modal Body */}
      {!minimized && (
        <div className="msg-modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <CheckCircle2 size={42} color="#10b981" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ marginBottom: 6 }}>Pesan Terkirim!</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Terima kasih telah menghubungi Andrian. Saya akan segera merespons ke email Anda.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: 12 }}>
                <label>FULL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 12 }}>
                <label>EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 16 }}>
                <label>MESSAGE</label>
                <textarea
                  required
                  placeholder="Tell me about your project, idea, or inquiry..."
                  className="form-control"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="submit-msg-btn" style={{ width: '100%' }}>
                <span>SEND MESSAGE</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
