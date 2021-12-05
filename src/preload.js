// To-Do Plus
// preload.ts
// @author Miroslav Safar (xsafar23)

const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld("electron",
    {
        ipcRenderer: ipcRenderer,
        receive: function(channel, listener) {
            ipcRenderer.on(channel, listener);
        }
    });