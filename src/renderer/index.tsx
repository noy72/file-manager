import { ipcRenderer, remote } from 'electron';
import React, { MouseEvent, FormEvent, RefObject, createRef, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import { Item } from "../main/models/Item";
import Directory from "../main/models/Directory";
import { deleteItem } from '../main/repositories/itemRepository';
import { ItemOrder, searchItems } from '../main/domain/service/item';
import ItemCards from './components/ItemCards';
import Selector from './components/Selector';
import { flash } from '../main/infrastructure/lowdb';

const { Menu, MenuItem } = remote;

const selectorOptions: [ItemOrder, string][] = [
    ["createdAt_desc", "追加日（降順）"],
    ["createdAt_asc", "追加日（昇順）"],
    ["title_asc", "名前（昇順）"],
];

type State = {
    items: Item[],
};

class Content extends React.Component<{}, State> {
    searchBoxRef: RefObject<HTMLInputElement>;
    selectorRef: RefObject<HTMLSelectElement>;

    constructor(props: {}) {
        super(props);
        this.state = {
            items: searchItems('', "createdAt_desc"),
        };
        this.searchBoxRef = createRef();
        this.selectorRef = createRef();

        this.searchByInputText = this.searchByInputText.bind(this);
        this.resetState = this.resetState.bind(this);
        this.selectorOnChange = this.selectorOnChange.bind(this);
    }

    componentDidMount() {
        ipcRenderer.on('render', () => this.searchByInputText());
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners('render');
    }

    render() {
        return <>
            <form autoComplete="on" onSubmit={this.searchByInputText}>
                <div className="ui fluid icon input">
                    <input ref={this.searchBoxRef} id="search-box" type="text" placeholder="title #tag" />
                    <i id="times-icon" className="times link icon" onClick={this.resetState} style={{ marginRight: "2rem" }}></i>
                    <i id="search-icon" className="search link icon" onClick={this.searchByInputText}></i>
                </div>
            </form>
            <Selector options={selectorOptions} onChange={this.selectorOnChange} ref={this.selectorRef} style={{ marginBottom: "1.5rem" }} />
            <ItemCards items={this.state.items} handlers={this.getHandlers()} />
        </>
    }

    getItemOrder(): ItemOrder {
        return this.selectorRef.current!.value as ItemOrder;
    }

    searchByInputText(e: MouseEvent<HTMLElement> | FormEvent<HTMLFormElement> | undefined = undefined) {
        if (e != undefined) e.preventDefault();
        flash();
        this.setState({
            items: searchItems(this.searchBoxRef.current!.value, this.getItemOrder())
        });
    }

    resetState() {
        this.searchBoxRef.current!.value = '';
        this.setState({
            items: searchItems('', this.getItemOrder()),
        });
    }

    getHandlers() {
        const openItem = (item: Item) => () => item.open();
        const addContextMenu = (item: Item) => (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            const menuItemObjects = [{
                label: 'Tags',
                click: () => ipcRenderer.send('open-tag-modal', item.location)
            }, {
                label: 'Delete',
                click: () => {
                    deleteItem(item.location);
                    this.searchByInputText();
                }
            }];
            if (item.isDir()) {
                menuItemObjects.push({
                    label: 'Open',
                    click: () => {
                        const directory = new Directory(item);
                        directory.open();
                    }
                });
            }

            const menu = new Menu();
            menuItemObjects.forEach(menuItemObject =>
                menu.append(new MenuItem(menuItemObject))
            );
            menu.popup({ window: remote.getCurrentWindow() });
        };
        const searchByTag = (tag: string) => (e: MouseEvent<HTMLSpanElement>) => {
            e.stopPropagation();
            const inputText = `#"${tag}"`;
            this.searchBoxRef.current!.value = inputText;
            this.setState({
                items: searchItems(inputText, this.getItemOrder()),
            });
        }

        return { openItem, addContextMenu, searchByTag };
    }

    selectorOnChange(e: ChangeEvent<HTMLSelectElement>) {
        const order = e.target.value as ItemOrder;
        this.setState({
            items: searchItems(this.searchBoxRef.current!.value, order)
        });
    }
}

const app = document.getElementById('contents');
ReactDOM.render(<Content />, app);