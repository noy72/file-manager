const fs = require('fs');

const {app, dialog, BrowserWindow} = require('electron');

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('src/index.html');
}

app.whenReady().then(() => {
    createWindow();
    readDataFile();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

function readDataFile() {
    //TODO: ファイルが存在しない時の処理
    const data = JSON.parse(fs.readFileSync('data.json').toString());
    console.log(data);
}


