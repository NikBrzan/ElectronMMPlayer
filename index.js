const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('node:path')
const { next, prev, state, getPlaylistInfo, getItemPlaylist, getCurrentI, save, load } = require('./playlist.js');

const SAVE_PATH = "./saves/playlist.json";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    minHeight: 820,
    minWidth: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  load(SAVE_PATH);
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    save(SAVE_PATH);
    app.quit();

  }
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

ipcMain.on("switch-theme", (event, data) => {
  state.theme = data.theme;
  const allWindows = BrowserWindow.getAllWindows();
  allWindows.forEach(w => {
    w.webContents.send("UpdateTheme", { theme: data.theme });
  });
});

ipcMain.on('open-settings-window', (event) => {
  const settingsWin = new BrowserWindow({
    width: 600,
    height: 400,
    minHeight: 300,
    minWidth: 350,
    title: "Settings",
    webPreferences: {
      preload: path.join(__dirname, 'preloadSettings.js')
    }
  })

  settingsWin.loadFile('settings.html');
  settingsWin.send("Theme", { theme: state.theme });


});

ipcMain.on("get-theme", (event) => {
  event.sender.send("Theme", { theme: state.theme });
});

ipcMain.on('open-load-dialog', async (event) => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Data', extensions: ['json'] },
      ]
    })

    if (!result.canceled) {
      load(result.filePaths[0])
      event.sender.send("UpdatePlaylist", getPlaylistInfo());
    }

  } catch (err) {
    console.error("Error with dialog: ", err);
  }
});


