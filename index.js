const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const { next, prev, state } = require('./playlist.js');


const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('prev', (event) => {
  event.sender.send("UpdatePlaying", prev())
});

ipcMain.on('next', (event) => {
  event.sender.send("UpdatePlaying", next())
});

ipcMain.on('toggle-shuffle', (event) => {
  state.isShuffle = !state.isShuffle;

});

