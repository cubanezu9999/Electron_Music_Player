const { contextBridge, ipcRenderer } = require('electron');


const API = {
    sendMsg: (msg) => ipcRenderer.send("message", msg),
    fileName: (callback) => ipcRenderer.on("file-path", (event, args) => {
        callback(args);

    }),

}

contextBridge.exposeInMainWorld("api", API)