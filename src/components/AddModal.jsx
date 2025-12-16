import React, { useState } from "react";

function AddModal({ categories, onAdd, onClose }) {
  const [addType, setAddType] = useState(null);
  const [formData, setFormData] = useState({
    mainCategory: "",
    category: "",
    action: "",
    prompt: "",
  });
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const mainCategories = Object.keys(categories);
  const subCategories = selectedMainCategory
    ? Object.keys(categories[selectedMainCategory] || {})
    : [];

  const handleSubmit = () => {
    if (addType === "mainCategory" && formData.mainCategory.trim()) {
      onAdd({
        mainCategory: formData.mainCategory.trim(),
        category: "Ogólne",
        action: "Nowy prompt",
        prompt: "Nowy prompt - kliknij aby edytować",
      });
    } else if (
      addType === "category" &&
      selectedMainCategory &&
      formData.category.trim()
    ) {
      onAdd({
        mainCategory: selectedMainCategory,
        category: formData.category.trim(),
        action: "Nowy prompt",
        prompt: "Nowy prompt - kliknij aby edytować",
      });
    } else if (
      addType === "action" &&
      selectedMainCategory &&
      selectedCategory &&
      formData.action.trim()
    ) {
      onAdd({
        mainCategory: selectedMainCategory,
        category: selectedCategory,
        action: formData.action.trim(),
        prompt: "Nowy prompt - kliknij aby edytować",
      });
    } else if (
      addType === "prompt" &&
      selectedMainCategory &&
      selectedCategory &&
      formData.action.trim() &&
      formData.prompt.trim()
    ) {
      onAdd({
        mainCategory: selectedMainCategory,
        category: selectedCategory,
        action: formData.action.trim(),
        prompt: formData.prompt.trim(),
      });
    }
    onClose();
  };

  const renderTypeSelection = () => (
    <div className="add-type-grid">
      <button
        className="add-type-btn"
        onClick={() => setAddType("mainCategory")}
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M22 19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H9L11 6H20C21.1046 6 22 6.89543 22 8V19Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Kategoria główna</span>
      </button>

      <button
        className="add-type-btn"
        onClick={() => setAddType("category")}
        disabled={mainCategories.length === 0}
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7H13L11 5H5C3.89543 5 3 5.89543 3 7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Kategoria</span>
      </button>

      <button
        className="add-type-btn"
        onClick={() => setAddType("action")}
        disabled={mainCategories.length === 0}
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Akcja</span>
      </button>

      <button
        className="add-type-btn"
        onClick={() => setAddType("prompt")}
        disabled={mainCategories.length === 0}
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Prompt</span>
      </button>
    </div>
  );

  const renderForm = () => {
    switch (addType) {
      case "mainCategory":
        return (
          <div className="add-form">
            <button className="back-btn" onClick={() => setAddType(null)}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Wróć
            </button>
            <div className="form-group">
              <label>Nazwa kategorii głównej</label>
              <input
                type="text"
                value={formData.mainCategory}
                onChange={(e) =>
                  setFormData({ ...formData, mainCategory: e.target.value })
                }
                placeholder="np. Marketing"
                autoFocus
              />
            </div>
          </div>
        );

      case "category":
        return (
          <div className="add-form">
            <button className="back-btn" onClick={() => setAddType(null)}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Wróć
            </button>
            <div className="form-group">
              <label>Kategoria główna</label>
              <select
                value={selectedMainCategory}
                onChange={(e) => setSelectedMainCategory(e.target.value)}
              >
                <option value="">Wybierz...</option>
                {mainCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Nazwa nowej kategorii</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="np. Social Media"
              />
            </div>
          </div>
        );

      case "action":
        return (
          <div className="add-form">
            <button className="back-btn" onClick={() => setAddType(null)}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Wróć
            </button>
            <div className="form-group">
              <label>Kategoria główna</label>
              <select
                value={selectedMainCategory}
                onChange={(e) => {
                  setSelectedMainCategory(e.target.value);
                  setSelectedCategory("");
                }}
              >
                <option value="">Wybierz...</option>
                {mainCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Kategoria</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={!selectedMainCategory}
              >
                <option value="">Wybierz...</option>
                {subCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Nazwa nowej akcji</label>
              <input
                type="text"
                value={formData.action}
                onChange={(e) =>
                  setFormData({ ...formData, action: e.target.value })
                }
                placeholder="np. Tworzenie posta"
              />
            </div>
          </div>
        );

      case "prompt":
        return (
          <div className="add-form">
            <button className="back-btn" onClick={() => setAddType(null)}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Wróć
            </button>
            <div className="form-group">
              <label>Kategoria główna</label>
              <select
                value={selectedMainCategory}
                onChange={(e) => {
                  setSelectedMainCategory(e.target.value);
                  setSelectedCategory("");
                }}
              >
                <option value="">Wybierz...</option>
                {mainCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Kategoria</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={!selectedMainCategory}
              >
                <option value="">Wybierz...</option>
                {subCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Akcja</label>
              <input
                type="text"
                value={formData.action}
                onChange={(e) =>
                  setFormData({ ...formData, action: e.target.value })
                }
                placeholder="np. Tworzenie posta"
              />
            </div>
            <div className="form-group">
              <label>Treść prompta</label>
              <textarea
                value={formData.prompt}
                onChange={(e) =>
                  setFormData({ ...formData, prompt: e.target.value })
                }
                placeholder="Wpisz treść prompta..."
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return renderTypeSelection();
    }
  };

  const isFormValid = () => {
    switch (addType) {
      case "mainCategory":
        return formData.mainCategory.trim().length > 0;
      case "category":
        return selectedMainCategory && formData.category.trim().length > 0;
      case "action":
        return (
          selectedMainCategory &&
          selectedCategory &&
          formData.action.trim().length > 0
        );
      case "prompt":
        return (
          selectedMainCategory &&
          selectedCategory &&
          formData.action.trim().length > 0 &&
          formData.prompt.trim().length > 0
        );
      default:
        return false;
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-title"
    >
      <div className="modal add-modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2 id="add-title">
            {addType
              ? `Dodaj ${
                  addType === "mainCategory"
                    ? "kategorię główną"
                    : addType === "category"
                    ? "kategorię"
                    : addType === "action"
                    ? "akcję"
                    : "prompt"
                }`
              : "Dodaj nowy element"}
          </h2>
          <button className="close-btn" onClick={onClose} aria-label="Zamknij">
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

        <div className="modal-content">{renderForm()}</div>

        {addType && (
          <footer className="modal-footer">
            <button className="btn secondary" onClick={onClose}>
              Anuluj
            </button>
            <button
              className="btn primary"
              onClick={handleSubmit}
              disabled={!isFormValid()}
            >
              Dodaj
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}

export default AddModal;
