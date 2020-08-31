module.exports = {
    pluginOptions: {
        electronBuilder: {
            /*
            * Mori:
            * <<< PRELOAD.JS INSTEAD OF NODEINTEGRATION: TRUE >>>
            * nodeIntegration is set to false since ElectronJS 5+, and it
            *  prevents that file systems get exposed to the node packages
            *  and script.
            *  Specially it could be dangerous if the package connects to
            *  the internet, so for the security reasons we use preload.js
            *  and there we expose (import) only what we need through "window"
            *  object.
            * */
            // nodeIntegration: true,

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
