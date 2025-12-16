const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getPrompts: () => ipcRenderer.invoke("get-prompts"),
  savePrompts: (prompts) => ipcRenderer.invoke("save-prompts", prompts),
  copyToClipboard: (text) => ipcRenderer.invoke("copy-to-clipboard", text),
  getSettings: () => ipcRenderer.invoke("get-settings"),
  saveSettings: (settings) => ipcRenderer.invoke("save-settings", settings),
  getSystemTheme: () => ipcRenderer.invoke("get-system-theme"),
  openExternalLink: (url) => ipcRenderer.invoke("open-external-link", url),
  onSystemThemeChanged: (callback) => {
    ipcRenderer.on("system-theme-changed", (event, theme) => callback(theme));
  },
});
