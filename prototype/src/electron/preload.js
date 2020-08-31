// All Node.js APIs are available in the preload-process.
// It has the same sandbox as a Chrome extension.

/*
* Mori:
* This module expose only the needed node codes to the script, which are
 needed, and this is a safer approach than using "nodeIntegration: true",
 * which expose everything to the script.
 * */

// const { ipcRenderer } = require('electron');
// window.dispatchToE = ipcRenderer.send;

// LAST STATUS : WE USE nodeIntegration : true INSTEAD.
