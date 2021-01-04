import {ipcRenderer, remote} from "electron";
import * as components from "./components";
import {getTagList, updateAttachedTags} from "../database";
import Item from "../models/Item";

const tagList = <HTMLElement>document.querySelector('.tag-list');
const submitButton = <HTMLElement>document.querySelector('.btn-primary');

let location = '';

ipcRenderer.on('render-tags', (event: any, item: Item) => {
    location = item.location; // TODO: renderしているときに初期化している
    tagList.innerHTML = "";
    components.createTagGroupElements(getTagList(), item.tags)
        .forEach(tagGroupElement => tagList.appendChild(tagGroupElement))
});

submitButton.addEventListener('click', () => {
    updateTags();
    remote.getCurrentWindow().close();
});

const updateTags = () => {
    const checkBoxes = <HTMLInputElement[]>Array.from(document.querySelectorAll('.form-check-input'));
    const checkedTags = checkBoxes
        .filter(checkBox => checkBox.checked)
        .map(checkBox => checkBox.value);
    updateAttachedTags(location, checkedTags);
};
