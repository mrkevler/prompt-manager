# 🧠 Prompt Manager by mrKevler

A simple and intuitive desktop app for managing prompts on **macOS** and **Windows**.

> **Short GitHub description (EN):** Prompt Manager is a lightweight desktop app that helps you organize, search, edit, and quickly copy AI prompts using a simple structure (**Main Category → Category → Action**). It supports CSV import, fast clipboard copying, dark/light mode themes and WCAG 2.1 AA accessibility.

![Prompt Manager](https://img.shields.io/badge/Version-Beta_1.02-blue)
![Platform](https://img.shields.io/badge/Platform-Mac%20%7C%20Windows-green)
![License](https://img.shields.io/badge/License-EULA-orange)

![GitHub](https://img.shields.io/github/followers/mrkevler?label=Follow&style=social)
![Repo Size](https://img.shields.io/github/repo-size/mrkevler/prompt-manager)
![Last Commit](https://img.shields.io/github/last-commit/mrkevler/prompt-manager)

**Repository:** [mrkevler/prompt-manager](https://github.com/mrkevler/prompt-manager)

---

## 🔍 Table of Contents

- [🧠 Prompt Manager by mrKevler](#-prompt-manager-by-mrkevler)
  - [🔍 Table of Contents](#-table-of-contents)
  - [English](#english)
    - [✨ Features](#-features)
    - [🚀 Installation](#-installation)
      - [Prebuilt installers](#prebuilt-installers)
      - [Build from source](#build-from-source)
    - [📄 CSV file format](#-csv-file-format)
    - [🎨 Interface](#-interface)
      - [Navigation](#navigation)
      - [Edit mode](#edit-mode)
      - [Adding new items](#adding-new-items)
      - [Settings](#settings)
    - [🛠 Tech stack](#-tech-stack)
    - [📱 System requirements](#-system-requirements)
    - [📝 License](#-license)
  - [Polski](#polski)
    - [✨ Funkcje](#-funkcje)
    - [🚀 Instalacja](#-instalacja)
      - [Gotowe instalatory](#gotowe-instalatory)
      - [Kompilacja ze źródeł](#kompilacja-ze-źródeł)
    - [📄 Format pliku CSV](#-format-pliku-csv)
    - [🎨 Interfejs](#-interfejs)
      - [Nawigacja](#nawigacja)
      - [Tryb edycji](#tryb-edycji)
      - [Dodawanie nowych elementów](#dodawanie-nowych-elementów)
      - [Ustawienia](#ustawienia)
    - [🛠 Technologie](#-technologie)
    - [📱 Wymagania systemowe](#-wymagania-systemowe)
    - [📝 Licencja](#-licencja)

---

## English

### ✨ Features

- 📁 **Prompt organization** — main categories, subcategories, and actions  
- 📋 **Quick copy** — click a prompt to copy it to the clipboard  
- 📥 **CSV import** — easily add prompts from CSV files  
- ➕ **Add items** — create categories, actions, and prompts  
- ✏️ **Edit mode** — modify categories and prompt content  
- 🔍 **Search** — quickly find prompts  
- 🌓 **Themes** — light, dark, or automatic (system)  
- ♿ **Accessibility** — WCAG 2.1 AA compliance  

### 🚀 Installation

#### Prebuilt installers

Download the right installer for your system:

- **macOS**: `Prompt Manager.dmg`  
- **Windows**: `Prompt Manager Setup.exe`

#### Build from source

```bash
# Clone repository
git clone https://github.com/mrkevler/prompt-manager.git
cd prompt-manager

# Install dependencies
npm install

# Run in development mode
npm run electron:dev

# Build for Mac
npm run electron:build:mac

# Build for Windows
npm run electron:build:win
```

### 📄 CSV file format

Your CSV file should follow this format:

```csv
Kategoria główna,Kategoria,Akcja,Prompt
```

**Columns**

- **Kategoria główna** — main organizational category (required)  
- **Kategoria** — subcategory  
- **Akcja** — specific action/task  
- **Prompt** — prompt content (required)

### 🎨 Interface

#### Navigation

- **Sidebar** — browse categories and subcategories  
- **Search bar** — filter prompts by content  
- **Prompt cards** — click to copy  

#### Edit mode

1. Click the **Edit** button in the header  
2. Click a category tag or prompt text to edit  
3. Press **Enter** to save or **Escape** to cancel  
4. Click **Save** to exit edit mode  

#### Adding new items

1. Click the **+** button in the header  
2. Choose a type: Main Category, Category, Action, or Prompt  
3. Fill in the form and click **Add**

#### Settings

- Theme switching (light/dark/system)  
- Version and license info  
- Author details  

### 🛠 Tech stack

- **Electron** — desktop application  
- **React** — UI  
- **Vite** — bundler  
- **PapaParse** — CSV parsing  
- **electron-store** — local data storage  

### 📱 System requirements

- **macOS** 10.13 or newer  
- **Windows** 10 or newer  

### 📝 License

EULA (End User License Agreement) — see the LICENSE file for details.

---

Created with ♥ by [mrKevler (Bartosz Sergot)](https://polybrand.eu)  
© 2025 Bartosz Sergot (mrKevler). All rights reserved.

---

## Polski

Prosta i intuicyjna aplikacja desktopowa do zarządzania promptami dla **Mac** i **Windows**.

### ✨ Funkcje

- 📁 **Organizacja promptów** — kategorie główne, podkategorie i akcje  
- 📋 **Szybkie kopiowanie** — kliknij w prompt, aby skopiować do schowka  
- 📥 **Import CSV** — łatwe dodawanie promptów z plików CSV  
- ➕ **Dodawanie elementów** — twórz kategorie, akcje i prompty  
- ✏️ **Tryb edycji** — modyfikuj kategorie i treść promptów  
- 🔍 **Wyszukiwanie** — szybkie znajdowanie promptów  
- 🌓 **Motywy** — jasny, ciemny lub automatyczny (systemowy)  
- ♿ **Dostępność** — zgodność z WCAG 2.1 AA  

### 🚀 Instalacja

#### Gotowe instalatory

Pobierz odpowiedni instalator dla swojego systemu:

- **macOS**: `Prompt Manager.dmg`  
- **Windows**: `Prompt Manager Setup.exe`

#### Kompilacja ze źródeł

```bash
# Sklonuj repozytorium
git clone https://github.com/mrkevler/prompt-manager.git
cd prompt-manager

# Zainstaluj zależności
npm install

# Uruchom w trybie deweloperskim
npm run electron:dev

# Zbuduj dla Mac
npm run electron:build:mac

# Zbuduj dla Windows
npm run electron:build:win
```

### 📄 Format pliku CSV

Plik CSV powinien mieć następujący format:

```csv
Kategoria główna,Kategoria,Akcja,Prompt
```

**Kolumny**

- **Kategoria główna** — główna kategoria organizacyjna (wymagana)  
- **Kategoria** — podkategoria  
- **Akcja** — konkretna akcja/zadanie  
- **Prompt** — treść prompta (wymagana)

### 🎨 Interfejs

#### Nawigacja

- **Sidebar** — przeglądaj kategorie i podkategorie  
- **Wyszukiwarka** — filtruj prompty po treści  
- **Karty promptów** — kliknij, aby skopiować  

#### Tryb edycji

1. Kliknij przycisk **Edytuj** w nagłówku  
2. Kliknij w tag kategorii lub treść prompta, aby edytować  
3. Naciśnij **Enter**, aby zapisać lub **Escape**, aby anulować  
4. Kliknij **Zapisz**, aby wyjść z trybu edycji  

#### Dodawanie nowych elementów

1. Kliknij przycisk **+** w nagłówku  
2. Wybierz typ: Kategoria główna, Kategoria, Akcja lub Prompt  
3. Wypełnij formularz i kliknij **Dodaj**

#### Ustawienia

- Zmiana motywu (jasny/ciemny/systemowy)  
- Informacje o wersji i licencji  
- Dane autora  

### 🛠 Technologie

- **Electron** — aplikacja desktopowa  
- **React** — interfejs użytkownika  
- **Vite** — bundler  
- **PapaParse** — parsowanie CSV  
- **electron-store** — lokalne przechowywanie danych  

### 📱 Wymagania systemowe

- **macOS** 10.13 lub nowszy  
- **Windows** 10 lub nowszy  

### 📝 Licencja

EULA (End User License Agreement) — szczegóły w pliku LICENSE.

---

Stworzone z ♥ przez [mrKevler (Bartosz Sergot)](https://polybrand.eu)  
© 2025 Bartosz Sergot (mrKevler). Wszystkie prawa zastrzeżone.
