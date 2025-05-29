const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('player', {
  next: () => ipcRenderer.send('next'),
  prev: () => ipcRenderer.send('prev'),
  toggleShuffle: () => ipcRenderer.send('toggle-shuffle'),
  toggleRepeat: () => ipcRenderer.send('toggle-repeat'),
    onUpdatePlaying: (callback) => ipcRenderer.on('UpdatePlaying', (event, newSrc) => callback(newSrc))
})

