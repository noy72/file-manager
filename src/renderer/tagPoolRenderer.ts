import { ipcRenderer, remote } from "electron";
import * as components from "./components";
import { getItem, getTagList, updateAttachedTags, updateTagList } from "../database";
import Item from "../models/Item";
import { exception } from "console";
import { isTaggedTemplateExpression } from "typescript";

const tagList = <HTMLElement>document.querySelector('.tag-list');
const tagInputBox = <HTMLInputElement>document.querySelector('.form-control');
const addButton = <HTMLElement>document.querySelector('.add-button');
const submitButton = <HTMLElement>document.querySelector('.btn-primary');

remote.getCurrentWindow().once('ready-to-show', () => renderTagList());

ipcRenderer.on('render-tags', (event: any, _location: string) => {
    var location = _location;
    renderTagList();
});

/**アイテムにタグを設定し，ウィンドウを閉じる */
submitButton.addEventListener('click', () => {
    updateTags();
    remote.getCurrentWindow().close();
});

/**タグをタグリストに追加する */
addButton.addEventListener('click', () => {
    const word = tagInputBox.value.split(':');
    if (word.length > 2) {
        console.error('タグにコロンは2つ以上含められません．');
        return;
    }

    const [group, tag] = word.length == 2 ? word : ['Prop', word[0]];
    if (tag.length === 0) return;
    updateTagList(group, tag);
    renderTagList();
});

const renderTagList = () => {
    const location = getCurrentLocation();
    const item = getItem(location);
    if (item === undefined) {
        throw exception(`"${location}" is invalid path.`);
    }

    tagList.innerHTML = "";
    components.createTagGroupElements(getTagList(), item.tags)
        .forEach(tagGroupElement => tagList.appendChild(tagGroupElement));
};


const updateTags = () => {
    const checkBoxes = <HTMLInputElement[]>Array.from(document.querySelectorAll('.form-check-input'));
    const checkedTags = checkBoxes
        .filter(checkBox => checkBox.checked)
        .map(checkBox => checkBox.value);
    updateAttachedTags(getCurrentLocation(), checkedTags);
};

/**現在対象にとっているitemのlocationを返す． */
const getCurrentLocation = () => process.argv[process.argv.length - 1];