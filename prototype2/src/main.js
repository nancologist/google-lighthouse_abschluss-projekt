// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

ipcMain.on('xxx', (event, arg) => {
    console.log(arg);
    (async () => {
        const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
        const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
        const runnerResult = await lighthouse('https://example.com', options);

        // `.report` is the HTML report as a string
        const reportHtml = runnerResult.report;
        fs.writeFileSync('lhreport.html', reportHtml);

        // `.lhr` is the Lighthouse Result as a JS object
        console.log('Report is done for', runnerResult.lhr.finalUrl);
        console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

        await chrome.kill();
    })();
});

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      /*
      * Mori:
      * Instead of using nodeIntegration: true we are going to use preload.js,
      * where we only expose the node codes which we need and not all at once
      * to our script code.
      * */
      preload: path.join(__dirname, 'preload.js'),
      // nodeIntegration: true // High Security Risks
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'view', 'index.html'))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
