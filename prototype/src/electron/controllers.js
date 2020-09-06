const { BrowserWindow, ipcMain, dialog, getCurrentWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const lighthouse = require('lighthouse');
const { throttling: { desktopDense4G } } = require('lighthouse/lighthouse-core/config/constants.js');
const chromeLauncher = require('chrome-launcher');

const ROOT_DIR = path.join(__dirname, '..');

ipcMain.on('STORE_REPORT', (event, auditForm) => {
    const { isCustom, reportFormat, url } = auditForm;
    // To attach the dialog to its parent window:
    const parentWin = BrowserWindow.getFocusedWindow();

    dialog.showSaveDialog(parentWin, {
        message: 'Choose a directory to store report.',
        filters: [{ name: 'Report', extensions: [reportFormat] }]
    })
        .then(({ canceled, filePath }) => {
            if (!canceled && !!filePath) {
                testWebsiteAndCreateReport({ url, filePath, reportFormat, isCustom }).catch((err) => {
                    console.log(err);
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

// Write Lighthouse's test report in a html file.
async function testWebsiteAndCreateReport({ url, filePath, reportFormat, isCustom }) {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    // output: json, html, csv
    const options = {
        // logLevel: 'info',
        output: reportFormat,
        // onlyCategories: ['performance'],
        port: chrome.port
    };

    let runnerResult;

    if (isCustom) {
        runnerResult = await lighthouse(url, options, customConfig);
    } else {
        runnerResult = await lighthouse(url, options);
    }

    // `.report` is the HTML report as a string
    const reportHtml = runnerResult.report;
    fs.writeFileSync(filePath, reportHtml);

    // `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult.lhr.finalUrl);
    console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

    await chrome.kill();
}

// A Lighthouse Custom Config Sample
// Todo: Customize 1. Audits (and 2. their threshold) & 3. Throttling
const customConfig = {
    extends: 'lighthouse:default',
    settings: {
        onlyAudits: [
            'first-meaningful-paint'
            // 'speed-index',
            // 'first-cpu-idle',
            // 'interactive',
        ],
    }
};
