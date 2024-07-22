import path from 'path';
import { app, BrowserWindow, shell, ipcMain, session } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { config } from 'dotenv';

config();

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    minWidth: 700,
    minHeight: 600,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Intercept HTTP responses to add CSP headers
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    if (details.responseHeaders) {
      const responseHeaders = details.responseHeaders;
      const csp = `default-src 'self'; script-src 'self' 'unsafe-inline' https://sdk.scdn.co; style-src 'self' 'unsafe-inline';`;
      
      responseHeaders['Content-Security-Policy'] = [csp];
      
      callback({ responseHeaders });
    } else {
      callback({ cancel: false });
    }
  });

  // Intercept HTTP responses
  session.defaultSession.webRequest.onHeadersReceived({ urls: ["*://accounts.spotify.com/*"] }, (details, callback) => {
    if (!details.responseHeaders) {
      callback({ cancel: false });
      return;
    }

    console.log('Intercepted response headers:', details.responseHeaders); // Debugging statement

    const locationHeader = details.responseHeaders['Location'] || details.responseHeaders['location'];
    if (locationHeader) {
      const redirectUrl = Array.isArray(locationHeader) ? locationHeader[0] : locationHeader;
      console.log('Detected Location header:', redirectUrl); // Debugging statement

      if (redirectUrl.includes('callback#access_token=')) {
        const parsedUrl = new URL(redirectUrl);
        const hashParams = new URLSearchParams(parsedUrl.hash.substring(1));
        const accessToken = hashParams.get('access_token');

        console.log('Extracted access token:', accessToken); // Debugging statement

        if (accessToken && mainWindow) {
          mainWindow.webContents.executeJavaScript(`localStorage.setItem('spotifyToken', '${accessToken}');`)
            .then(() => {
              console.log('Access token stored in local storage'); // Debugging statement

              if (mainWindow) {
                mainWindow.loadURL('http://localhost:1212');
              }
            })
            .catch((error) => {
              console.error('Error storing access token:', error); // Debugging statement
            });
        }
      }
    }
    callback({ cancel: false });
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
