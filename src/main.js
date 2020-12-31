const fs = require('fs');
const spawn = require('child_process').spawn;
const {app, BrowserWindow, ipcMain} = require('electron');

const jsonio = require('./utils/jsonio');
const {syncDataFileWithItems, searchItems} = require('./controller');
const {readAllTags, readTags, readApplicationPaths} = require('./database');

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
            nodeIntegration: true,
            enableRemoteModule: true,
            devTools: true
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

ipcMain.on('open-tags-window', (event, dirPath) => {
    const tagPoolWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    tagPoolWindow.loadFile('src/tagpool.html');
    tagPoolWindow.webContents.once('did-finish-load', () => {
        tagPoolWindow.send('render-tags', [readAllTags(), readTags(dirPath), dirPath])
    });
});
