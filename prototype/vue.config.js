module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,

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

            // If you are using Yarn Workspaces, you may have multiple node_modules folders
            // List them all here so that VCP Electron Builder can find them
            // nodeModulesPath: ['../../node_modules', './node_modules']
        }
    }
};
