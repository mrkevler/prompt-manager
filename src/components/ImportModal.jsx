import React, { useState, useRef } from "react";

function ImportModal({ onImport, onClose }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".csv")) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      onImport(selectedFile);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-title"
    >
      <div className="modal import-modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2 id="import-title">Import promptów</h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Zamknij okno importu"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="modal-content">
          <div
            className={`drop-zone ${isDragging ? "dragging" : ""} ${
              selectedFile ? "has-file" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Przeciągnij plik CSV lub kliknij, aby wybrać"
            onKeyDown={(e) =>
              e.key === "Enter" && fileInputRef.current?.click()
            }
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".csv"
              hidden
              aria-hidden="true"
            />

            {selectedFile ? (
              <div className="selected-file">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 15L12 12L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="file-name">{selectedFile.name}</span>
                <span className="file-size">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
            ) : (
              <>
                <svg className="upload-icon" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17 8L12 3L7 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 3V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="drop-text">
                  {isDragging
                    ? "Upuść plik tutaj"
                    : "Przeciągnij plik CSV lub kliknij"}
                </p>
              </>
            )}
          </div>

          <div className="format-info">
            <h4>Wymagany format CSV:</h4>
            <code className="format-example">
              Kategoria główna,Kategoria,Akcja,Prompt
              <br />
              Dyrekcja,Strategia,Opracowanie kierunku,Przygotuj propozycję...
            </code>
            <p className="format-note">
              Pierwsza linia powinna zawierać nagłówki kolumn
            </p>
          </div>
        </div>

        <footer className="modal-footer">
          <button className="btn secondary" onClick={onClose}>
            Anuluj
          </button>
          <button
            className="btn primary"
            onClick={handleImport}
            disabled={!selectedFile}
          >
            Importuj
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ImportModal;
