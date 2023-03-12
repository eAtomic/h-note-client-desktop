import { app, BrowserWindow } from 'electron';
import path from 'path';
const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'index2.js'),
    },
  });
  win.webContents.openDevTools()
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  } else {
    //  Use ['ENV_NAME'] avoid vite:define plugin
    const url = process.env['VITE_DEV_SERVER_URL'];
    console.log(process.env);
    win.loadURL(url!);
  }
};
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});