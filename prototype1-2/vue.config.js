module.exports = {
    configureWebpack: config => {
        // config.node = true;
        config.node.global = false;
        config.node.__dirname = false;
        config.node.__filename = false;
    }
};
