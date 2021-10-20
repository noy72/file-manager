import { ipcRenderer, remote } from 'electron';
import React, { MouseEvent, FormEvent, RefObject, createRef, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import { Item } from "../main/models/Item";
import Directory from "../main/models/Directory";
import { deleteItem } from '../main/repositories/itemRepository';
import { itemLength, ItemOrder, MAX_ITEMS, searchItems } from '../main/domain/service/item';
import ItemCards from './components/ItemCards';
import Selector from './components/Selector';
import { flash } from '../main/infrastructure/lowdb';
import Pagination from './components/Pagination';

const { Menu, MenuItem } = remote;

const selectorOptions: [ItemOrder, string][] = [
    ["createdAt_desc", "追加日（降順）"],
    ["createdAt_asc", "追加日（昇順）"],
    ["title_asc", "名前（昇順）"],
];

type State = {
    items: Item[],
    itemLength: number,
    currentPage: number
};

class Content extends React.Component<Record<string, unknown>, State> {
    searchBoxRef: RefObject<HTMLInputElement>;
    selectorRef: RefObject<HTMLSelectElement>;

    constructor(props: Record<string, unknown>) {
        super(props);
        this.state = {
            items: searchItems('', "createdAt_desc"),
            itemLength: itemLength(''),
            currentPage: 0,
        };
        this.searchBoxRef = createRef();
        this.selectorRef = createRef();

        this.searchByInputText = this.searchByInputText.bind(this);
        this.resetState = this.resetState.bind(this);
        this.selectorOnChange = this.selectorOnChange.bind(this);
        this.onClickPagination = this.onClickPagination.bind(this);
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
            <Pagination current={this.state.currentPage} pageSize={Math.ceil(this.state.itemLength / MAX_ITEMS)} onClick={this.onClickPagination} />
            <ItemCards items={this.state.items} handlers={this.getHandlers()} />
            <Pagination current={this.state.currentPage} pageSize={Math.ceil(this.state.itemLength / MAX_ITEMS)} onClick={this.onClickPagination} />
        </>;
    }

    getItemOrder(): ItemOrder {
        return this.selectorRef.current!.value as ItemOrder;
    }

    searchByInputText(e: MouseEvent<HTMLElement> | FormEvent<HTMLFormElement> | undefined = undefined) {
        if (e != undefined) e.preventDefault();
        flash();
        this.setState({
            items: searchItems(this.searchBoxRef.current!.value, this.getItemOrder()),
            itemLength: itemLength(this.searchBoxRef.current!.value),
            currentPage: 0
        });
    }

    resetState() {
        this.searchBoxRef.current!.value = '';
        this.setState({
            items: searchItems('', this.getItemOrder()),
            itemLength: itemLength(''),
            currentPage: 0
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
                itemLength: itemLength(inputText),
                currentPage: 0
            });
        };

        return { openItem, addContextMenu, searchByTag };
    }

    onClickPagination(pageNumber: number) {
        window.scrollTo({
            top: 0,
        });
        this.setState({
            items: searchItems(this.searchBoxRef.current!.value, this.getItemOrder(), pageNumber),
            itemLength: itemLength(this.searchBoxRef.current!.value),
            currentPage: pageNumber
        });
    }

    selectorOnChange(e: ChangeEvent<HTMLSelectElement>) {
        const order = e.target.value as ItemOrder;
        this.setState({
            items: searchItems(this.searchBoxRef.current!.value, order),
            itemLength: itemLength(this.searchBoxRef.current!.value),
            currentPage: 0
        });
    }
}

const app = document.getElementById('contents');
ReactDOM.render(<Content />, app);