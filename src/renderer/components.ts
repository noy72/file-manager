import {join, basename} from 'path';
import Item from "../models/Item";

const htmlStringToElement = (htmlStr: string): HTMLElement => {
    const template = document.createElement("template");
    template.innerHTML = htmlStr;
    // @ts-ignore
    return template.content.firstElementChild;
};

//TODO: サムネイルが存在しないときの処理
//TODO: 画像サイズの制限
const createItemCardElement = (item: Item): HTMLElement => htmlStringToElement(`
<div class="col">
    <div class="card">
        <img src="${join(item.location, item.thumbnail)}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${basename(item.location)}</h5>
            <p class="card-text">タグとか並べる？</p>
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
    ${tags.map(tag => createTagHtmlString(checkedTags.includes(tag), tag)).join(' ')}
</div>
<hr>`);

const createTagHtmlString = (checked: boolean, name: string): string => `
<div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" ${checked ? "checked" : ""} id="${name}" value="${name}">
    <label class="form-check-label" for="${name}">${name}</label>
</div>`;


export {createItemCardElement, createTagGroupElements};
