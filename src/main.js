const fs = require('fs');
const rootPath = require('app-root-path');
const {app, dialog, BrowserWindow} = require('electron');

const jsonio = require(`${rootPath}/src/utils/jsonio`);
const {syncDataFileWithItems} = require(`${rootPath}/src/controller`);

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

const backupDataFile = () => fs.copyFile('data.json', 'data.backup.json', () => console.log("data.json backed up."));

const syncDataFile = () => jsonio.write('data.json', syncDataFileWithItems(jsonio.read('data.json')));

app.whenReady().then(() => {
    createWindow();
    backupDataFile();
    syncDataFile();
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


