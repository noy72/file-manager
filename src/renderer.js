const {ipcRenderer} = require('electron');
const rootPath = require('app-root-path');
const components = require(`${rootPath}/src/components`);

const itemList = document.querySelector('.container .item-list');

ipcRenderer.on('renderItems', (event, items) => {
    renderItems(items);
});

const renderItems = (items) => {
    let cardListElements = '';
    for (const [dirPath, itemInfo] of Object.entries(items)) {
        cardListElements += components.itemCard(dirPath, itemInfo)
    }
    itemList.innerHTML = cardListElements;
};

