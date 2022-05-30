const { app, BrowserWindow, ipcMain } = require('electron')
const { join } = require('path');
const { dialog } = require('electron');


app.whenReady().then(main);

function main() {
    const window = new BrowserWindow({

        icon: "./images/audio_file.png",
        width: 860,
        height: 640,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, "/preload.js"),
            experimentalFeatures: true,
        }
    })

    window.loadFile('index.html');

    window.on("ready-to-show", window.show);
    window.on("resized", () => {
        console.log(window.getSize());
    })
    ipcMain.on("message", (event, args) => {

        dialog.showOpenDialog({
            title: "Open Music Files",
            buttonLabel: "Open",
            properties: ["openFile"],
            filters: [
                { name: "Music Files", extensions: ["mp3", "wma", "wav"] }
            ]
        }).then(result => {
            try {
                callback(result.filePaths)


            } catch {

                window.webContents.send("file-path", result.filePaths);



            }

        })

    })
}