import { join, basename } from 'path';
import { exists } from '../infrastructure/file';
import { Item } from '../models/Item';

const htmlStringToElement = (htmlStr: string): HTMLElement => {
    const template = document.createElement("template");
    template.innerHTML = htmlStr;
    // @ts-ignore
    return template.content.firstElementChild;
};

//TODO: サムネイルが存在しないときの処理
//TODO: 画像サイズの制限
const createItemCardElement = (item: Item): HTMLElement => htmlStringToElement(`
<div class="column">
    <div class="ui fluid link ${exists(item.location) ? "" : "red"} card">
        <div class="image">
            <img src="${item.thumbnailPath()}">
        </div>
        <div class="content">
            <div class="header">${basename(item.location)}</div>
            <div class="ui basic labels description">
                ${(item.tags.map(tag => `<span class="ui label">${tag}</span>`)).join(' ')}
            </span>
        </div>
    </div>
</div>`);

const createTagGroupElements = (allTags: object, attachedTags: string[]): HTMLElement[] =>
    Object.entries(allTags)
        .map(([groupName, tags]) =>
            createTagGroupElement(groupName, tags, attachedTags));

const createTagGroupElement = (groupName: string, tags: string[], checkedTags: string[]): HTMLElement => htmlStringToElement(`
<div>
    <h2>${groupName}</h2>
    <div class="ui form">
        <div class="inline fields">
            ${tags.map(tag => createTagHtmlString(checkedTags.includes(tag), tag)).join(' ')}
        </div>
    </div>
</div>
<hr>`);

const createTagHtmlString = (checked: boolean, name: string): string => `
<div class="ui ${checked ? "checked" : ""} checkbox">
    <input type="checkbox" ${checked ? "checked" : ""} class="tag" id="${name}" value="${name}">
    <label for="${name}">${name}</label>
</div>`;


export { createItemCardElement, createTagGroupElements };
