'use strict';

const path = require('path');
const fs = require('fs');
const { app, ipcMain, protocol, BrowserWindow } = require('electron');
const { createProtocol } = require('vue-cli-plugin-electron-builder/lib');
const installExtension = require('electron-devtools-installer').default;
const { VUEJS_DEVTOOLS } = require('electron-devtools-installer');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const isDev = process.env.NODE_ENV !== 'production';

ipcMain.on('xxx', (event, arg) => {
    console.log(arg);
    // const url = arg;
    //
    // (async () => {
    //     const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    //     const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
    //     const runnerResult = await lighthouse('http://www.nancologist.com', options);
    //
    //     // `.report` is the HTML report as a string
    //     const reportHtml = runnerResult.report;
    //     fs.writeFileSync('../lhreport.html', reportHtml);
    //
    //     // `.lhr` is the Lighthouse Result as a JS object
    //     console.log('Report is done for', runnerResult.lhr.finalUrl);
    //     console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
    //
    //     await chrome.kill();
    // })();
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
]);

function createWindow() {
    win = new BrowserWindow({
        // To show the right background color while the app is loading.
        backgroundColor: '#3AAFA9',
        minHeight: 600,
        minWidth: 800,
        show: false, // see 'ready-to-show' event listener.
        webPreferences: {
            // Needed only if nodeIntegration is set to "false":
            // preload: path.join(__dirname, '..', 'src', 'preload.js'),

            // If any problem with node modules, just set it to "true":
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
        },
    });

    if (isDev) win.webContents.openDevTools();

    if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html');
    }

    // Show app only after the page is completely rendered.
    // (It makes the use of bg-color in BrowserWindow constructor a bit
    // unnecessary, but it's recommended to set bg-color there.)
    // Todo: Downside of this action is, that it takes a bit to render and
    //  then shows the app, instead of that, OPEN the window immediately and
    //  then use a Spinner instead (if possible).
    win.once('ready-to-show', () => { win.show() });

    win.on('closed', () => {
        win = null;
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
    if (win === null) {
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
