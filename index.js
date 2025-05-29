const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const { next, prev, state, getPlaylistInfo, getItemPlaylist, getCurrentI } = require('./playlist.js');


const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    minHeight: 600,
    minWidth: 900,
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
  event.sender.send("UpdateCurrent", getCurrentI());
});

ipcMain.on('next', (event) => {
  event.sender.send("UpdatePlaying", next())
  event.sender.send("UpdateCurrent", getCurrentI());
});

ipcMain.on('toggle-shuffle', (event) => {
  state.isShuffle = !state.isShuffle;

});

ipcMain.on('getPlaylist', (event) => {
  event.sender.send("UpdatePlaylist", getPlaylistInfo());
});

ipcMain.on("item-index", (event, data) => {
  event.sender.send("UpdatePlaying", getItemPlaylist(data));
  event.sender.send("UpdateCurrent", getCurrentI());
});