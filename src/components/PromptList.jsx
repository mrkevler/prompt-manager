import React, { useState } from "react";
import appIcon from "../assets/logo/polybrand-icon.png";

function PromptList({ prompts, isEditMode, onCopy, onUpdate, onDelete }) {
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (promptId, field, value) => {
    if (!isEditMode) return;
    setEditingField({ id: promptId, field });
    setEditValue(value);
  };

  const saveEdit = () => {
    if (editingField) {
      onUpdate(editingField.id, editingField.field, editValue);
      setEditingField(null);
      setEditValue("");
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
    }
    if (e.key === "Escape") {
      cancelEdit();
    }
  };

  if (prompts.length === 0) {
    return (
      <main className="prompt-list empty">
        <div className="empty-state">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M9 12H15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M9 16H12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <h3>Brak promptów do wyświetlenia</h3>
          <p>Zaimportuj plik CSV lub wybierz inną kategorię</p>
        </div>
      </main>
    );
  }

  return (
    <main className="prompt-list">
      <div className="prompt-list-watermark">
        <img src={appIcon} alt="" aria-hidden="true" />
      </div>
      <div className="prompt-count">
        Wyświetlono <strong>{prompts.length}</strong>{" "}
        {prompts.length === 1
          ? "prompt"
          : prompts.length < 5
          ? "prompty"
          : "promptów"}
      </div>

      <div className="prompts-grid">
        {prompts.map((prompt) => (
          <article
            key={prompt.id}
            className={`prompt-card ${isEditMode ? "edit-mode" : ""}`}
            onClick={() => !isEditMode && onCopy(prompt.prompt)}
            tabIndex={isEditMode ? -1 : 0}
            role={isEditMode ? "form" : "button"}
            aria-label={
              isEditMode
                ? "Edytuj prompt"
                : `Kopiuj prompt: ${prompt.prompt.substring(0, 50)}...`
            }
            onKeyDown={(e) => {
              if (!isEditMode && e.key === "Enter") {
                onCopy(prompt.prompt);
              }
            }}
          >
            <div className="prompt-meta">
              {editingField?.id === prompt.id &&
              editingField?.field === "mainCategory" ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={saveEdit}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  aria-label="Edytuj kategorię główną"
                />
              ) : (
                <span
                  className={`tag main-category ${
                    isEditMode ? "editable" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(prompt.id, "mainCategory", prompt.mainCategory);
                  }}
                >
                  {prompt.mainCategory}
                </span>
              )}

              {editingField?.id === prompt.id &&
              editingField?.field === "category" ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={saveEdit}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  aria-label="Edytuj kategorię"
                />
              ) : (
                <span
                  className={`tag category ${isEditMode ? "editable" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(prompt.id, "category", prompt.category);
                  }}
                >
                  {prompt.category}
                </span>
              )}

              {editingField?.id === prompt.id &&
              editingField?.field === "action" ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={saveEdit}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  aria-label="Edytuj akcję"
                />
              ) : (
                <span
                  className={`tag action ${isEditMode ? "editable" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(prompt.id, "action", prompt.action);
                  }}
                >
                  {prompt.action}
                </span>
              )}
            </div>

            {editingField?.id === prompt.id &&
            editingField?.field === "prompt" ? (
              <textarea
                className="edit-textarea"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={handleKeyDown}
                autoFocus
                rows={4}
                aria-label="Edytuj treść prompta"
              />
            ) : (
              <p
                className={`prompt-text ${isEditMode ? "editable" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  startEdit(prompt.id, "prompt", prompt.prompt);
                }}
              >
                {prompt.prompt}
              </p>
            )}

            {isEditMode && (
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(prompt.id);
                }}
                aria-label="Usuń prompt"
                title="Usuń prompt"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 6H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 11V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 11V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}

            {!isEditMode && (
              <div className="copy-indicator">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="9"
                    y="9"
                    width="13"
                    height="13"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>Kliknij, aby skopiować</span>
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}

export default PromptList;
