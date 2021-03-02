import { remote } from "electron";
import * as components from "./components";
import { getItem, updateAttachedTags } from "../repositories/itemRepository";
import { getTags, updateTags } from "../repositories/tagRepository";

const tagList = <HTMLElement>document.querySelector('.tag-list');
const tagInputBox = <HTMLInputElement>document.querySelector('.form-control');
const addButton = <HTMLElement>document.querySelector('.add-button');
const submitButton = <HTMLElement>document.querySelector('.btn-primary');

remote.getCurrentWindow().once('ready-to-show', () => renderTagList());

/**アイテムにタグを設定し，ウィンドウを閉じる */
submitButton.addEventListener('click', () => {
    const checkBoxes = <HTMLInputElement[]>Array.from(document.querySelectorAll('.form-check-input'));
    const checkedTags = checkBoxes
        .filter(checkBox => checkBox.checked)
        .map(checkBox => checkBox.value);
    updateAttachedTags(getCurrentLocation(), checkedTags);

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
    updateTags(group, tag);
    renderTagList();
});

const renderTagList = () => {
    const location = getCurrentLocation();
    const item = getItem(location);
    if (item === undefined) {
        throw new Error(`"${location}" is invalid path.`);
    }

    tagList.innerHTML = "";
    components.createTagGroupElements(getTags(), item.tags)
        .forEach(tagGroupElement => tagList.appendChild(tagGroupElement));
};



/**現在対象にとっているitemのlocationを返す． */
const getCurrentLocation = () => process.argv[process.argv.length - 1];