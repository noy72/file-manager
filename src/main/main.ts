import { app, BrowserWindow, ipcMain } from 'electron';
import { backupDataFile } from './infrastructure/database';
import { addItems, getNewItems } from './repositories/itemRepository';


let mainWindow: BrowserWindow | any = null;

app.whenReady().then(() => {
    createWindow();
    backupDataFile();
    addItems(getNewItems());
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

    mainWindow.loadFile('src/static/index.html');
}

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

ipcMain.on('open-tag-modal', (event: any, location: string) => {
    const { width, height } = mainWindow.getBounds();
    const tagModal = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            additionalArguments: [location]
        },
        parent: mainWindow,
        modal: true,
        show: false
    });

    tagModal.loadFile('src/static/tag.html').then(() => tagModal.show());
});