const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld("electron",
    {
        ipcRenderer: ipcRenderer,
        // @ts-ignore
        receive: function(channel, listener) {
            console.log("Registering listener for channel " + channel)
            ipcRenderer.on(channel, listener);
        }
    });