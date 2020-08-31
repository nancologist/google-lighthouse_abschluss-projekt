module.exports = {
    pages: {
        index: {
            entry: 'src/vue/main.js',
            template: 'public/index.html',
            title: 'DPX Lighthouse',
        },
    },
    pluginOptions: {
        electronBuilder: {
            /*
            * Mori:
            * List of nativ deps (which for example use __dirname and other
            *  node global variables). If these deps are injected in a
            *  bundled module, through webpack, like background.js, they
            *  cause errors because the global variables do not have their
            *  origin values, so these deps should be added to the following
            *  list:
            * */
            externals: ['lighthouse'],
            mainProcessFile: 'src/electron/index.js',
            nodeIntegration: true
        }
    }
};
