import React, { useState } from "react";

function Sidebar({
  categories,
  selectedMainCategory,
  selectedCategory,
  selectedAction,
  onSelectMainCategory,
  onSelectCategory,
  onSelectAction,
  isEditMode,
}) {
  const [expandedMain, setExpandedMain] = useState({});
  const [expandedSub, setExpandedSub] = useState({});

  const toggleMain = (cat) => {
    setExpandedMain((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const toggleSub = (cat) => {
    setExpandedSub((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleMainClick = (mainCat) => {
    if (selectedMainCategory === mainCat) {
      onSelectMainCategory(null);
      onSelectCategory(null);
      onSelectAction(null);
    } else {
      onSelectMainCategory(mainCat);
      onSelectCategory(null);
      onSelectAction(null);
      if (!expandedMain[mainCat]) {
        toggleMain(mainCat);
      }
    }
  };

  const handleSubClick = (subCat, e) => {
    e.stopPropagation();
    if (selectedCategory === subCat) {
      onSelectCategory(null);
      onSelectAction(null);
    } else {
      onSelectCategory(subCat);
      onSelectAction(null);
      if (!expandedSub[subCat]) {
        toggleSub(subCat);
      }
    }
  };

  const handleActionClick = (action, e) => {
    e.stopPropagation();
    onSelectAction(selectedAction === action ? null : action);
  };

  const mainCategories = Object.keys(categories);

  return (
    <aside
      className="sidebar"
      role="navigation"
      aria-label="Kategorie promptów"
    >
      <div className="sidebar-header">
        <h2>Kategorie</h2>
        {(selectedMainCategory || selectedCategory || selectedAction) && (
          <button
            className="clear-filter"
            onClick={() => {
              onSelectMainCategory(null);
              onSelectCategory(null);
              onSelectAction(null);
            }}
            aria-label="Wyczyść filtry"
          >
            Wyczyść
          </button>
        )}
      </div>

      {mainCategories.length === 0 ? (
        <div className="sidebar-empty">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Brak promptów</p>
          <span>Zaimportuj plik CSV</span>
        </div>
      ) : (
        <nav className="category-tree">
          {mainCategories.map((mainCat) => (
            <div key={mainCat} className="category-main">
              <button
                className={`category-btn main ${
                  selectedMainCategory === mainCat ? "selected" : ""
                }`}
                onClick={() => handleMainClick(mainCat)}
                aria-expanded={expandedMain[mainCat]}
              >
                <svg
                  className={`expand-icon ${
                    expandedMain[mainCat] ? "expanded" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMain(mainCat);
                  }}
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="category-name">{mainCat}</span>
                <span className="category-count">
                  {Object.keys(categories[mainCat]).length}
                </span>
              </button>

              {expandedMain[mainCat] && (
                <div className="category-children">
                  {Object.keys(categories[mainCat]).map((subCat) => (
                    <div key={subCat} className="category-sub">
                      <button
                        className={`category-btn sub ${
                          selectedCategory === subCat ? "selected" : ""
                        }`}
                        onClick={(e) => handleSubClick(subCat, e)}
                        aria-expanded={expandedSub[subCat]}
                      >
                        <svg
                          className={`expand-icon ${
                            expandedSub[subCat] ? "expanded" : ""
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSub(subCat);
                          }}
                        >
                          <path
                            d="M9 18L15 12L9 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="category-name">{subCat}</span>
                        <span className="category-count">
                          {categories[mainCat][subCat].size}
                        </span>
                      </button>

                      {expandedSub[subCat] && (
                        <div className="action-list">
                          {[...categories[mainCat][subCat]].map((action) => (
                            <button
                              key={action}
                              className={`action-btn ${
                                selectedAction === action ? "selected" : ""
                              }`}
                              onClick={(e) => handleActionClick(action, e)}
                            >
                              <svg viewBox="0 0 24 24" fill="none">
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="3"
                                  fill="currentColor"
                                />
                              </svg>
                              <span>{action}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </aside>
  );
}

export default Sidebar;
