const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const xml2js = require('xml2js');

const customConfig = {
    extends: 'lighthouse:default',
    settings: {
        // onlyCategories: ['performance'],
        onlyAudits: [],
    }
};

// Write Lighthouse's test report in a html file.
exports.runLighthouse = async function(auditForm, url) {
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
    const runtimeErr = runnerResult.lhr.runtimeError;
    if (runtimeErr) throw {...runtimeErr};
    return runnerResult.report;
};

// XML -> POJO
exports.getAllSitemapUrls = function(sitemapFilePath, sitemapFromUrl) {
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
};

function parseSitemapXml(data, parser, promiseRes, promiseRej) {
    let urls = [];
    parser.parseString(data, (err, xmlDoc) => {
        // Todo: Add Nested-Sitemaps Logic
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
}
