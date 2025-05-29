const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('player', {
    next: () => ipcRenderer.send('next'),
    prev: () => ipcRenderer.send('prev'),
    toggleShuffle: () => ipcRenderer.send('toggle-shuffle'),
    toggleRepeat: () => ipcRenderer.send('toggle-repeat'),
    onUpdatePlaying: (callback) => ipcRenderer.on('UpdatePlaying', (event, data) => callback(data)),
    getPlaylist: () => ipcRenderer.send("getPlaylist"),
    onUpdatePlaylist: (callback) => ipcRenderer.on('UpdatePlaylist', (event, data) => callback(data)),
    onUpdateCurrent: (callback) => ipcRenderer.on('UpdateCurrent', (event, data) => callback(data)),
    getItemIndex: (data) => ipcRenderer.send("item-index", data)

})

