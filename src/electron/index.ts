import { app, BrowserWindow, globalShortcut } from 'electron';

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    fullscreen: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // hide the default menu bar that comes with the browser window
  win.setMenuBarVisibility(false);
  win.setMenu(null);

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/../website/index.html`);
}

function registerDevToolsShortcut() {
  // Blocks 'CommandOrControl+Alt+I' shortcut and prevents DevTools.
  const ret = globalShortcut.register('CommandOrControl+Alt+I', () => {});
}

app.allowRendererProcessReuse = true;

app.on('ready', () => {
  createWindow();
  registerDevToolsShortcut();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
});
