const {
  app,
  BrowserWindow,
  ipcMain,
  clipboard,
  nativeTheme,
  shell,
} = require("electron");
const path = require("path");
const Store = require("electron-store");

const store = new Store({
  defaults: {
    prompts: [],
    settings: {
      theme: "system", // 'light', 'dark', 'system'
    },
  },
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: "hiddenInset",
    backgroundColor: nativeTheme.shouldUseDarkColors ? "#1a1a2e" : "#ffffff",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Wczytaj aplikację
  if (process.env.NODE_ENV === "development" || !app.isPackaged) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// IPC handlers
ipcMain.handle("get-prompts", () => {
  return store.get("prompts");
});

ipcMain.handle("save-prompts", (event, prompts) => {
  store.set("prompts", prompts);
  return true;
});

ipcMain.handle("copy-to-clipboard", (event, text) => {
  clipboard.writeText(text);
  return true;
});

ipcMain.handle("get-settings", () => {
  return store.get("settings");
});

ipcMain.handle("save-settings", (event, settings) => {
  store.set("settings", settings);
  return true;
});

ipcMain.handle("get-system-theme", () => {
  return nativeTheme.shouldUseDarkColors ? "dark" : "light";
});

ipcMain.handle("open-external-link", (event, url) => {
  shell.openExternal(url);
  return true;
});

// Nasłuchuj zmian motywu systemowego
nativeTheme.on("updated", () => {
  if (mainWindow) {
    mainWindow.webContents.send(
      "system-theme-changed",
      nativeTheme.shouldUseDarkColors ? "dark" : "light"
    );
  }
});
