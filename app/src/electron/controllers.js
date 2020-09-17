const { BrowserWindow, ipcMain, dialog, getCurrentWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const lighthouse = require('lighthouse');
const { throttling: { desktopDense4G } } = require('lighthouse/lighthouse-core/config/constants.js');
const chromeLauncher = require('chrome-launcher');
const xml2js = require('xml2js');

// __dirname => electron_dist/

ipcMain.on('RUN_TEST', (event, auditForm) => {
    // To attach the dialog to its parent window:
    const parentWin = BrowserWindow.getAllWindows()
        .find((win) => win.name === 'MAIN_WINDOW');

    testWebsiteAndCreateReport(auditForm)
        .then((report) => {
            report = JSON.parse(report);
            if (report.audits) {
                event.reply('REPORT_CREATED', report.audits);
            } else {
                console.log('Report not found!!!');
            }
        })
        .catch((err) => {
            // TODO: 'event.reply('ON_ERROR')'
            console.log(err);
        });
    // else {
    //     dialog.showSaveDialog(parentWin, {
    //         message: 'Choose a directory to store report.',
    //         filters: [{ name: 'Report', extensions: ['html'] }]
    //     })
    //         .then(({ canceled, filePath }) => {
    //             if (!canceled && !!filePath) {
    //                 testWebsiteAndCreateReport(auditForm, filePath).catch((err) => {
    //                     console.log(err);
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }
});

ipcMain.on('RUN_POWERTEST', async(event, auditForm) => {
    let urls = [];
    const reports = [];
    try {
        urls = await getAllSitemapUrls(auditForm.sitemapPath);
        for (url of urls) {
            auditForm.url = url;
            let report = await testWebsiteAndCreateReport(auditForm);
            report = JSON.parse(report);
            report.audits.url = url;
            reports.push(report.audits);
            event.reply('PROGRESS', 1 / urls.length);
        }
    } catch (err) {
        // TODO: 'event.reply('ON_ERROR')'
        console.log(err);
    }

    event.reply('REPORT_CREATED', reports);
});

const customConfig = {
    extends: 'lighthouse:default',
    settings: {
        // onlyCategories: ['performance'],
        onlyAudits: [],
    }
};

// Write Lighthouse's test report in a html file.
async function testWebsiteAndCreateReport(auditForm, filePath = '') {
    const {
        url,
        isCustom,
        configs
    } = auditForm;
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

    const options = {
        logLevel: 'info', // Todo: Change for production
        output: 'json',
        // onlyCategories: ['performance'],
        port: chrome.port
    };

    let runnerResult;
    if (isCustom) {
        const customAudits = configs.audits.map((audit) => audit.id);
        customConfig.settings.onlyAudits = customAudits;
        runnerResult = await lighthouse(url, options, customConfig);
    } else {
        runnerResult = await lighthouse(url, options);
    }

    await chrome.kill();
    return runnerResult.report;

    // Export
    // fs.writeFileSync(filePath, report);

    await chrome.kill();
}

// XML -> POJO
function getAllSitemapUrls(xmlPath) {
    let urls = [];
    const parser = new xml2js.Parser();
    return new Promise((resolve, reject) => {
        fs.readFile(xmlPath, (err, data) => {
            if (err) reject(err);
            parser.parseString(data, (err, xmlDoc) => {
                if (err) reject(err);
                urls = xmlDoc.urlset.url.map((el) => el.loc[0]);
                resolve(urls);
            });
        });
    });
}
