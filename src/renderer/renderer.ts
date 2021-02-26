import { ipcRenderer, remote } from 'electron';
import { statSync } from "fs";
import { spawn } from 'child_process';
import * as components from './components';
import { searchItems } from "../controller";
import { getApplicationList, getItem } from "../database";
import Item from "../models/Item";
import Directory from "../models/Directory";

const { Menu, MenuItem } = remote;

const itemList = <HTMLElement>document.querySelector('.container .item-list');
const searchBox = <HTMLInputElement>document.querySelector('.form-control');
const searchButton = <HTMLElement>document.querySelector('.btn-primary');

const applicationPaths = getApplicationList();

ipcRenderer.on('render-items', (event: any, items: Item[]) => {
    renderItems(items);
});

const renderItems = (items: Item[]) => {
    itemList.innerHTML = "";
    items.forEach(item => {
        const itemCardElement = components.createItemCardElement(item);
        itemCardElement.addEventListener('click', () => openItemWithExternalApp(item));
        itemCardElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const menu = new Menu();
            menu.append(new MenuItem({
                label: 'Tags', click() {
                    ipcRenderer.send('open-tags-window', item.location)
                }
            }));
            if (statSync(item.location).isDirectory()) {
                const directory = <Directory>item;
                menu.append(new MenuItem({
                    label: 'Open', click() {
                        directory.type = Directory.TYPES.other;
                        openItemWithExternalApp(directory);
                    }
                }));
            }
            menu.popup({ window: remote.getCurrentWindow() });
        }, false);
        itemList.appendChild(itemCardElement);
    });
};

const openItemWithExternalApp = (item: Item) => {
    if (statSync(item.location).isDirectory()) {
        const [command, args] = applicationPaths[(<Directory>item).type];
        spawn(command, [...args, item.location]);
    }
};

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    renderItems(searchItems(searchBox.value));
});


