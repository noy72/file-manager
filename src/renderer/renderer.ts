const {ipcRenderer, remote} = require('electron');
const {Menu, MenuItem} = remote;
const components = require('./components');
const {itemTypes} = require('../model');

const itemList = document.querySelector('.container .item-list');
const searchBox = document.querySelector('.form-control');
const searchButton = document.querySelector('.btn-primary');

ipcRenderer.on('render-items', (event: any, items: any) => {
    renderItems(items);
});

const renderItems = (items: any) => {
    const itemEntries = Object.entries(items)
        .sort((a, b) => a[0].localeCompare(b[0]));
    let cardListElements = '';
    for (const [dirPath, itemInfo] of itemEntries) {
        cardListElements += components.itemCard(dirPath, itemInfo)
    }
    itemList.innerHTML = cardListElements;
    for (let index = 0; index < itemEntries.length; index++) {
        const dirPath = itemEntries[index][0];

        itemList.childNodes.item(index)
            .addEventListener('click', () => openItemWithExternalApp(...itemEntries[index]));
        itemList.childNodes.item(index)
            .addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const menu = new Menu();
                menu.append(new MenuItem({
                    label: 'Tags', click() {
                        ipcRenderer.send('open-tags-window', dirPath)
                    }
                }));
                menu.append(new MenuItem({
                    label: 'Open', click() {
                        ipcRenderer.send('open-item', [dirPath, itemTypes.DIR]);
                    }
                }));
                menu.popup(
                    {
                        window: remote.getCurrentWindow()
                    }
                )
            }, false);
    }
};

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    ipcRenderer.invoke('send-query', searchBox.value).then((items: any) => renderItems(items));
});

const openItemWithExternalApp = (dirPath: string, {type: dirType}: { type: number }) => {
    ipcRenderer.send('open-item', [dirPath, dirType]);
};

