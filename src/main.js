const {syncDataFile} = require("./controller");
const spawn = require('child_process').spawn;
const {app, BrowserWindow, ipcMain} = require('electron');

const {searchItems} = require('./controller');
const {readAllTags, readTags, readApplicationPaths, backupDataFile} = require('./database');

let mainWindow = null;
const applicationPaths = readApplicationPaths();

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

const renderItems = (items) => BrowserWindow.getFocusedWindow().webContents.send('render-items', items);

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

ipcMain.handle('send-query', async (event, query) => searchItems(query));

ipcMain.on('open-item', (event, [dirPath, dirType]) => {
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
