const {ipcRenderer, remote} = require('electron');
const {Menu, MenuItem} = remote;
const components = require('./components');

const itemList = document.querySelector('.container .item-list');
const searchBox = document.querySelector('body > div > form > div.col-9 > input');
const searchButton = document.querySelector('body > div > form > div.col-3 > button');

ipcRenderer.on('renderItems', (event, items) => {
    renderItems(items);
});

const renderItems = (items) => {
    const itemEntries = Object.entries(items)
        .sort((a, b) => a[0].localeCompare(b[0]));
    let cardListElements = '';
    for (const [dirPath, itemInfo] of itemEntries) {
        cardListElements += components.itemCard(dirPath, itemInfo)
    }
    itemList.innerHTML = cardListElements;
    for (let index = 0; index < itemEntries.length; index++) {
        itemList.childNodes.item(index)
            .addEventListener('click', () => openItemWithExternalApp(...itemEntries[index]))
        itemList.childNodes.item(index)
            .addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const menu = new Menu();
                menu.append(new MenuItem({
                    label: 'Tags', click() {
                        const dirPath = itemEntries[index][0];
                        ipcRenderer.send('open-tags-window', dirPath)
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
    ipcRenderer.invoke('sendQuery', searchBox.value).then(items => renderItems(items));
});

const openItemWithExternalApp = (dirPath, {type: dirType}) => {
    ipcRenderer.send('openItem', [dirPath, dirType]);
};

