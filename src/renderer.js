const {ipcRenderer} = require('electron');
const rootPath = require('app-root-path');
const components = require(`${rootPath}/src/components`);

const itemList = document.querySelector('.container .item-list');
const searchBox = document.querySelector('body > div > form > div.col-9 > input');
const searchButton = document.querySelector('body > div > form > div.col-3 > button');

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

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    ipcRenderer.invoke('sendQuery', searchBox.value).then(items => renderItems(items));
});
