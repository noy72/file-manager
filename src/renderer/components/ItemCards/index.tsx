import { basename } from "path";
import React, { MouseEvent } from "react";
import { exists } from "../../../main/infrastructure/file";
import { Item } from "../../../main/models/Item";

type Handlers = {
    openItem: (item: Item) => () => void,  // カードをクリックしたときに呼ぶ関数
    addContextMenu: (item: Item) => (e: MouseEvent<HTMLDivElement>) => void,  // 各カード上で右クリックしたときに出るメニューを追加する関数
    searchByTag: (tag: string) => (e: MouseEvent<HTMLSpanElement>) => void,  // 各タグをクリックしたときに呼ぶ関数
}

export default ({ items, handlers }: { items: Item[], handlers: Handlers }) => (
    <div className="ui four column grid">
        {items.map(item => <ItemCard item={item} handlers={handlers} />)}
    </div>
);

const ItemCard = ({ item, handlers }: { item: Item, handlers: Handlers }) => (
    <div className="column"
        onClick={handlers.openItem(item)}
        onContextMenu={handlers.addContextMenu(item)}>
        <div className={["ui", "fluid", "link", exists(item.location) ? '' : 'red', "card"].join(" ")}>
            <div className="image">
                <img src={item.thumbnailPath()} />
            </div>
            <div className="content">
                <div className="header">{basename(item.location)}</div>
                <Tags tags={item.tags} handler={handlers.searchByTag} />
            </div>
        </div>
    </div>
);

const Tags = ({ tags, handler }: { tags: string[], handler: Handlers["searchByTag"] }) => (
    <div className="ui basic labels description">
        {tags.map(tag =>
            <span className="ui label" onClick={handler(tag)}>{tag}</span>
        )}
    </div>
);
