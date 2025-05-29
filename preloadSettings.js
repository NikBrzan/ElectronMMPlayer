const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('settings', {
    switchTheme: (data) => ipcRenderer.send("switch-theme", data),
    onUpdateTheme: (callback) => ipcRenderer.on('UpdateTheme', (event, data) => callback(data)),
    getTheme: () => ipcRenderer.send("get-theme"),
    onTheme: (callback) => ipcRenderer.on('Theme', (event, data) => callback(data)),
})

