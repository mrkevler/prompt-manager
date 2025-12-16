import React from "react";

function WelcomeModal({ onImport, onClose }) {
  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="modal welcome-modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2 id="welcome-title">Witaj w Prompt Manager!</h2>
        </header>

        <div className="modal-content">
          <div className="welcome-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="welcome-text">
            Baza promptów jest pusta.
            <br />
            Czy chcesz zaimportować swój plik?
          </p>
        </div>

        <footer className="modal-footer welcome-footer">
          <button className="btn secondary" onClick={onClose}>
            Później
          </button>
          <button className="btn primary" onClick={onImport}>
            Importuj plik CSV
          </button>
        </footer>
      </div>
    </div>
  );
}

export default WelcomeModal;
