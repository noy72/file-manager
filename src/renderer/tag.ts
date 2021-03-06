import { remote } from "electron";
import * as components from "./components";
import { getItem, updateAttachedTags } from "../repositories/itemRepository";
import { getTags, updateTags } from "../repositories/tagRepository";
import { isValidTagString, parseTagString } from "../domain/service/tag";

const tagList = <HTMLElement>document.querySelector('#tags');
const tagInputBox = <HTMLInputElement>document.querySelector('#add-tag-box');
const addButton = <HTMLElement>document.querySelector('#add-tag-button');
const submitButton = <HTMLElement>document.querySelector('#submit-button');

remote.getCurrentWindow().once('ready-to-show', () => renderTagList());

/**アイテムにタグを設定し，ウィンドウを閉じる */
submitButton.addEventListener('click', (e) => {
    const checkBoxes = <HTMLInputElement[]>Array.from(document.querySelectorAll('.tag'));
    const checkedTags = checkBoxes
        .filter(checkBox => checkBox.checked)
        .map(checkBox => checkBox.value);
    updateAttachedTags(getCurrentLocation(), checkedTags);

    remote.getCurrentWindow().close();
});

/**タグをタグリストに追加する */
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (isValidTagString(tagInputBox.value)) {
        const [group, tag] = parseTagString(tagInputBox.value);
        updateTags(group, tag);
        renderTagList();
        tagInputBox.value = "";
    }
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