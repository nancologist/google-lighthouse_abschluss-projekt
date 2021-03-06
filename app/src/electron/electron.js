'use strict';

const path = require('path');
const fs = require('fs');
const { app, ipcMain, protocol, BrowserWindow } = require('electron');
const { createProtocol } = require('vue-cli-plugin-electron-builder/lib');
const installExtension = require('electron-devtools-installer').default;
const { VUEJS_DEVTOOLS } = require('electron-devtools-installer');
require('./channels.js');

const isDev = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
]);

function createWindow() {
    mainWindow = new BrowserWindow({
        // To show the right background color while the app is loading.
        backgroundColor: '#3AAFA9',
        height: 600,
        minHeight: 600,
        width: 800,
        minWidth: 800,
        show: false, // see 'ready-to-show' event listener.
        webPreferences: {
            // Needed only if nodeIntegration is set to "false":
            // preload: path.join(__dirname, '..', 'src', 'preload.js'),

            // If any problem with node modules, please set nodeIntegration to
            // "true":
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
        }
    });
    mainWindow.name = 'MAIN_WINDOW';

    if (isDev) mainWindow.webContents.openDevTools();

    if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode.
        mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        mainWindow.loadURL('app://./index.html');
    }

    mainWindow.once('ready-to-show', () => { mainWindow.show(); });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async() => {
    if (isDev && !process.env.IS_TEST) {
    // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS);
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString());
        }
    }
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDev) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit();
            }
        });
    } else {
        process.on('SIGTERM', () => {
            app.quit();
        });
    }
}
