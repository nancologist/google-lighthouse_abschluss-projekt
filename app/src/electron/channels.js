const { BrowserWindow, ipcMain, dialog } = require('electron');
const http = require('http');
const https = require('https');
const { throttling: { desktopDense4G } } = require('lighthouse/lighthouse-core/config/constants.js');
const { runLighthouse, getAllSitemapUrls } = require('./utils.js');

// __dirname => electron_dist/

ipcMain.on('RUN_TEST', async(event, auditForm, urls) => {
    const reports = [];
    for (url of urls) {
        try {
            let report = await runLighthouse(auditForm, url);
            report = JSON.parse(report);
            report.audits.url = url;
            // console.log(report);
            reports.push(report.audits);
            event.reply('PROGRESS', 1 / urls.length);
        } catch (err) {
            console.log(err);
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
    // Todo: check if sitemapUrl uses http protocol, so:
    // http.get(sitemapUrl, (res) => { ... });

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
