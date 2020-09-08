const { BrowserWindow, ipcMain, dialog, getCurrentWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const lighthouse = require('lighthouse');
const { throttling: { desktopDense4G } } = require('lighthouse/lighthouse-core/config/constants.js');
const chromeLauncher = require('chrome-launcher');

const ROOT_DIR = path.join(__dirname, '..');

ipcMain.on('RUN_TEST', (event, auditForm) => {
    const { reportFormat, interactive } = auditForm;
    // To attach the dialog to its parent window:
    const parentWin = BrowserWindow.getAllWindows()
        .find(win => win.name === 'MAIN_WINDOW');

    if (interactive) {
        testWebsiteAndCreateReport(auditForm).then(report => {
            report = JSON.parse(report);
            console.log(report.audits);
        })
    } else {
        dialog.showSaveDialog(parentWin, {
            message: 'Choose a directory to store report.',
            filters: [{ name: 'Report', extensions: [reportFormat] }]
        })
        .then(({ canceled, filePath }) => {
            if (!canceled && !!filePath) {
                testWebsiteAndCreateReport(auditForm).catch((err) => {
                    console.log(err);
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
});

// Write Lighthouse's test report in a html file.
async function testWebsiteAndCreateReport({ url, filePath, reportFormat, isCustom, interactive }) {
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

    // console.log(runnerResult.report);

    // `.report` is the HTML report as a string
    const report = runnerResult.report;

    if (interactive) {
        return report;
    } else {
        fs.writeFileSync(filePath, report);
    }

    // `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult.lhr.finalUrl);
    console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

    await chrome.kill();
}

// A Lighthouse Custom Config Sample
const customConfig = {
    extends: 'lighthouse:default',
    settings: {
        // onlyCategories: ['performance'],
        onlyAudits: [
            'first-meaningful-paint'
            // 'speed-index',
            // 'first-cpu-idle',
            // 'interactive',
        ],
    }
};
