import React, { useState, useEffect, useCallback, useMemo } from "react";
import Papa from "papaparse";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PromptList from "./components/PromptList";
import Settings from "./components/Settings";
import ImportModal from "./components/ImportModal";
import AddModal from "./components/AddModal";
import WelcomeModal from "./components/WelcomeModal";
import Toast from "./components/Toast";
import Logo from "./components/Logo";

function App() {
  const [prompts, setPrompts] = useState([]);
  const [settings, setSettings] = useState({ theme: "system" });
  const [currentTheme, setCurrentTheme] = useState("light");
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Inicjalizacja
  useEffect(() => {
    const init = async () => {
      if (window.electronAPI) {
        const savedPrompts = await window.electronAPI.getPrompts();
        const savedSettings = await window.electronAPI.getSettings();
        setPrompts(savedPrompts || []);
        setSettings(savedSettings || { theme: "system" });

        // Pokaż welcome modal jeśli baza jest pusta
        if (!savedPrompts || savedPrompts.length === 0) {
          setShowWelcome(true);
        }

        // Nasłuchuj zmian motywu systemowego
        window.electronAPI.onSystemThemeChanged((theme) => {
          if (savedSettings?.theme === "system") {
            setCurrentTheme(theme);
          }
        });
      }
      setIsInitialized(true);
    };
    init();
  }, []);

  // Zarządzanie motywem
  useEffect(() => {
    const applyTheme = async () => {
      let theme = settings.theme;
      if (theme === "system" && window.electronAPI) {
        theme = await window.electronAPI.getSystemTheme();
      }
      setCurrentTheme(theme);
      document.documentElement.setAttribute("data-theme", theme);
    };
    applyTheme();
  }, [settings.theme]);

  // Zapisywanie promptów
  const savePrompts = useCallback(async (newPrompts) => {
    setPrompts(newPrompts);
    if (window.electronAPI) {
      await window.electronAPI.savePrompts(newPrompts);
    }
  }, []);

  // Zapisywanie ustawień
  const saveSettings = useCallback(async (newSettings) => {
    setSettings(newSettings);
    if (window.electronAPI) {
      await window.electronAPI.saveSettings(newSettings);
    }
  }, []);

  // Kopiowanie do schowka
  const copyToClipboard = useCallback(async (text) => {
    if (window.electronAPI) {
      await window.electronAPI.copyToClipboard(text);
    } else {
      await navigator.clipboard.writeText(text);
    }
    setToast({ message: "Prompt skopiowany do schowka!", type: "success" });
  }, []);

  // Import CSV
  const handleImport = useCallback(
    (file) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const newPrompts = results.data
            .filter((row) => row["Kategoria główna"] && row["Prompt"])
            .map((row, index) => ({
              id: Date.now() + index,
              mainCategory: row["Kategoria główna"]?.trim() || "",
              category: row["Kategoria"]?.trim() || "",
              action: row["Akcja"]?.trim() || "",
              prompt: row["Prompt"]?.trim() || "",
            }));

          if (newPrompts.length > 0) {
            savePrompts([...prompts, ...newPrompts]);
            setToast({
              message: `Zaimportowano ${newPrompts.length} promptów!`,
              type: "success",
            });
          } else {
            setToast({
              message: "Nie znaleziono prawidłowych promptów w pliku.",
              type: "error",
            });
          }
          setShowImport(false);
          setShowWelcome(false);
        },
        error: () => {
          setToast({ message: "Błąd podczas importu pliku.", type: "error" });
        },
      });
    },
    [prompts, savePrompts]
  );

  // Dodawanie nowego elementu
  const handleAdd = useCallback(
    (newItem) => {
      const newPrompt = {
        id: Date.now(),
        mainCategory: newItem.mainCategory,
        category: newItem.category,
        action: newItem.action,
        prompt: newItem.prompt,
      };
      savePrompts([...prompts, newPrompt]);
      setToast({ message: "Dodano nowy element!", type: "success" });
    },
    [prompts, savePrompts]
  );

  // Edycja promptu
  const updatePrompt = useCallback(
    (id, field, value) => {
      const newPrompts = prompts.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      );
      savePrompts(newPrompts);
    },
    [prompts, savePrompts]
  );

  // Usuwanie promptu
  const deletePrompt = useCallback(
    (id) => {
      const newPrompts = prompts.filter((p) => p.id !== id);
      savePrompts(newPrompts);
      setToast({ message: "Prompt usunięty.", type: "info" });
    },
    [prompts, savePrompts]
  );

  // Struktura kategorii
  const categories = useMemo(() => {
    const structure = {};
    prompts.forEach((p) => {
      if (!structure[p.mainCategory]) {
        structure[p.mainCategory] = {};
      }
      if (!structure[p.mainCategory][p.category]) {
        structure[p.mainCategory][p.category] = new Set();
      }
      structure[p.mainCategory][p.category].add(p.action);
    });
    return structure;
  }, [prompts]);

  // Filtrowane prompty
  const filteredPrompts = useMemo(() => {
    return prompts.filter((p) => {
      const matchesCategory =
        !selectedMainCategory || p.mainCategory === selectedMainCategory;
      const matchesSubCategory =
        !selectedCategory || p.category === selectedCategory;
      const matchesAction = !selectedAction || p.action === selectedAction;
      const matchesSearch =
        !searchQuery ||
        p.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.mainCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.action.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesCategory && matchesSubCategory && matchesAction && matchesSearch
      );
    });
  }, [
    prompts,
    selectedMainCategory,
    selectedCategory,
    selectedAction,
    searchQuery,
  ]);

  const handleWelcomeImport = () => {
    setShowWelcome(false);
    setShowImport(true);
  };

  return (
    <div className={`app ${currentTheme}`}>
      <Header
        isEditMode={isEditMode}
        onToggleEdit={() => setIsEditMode(!isEditMode)}
        onShowSettings={() => setShowSettings(true)}
        onShowImport={() => setShowImport(true)}
        onShowAdd={() => setShowAdd(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="main-content">
        <Sidebar
          categories={categories}
          selectedMainCategory={selectedMainCategory}
          selectedCategory={selectedCategory}
          selectedAction={selectedAction}
          onSelectMainCategory={setSelectedMainCategory}
          onSelectCategory={setSelectedCategory}
          onSelectAction={setSelectedAction}
          isEditMode={isEditMode}
        />

        <PromptList
          prompts={filteredPrompts}
          isEditMode={isEditMode}
          onCopy={copyToClipboard}
          onUpdate={updatePrompt}
          onDelete={deletePrompt}
        />
      </div>

      <Logo theme={currentTheme} />

      {showWelcome && (
        <WelcomeModal
          onImport={handleWelcomeImport}
          onClose={() => setShowWelcome(false)}
        />
      )}

      {showAdd && (
        <AddModal
          categories={categories}
          onAdd={handleAdd}
          onClose={() => setShowAdd(false)}
        />
      )}

      {showSettings && (
        <Settings
          settings={settings}
          onSave={saveSettings}
          onClose={() => setShowSettings(false)}
          theme={currentTheme}
        />
      )}

      {showImport && (
        <ImportModal
          onImport={handleImport}
          onClose={() => setShowImport(false)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
