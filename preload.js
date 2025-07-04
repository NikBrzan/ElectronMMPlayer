const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('player', {
    next: () => ipcRenderer.send('next'),
    prev: () => ipcRenderer.send('prev'),
    toggleShuffle: () => ipcRenderer.send('toggle-shuffle'),
    toggleRepeat: () => ipcRenderer.send('toggle-repeat'),
    onUpdatePlaying: (callback) => ipcRenderer.on('UpdatePlaying', (event, data) => callback(data)),
    getPlaylist: () => ipcRenderer.send('getPlaylist'),
    onUpdatePlaylist: (callback) => ipcRenderer.on('UpdatePlaylist', (event, data) => callback(data)),
    onUpdateCurrent: (callback) => ipcRenderer.on('UpdateCurrent', (event, data) => callback(data)),
    getItemIndex: (data) => ipcRenderer.send('item-index', data),
    openSettingsWindow: () => ipcRenderer.send('open-settings-window'),
    switchTheme: (data) => ipcRenderer.send('switch-theme', data),
    onUpdateTheme: (callback) => ipcRenderer.on('UpdateTheme', (event, data) => callback(data)),
    openLoadDialog: () => ipcRenderer.send('open-load-dialog'),
    getTheme: () => ipcRenderer.send("get-theme"),
    onTheme: (callback) => ipcRenderer.on('Theme', (event, data) => callback(data)),
    startRecord: () => ipcRenderer.send('start-speach'),
    onTranscribe: (callback) => ipcRenderer.on('transcript', (event, data) => callback(data)),
    removeAtIndex: (index) => ipcRenderer.send('remove-at-index', index),
    getSA: () => ipcRenderer.send('get-sox-available'),
    onSA: (callback) => ipcRenderer.on('sox', (event, data) => callback(data)),
})

