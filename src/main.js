const fs = require('fs');
const rootPath = require('app-root-path');
const {app, BrowserWindow} = require('electron');

const jsonio = require(`${rootPath}/src/utils/jsonio`);
const {syncDataFileWithItems, getAllItems} = require(`${rootPath}/src/controller`);

let mainWindow = null;

app.whenReady().then(() => {
    createWindow();
    backupDataFile();
    syncDataFile();
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('src/index.html');
    mainWindow.webContents.once('did-finish-load', function () {
        renderItems(getAllItems());
    });
}

const renderItems = (items) => BrowserWindow.getFocusedWindow().webContents.send('renderItems', items);

const backupDataFile = () => fs.copyFile('data.json', 'data.backup.json', () => console.log("data.json backed up."));

const syncDataFile = () => jsonio.write('data.json', syncDataFileWithItems(jsonio.read('data.json')));


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

