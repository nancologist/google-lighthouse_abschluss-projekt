const { BrowserWindow, ipcMain, dialog, getCurrentWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const lighthouse = require('lighthouse');
const { throttling: { desktopDense4G } } = require('lighthouse/lighthouse-core/config/constants.js');
const chromeLauncher = require('chrome-launcher');
const xml2js = require('xml2js');

// __dirname => electron_dist/

const customConfig = {
    extends: 'lighthouse:default',
    settings: {
        // onlyCategories: ['performance'],
        onlyAudits: [],
    }
};

ipcMain.on('RUN_TEST', async(event, auditForm, urls) => {
    const reports = [];
    for (url of urls) {
        try {
            let report = await testWebsiteAndCreateReport(auditForm, url, event);
            report = JSON.parse(report);
            report.audits.url = url;
            reports.push(report.audits);
            event.reply('PROGRESS', 1 / urls.length);
        } catch (err) {
            err.details = `Failed: ${url}`;
            event.reply('ON_ERROR', {...err});
            return;
        }
    }
    event.reply('REPORT_CREATED', reports);
});

ipcMain.on('ANALYSE_SITEMAP_FILE', async (event, sitemapPath) => {
    getAllSitemapUrls(sitemapPath, null)
        .then((urls) => {
           event.reply('SITEMAP_ANALYSED', urls)
        })
        .catch((err) => {
            event.reply('ON_ERROR_XML', {...err});
        });
});

ipcMain.on('ANALYSE_SITEMAP_URL', (event, sitemapUrl) => {
    let xml;
    // Todo: check if sitemapUrl uses http protocal, so:
    // http.get(sitemapUrl, ...);

    https.get(sitemapUrl, (res) => {
        res.on('data', (chunk) => {
            if (chunk) xml += chunk;
        });
        res.on('error', (err) => {
            // Todo: Forword Error with event.reply()
            console.log(err);
        });

        res.on('end', () => {
            getAllSitemapUrls(null, xml)
                .then((urls) => {
                    event.reply('SITEMAP_ANALYSED', urls);
                })
                .catch((err) => {
                    event.reply('ON_ERROR_XML', {...err});
                });
        });
    });
});

// ipcMain.on('EXPORT_REPORT', (event, args) => {
//     // To attach the dialog to its parent window:
//     const parentWin = BrowserWindow.getAllWindows()
//     .find((win) => win.name === 'MAIN_WINDOW');
// })

// Write Lighthouse's test report in a html file.
async function testWebsiteAndCreateReport(auditForm, url, event) {
    const {
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
    if (configs.audits.length > 0) {
        const customAudits = configs.audits.map((audit) => audit.id);
        customConfig.settings.onlyAudits = customAudits;
        runnerResult = await lighthouse(url, options, customConfig);
    } else {
        runnerResult = await lighthouse(url, options);
    }
    await chrome.kill();
    runtimeErr = runnerResult.lhr.runtimeError;
    if (runtimeErr) {
        throw {...runtimeErr};
        return
    }
    return runnerResult.report;
}

// XML -> POJO
function getAllSitemapUrls(sitemapFilePath, sitemapFromUrl) {
    let urls = [];
    const parser = new xml2js.Parser();
    return new Promise((resolve, reject) => {
        if (sitemapFilePath) {
            fs.readFile(sitemapFilePath, (err, data) => {
                if (err) return reject(err);
                parseSitemapXml(data, parser, resolve, reject);
            });
        } else if (sitemapFromUrl) {
            if (!sitemapFromUrl.startsWith('<?xml')) {
                const index = sitemapFromUrl.indexOf('<?xml');
                sitemapFromUrl = sitemapFromUrl.substring(index);
            }
            parseSitemapXml(sitemapFromUrl, parser, resolve, reject);
        }
    });
}

function parseSitemapXml(data, parser, promiseRes, promiseRej) {
    parser.parseString(data, (err, xmlDoc) => {
        if (err) {
            promiseRej({
                title: 'Corrupted/Invalid XML',
                message: 'The provided XML is either corrupted' +
                    ' or invalid.'
            });
            return;
        }
        urls = xmlDoc.urlset.url.map((el) => el.loc[0]);
        promiseRes(urls);
    });
};
