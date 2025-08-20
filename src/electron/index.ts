// main.ts
import { app, BrowserWindow, globalShortcut } from 'electron';
import path from 'path';
import url from 'url';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const IS_DEV = !!process.env.ELECTRON_START_URL; // or use another env flag

let win: BrowserWindow | null = null;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    fullscreen: false,
    frame: false,
    autoHideMenuBar: true, // replaces setMenuBarVisibility(false) + setMenu(null)
    webPreferences: {
      // SECURITY: disable nodeIntegration in renderer, use preload for any bridging
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'), // compile your preload.ts to this path
    },
  });

  if (IS_DEV) {
    // e.g. React dev server
    win.loadURL(process.env.ELECTRON_START_URL as string);
    // win.webContents.openDevTools({ mode: 'detach' }); // optional for development
  } else {
    // load the built index.html
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, '../website/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  win.on('closed', () => {
    win = null;
  });
}

function registerDevToolsShortcut() {
  // Example: block 'Cmd/Ctrl+Alt+I' to prevent DevTools
  globalShortcut.register('CommandOrControl+Alt+I', () => {
    // noop to swallow the shortcut
  });
}

app.whenReady().then(() => {
  createWindow();
  // registerDevToolsShortcut();

  app.on('activate', () => {
    // macOS: re-create a window when the dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
