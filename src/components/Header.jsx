import React from "react";
import appIcon from "../assets/logo/polybrand-icon.png";

function Header({
  isEditMode,
  onToggleEdit,
  onShowSettings,
  onShowImport,
  onShowAdd,
  searchQuery,
  onSearchChange,
}) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="app-title">
          <img src={appIcon} alt="Prompt Manager" className="app-icon-img" />
          <h1>
            Prompt Manager <span className="by-author">by mrKevler</span>
          </h1>
        </div>
      </div>

      <div className="header-center">
        <div className="search-container">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M21 21L16.65 16.65"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Wyszukaj"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
            aria-label="Wyszukaj prompty"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => onSearchChange("")}
              aria-label="Wyczyść wyszukiwanie"
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
          )}
        </div>
      </div>

      <div className="header-right">
        <button
          className="header-btn"
          onClick={onShowImport}
          aria-label="Importuj prompty"
          title="Import CSV"
        >
          <svg viewBox="0 0 24 24" fill="none">
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
          <span>Import</span>
        </button>

        <button
          className="header-btn"
          onClick={onShowAdd}
          aria-label="Dodaj nowy element"
          title="Dodaj"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5V19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Dodaj</span>
        </button>

        <button
          className={`header-btn ${isEditMode ? "active" : ""}`}
          onClick={onToggleEdit}
          aria-label={isEditMode ? "Zapisz zmiany" : "Tryb edycji"}
          title={isEditMode ? "Zapisz" : "Edytuj"}
        >
          {isEditMode ? (
            <>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Zapisz</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 20V13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Edytuj</span>
            </>
          )}
        </button>

        <button
          className="header-btn icon-only"
          onClick={onShowSettings}
          aria-label="Ustawienia"
          title="Ustawienia"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="3"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
