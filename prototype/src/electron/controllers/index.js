const { BrowserWindow, ipcMain, dialog, getCurrentWindow } = require('electron');
const fs = require('fs');
const path = require('path');
// const lighthouse = require('lighthouse');
// const chromeLauncher = require('chrome-launcher');

const ROOT_DIR = path.join(__dirname, '..');

ipcMain.on('STORE_REPORT', (event, arg) => {
    const testText = arg;
    // To attach the dialog to its parent window:
    const parentWin = BrowserWindow.getFocusedWindow();

    dialog.showSaveDialog(parentWin, {
        message: 'Choose a directory to store lighthouse report.',
    })
    .then(({canceled, filePath}) => {
        if (!canceled && !!filePath) {
            fs.writeFile(filePath, testText, (err) => {
                if (err) return console.log(err);
                console.log('Writing file started.')
            })
        }
    })
    .catch((err) => {
        console.log(err);
    });

    // Write Lighthouse's test report in a html file.
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
});
