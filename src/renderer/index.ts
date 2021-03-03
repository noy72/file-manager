import { ipcRenderer, remote } from 'electron';
import * as components from './components';
import { searchItems } from "../domain/service";
import { Item } from "../models/Item";
import Directory from "../models/Directory";
import { deleteItem } from '../repositories/itemRepository';

const { Menu, MenuItem } = remote;

const itemList = <HTMLElement>document.querySelector('#items');
const searchBox = <HTMLInputElement>document.querySelector('#search-box');
const searchButton = <HTMLElement>document.querySelector('#search-icon');
const form = <HTMLInputElement>document.querySelector("#form");

ipcRenderer.on('render', () => render());

remote.getCurrentWindow().on('ready-to-show', () => render());

form.addEventListener('submit', (e) => {
    e.preventDefault();
    render();
});

searchButton.addEventListener('click', () => render());

const render = () => renderItems(searchItems(searchBox.value));

const renderItems = (items: Item[]) => {
    itemList.innerHTML = "";
    items.forEach(item => {
        const itemCardElement = components.createItemCardElement(item);
        itemCardElement.addEventListener('click', () => item.open());
        itemCardElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const menu = new Menu();
            menu.append(new MenuItem({
                label: 'Tags', click() {
                    ipcRenderer.send('open-tag-modal', item.location);
                }
            }));
            if (item.isDir()) {
                const directory = new Directory(item);
                menu.append(new MenuItem({
                    label: 'Open', click() {
                        directory.open();
                    }
                }));
            }
            menu.append(new MenuItem({
                label: 'Delete', click() {
                    deleteItem(item.location);
                    render();
                }
            }));
            menu.popup({ window: remote.getCurrentWindow() });
        }, false);
        itemList.appendChild(itemCardElement);
    });
};