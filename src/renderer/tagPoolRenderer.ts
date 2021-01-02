const {ipcRenderer} = require('electron');
const remote = require('electron').remote;
const components = require('./components');
const {writeTags} = require("../database");

const tagList = document.querySelector('.tag-list');
const submitButton = document.querySelector('.btn-primary');

let dirPath: string | null = null;

ipcRenderer.on('render-tags', (event: any, [allTags, itemTags, _dirPath]: [any, string[], string]) => {
    dirPath = _dirPath;
    renderTags(allTags, itemTags);
});

//TODO: reduceを使う
const renderTags = (allTags: any, itemTags: string[]) => tagList.innerHTML = Object.entries(allTags)
    .map(([groupName, tags]) => `
        <div>
            <h2>${groupName}</h2>
            ${tags.map(tag => components.tag(itemTags.includes(tag), tag)).join(' ')}
        </div>
        <hr>
    `).join(' ');

submitButton.addEventListener('click', () => {
    updateTags();
    remote.getCurrentWindow().close();
});

const updateTags = () => {
    const checkBoxes = Array.from(document.querySelectorAll('.form-check-input'));
    const checkedTags = checkBoxes
        .filter(checkBox => checkBox.checked)
        .map(checkBox => checkBox.value);
    writeTags(dirPath, checkedTags);
};
