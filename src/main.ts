import Item from "./models/Item";
import { addNewItemList, searchItems } from "./controller";
import { backupDataFile } from "./database";

const { app, BrowserWindow, ipcMain } = require('electron');


let mainWindow: any = null;

app.whenReady().then(() => {
    createWindow();
    backupDataFile();
    addNewItemList();
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

    mainWindow.loadFile('src/static/index.html').then(() => renderItems(searchItems('')));
}

const renderItems = (items: Item[]) => mainWindow.webContents.send('render-items', items);

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

ipcMain.on('open-tags-window', (event: any, location: string) => {
    const tagPoolWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            additionalArguments: [location]
        }
    });

    tagPoolWindow.loadFile('src/static/tagpool.html');
});
