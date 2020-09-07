module.exports = {
    pages: {
        index: {
            entry: 'src/vue/main.js',
            template: 'public/index.html',
            title: 'DPX Lighthouse'
        }
    },
    pluginOptions: {
        electronBuilder: {
            externals: [
                'lighthouse'
            ],
            mainProcessFile: 'src/electron/electron.js',
            nodeIntegration: true
        }
    },
    transpileDependencies: [
        'vuetify'
    ]
};
