const fs = require('fs');
const spawn = require('child_process').spawn;
const rootPath = require('app-root-path');
const {app, BrowserWindow, ipcMain} = require('electron');

const jsonio = require(`${rootPath}/src/utils/jsonio`);
const {syncDataFileWithItems, searchItems} = require(`${rootPath}/src/controller`);

let mainWindow = null;
let applicationPaths = null;

app.whenReady().then(() => {
    createWindow();
    backupDataFile();
    syncDataFile();
    applicationPaths = readApplicationPaths();
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
        renderItems(searchItems(''));
    });
}

const renderItems = (items) => BrowserWindow.getFocusedWindow().webContents.send('renderItems', items);

const backupDataFile = () => fs.copyFile('data.json', 'data.backup.json', () => console.log("data.json backed up."));

const syncDataFile = () => jsonio.write('data.json', syncDataFileWithItems(jsonio.read('data.json')));

const readApplicationPaths = () => jsonio.read('data.json')['applications'];

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

ipcMain.handle('sendQuery', async (event, query) => searchItems(query));

ipcMain.on('openItem', (event, [dirPath, dirType]) => {
    const [command, args] = applicationPaths[dirType];
    spawn(command, [...args, dirPath]);
});
