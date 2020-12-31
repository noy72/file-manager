const {ipcRenderer} = require('electron');
const components = require('./components');

const tagList = document.querySelector('.tag-list');
const submitButton = document.querySelector('.btn-primary');

submitButton.addEventListener('click', () => f());

ipcRenderer.on('render-tags', (event, [allTags, itemTags]) => {
    renderTags(allTags, itemTags);
});

//TODO: reduceを使う
const renderTags = (allTags, itemTags) => tagList.innerHTML = Object.entries(allTags)
    .map(([groupName, tags]) => `
        <div>
            <h2>${groupName}</h2>
            ${tags.map(tag => components.tag(tag in itemTags, tag)).join(' ')}
        </div>
        <hr>
    `).join(' ');

const f = () => {
    const checkBoxes = document.querySelectorAll('.form-check-input');
    for (const checkBox of checkBoxes) {
        console.log(checkBox.value, checkBox.checked)
    }
};
