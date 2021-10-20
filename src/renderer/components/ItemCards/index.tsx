import { basename } from "path";
import React, { MouseEvent } from "react";
import { exists } from "../../../main/infrastructure/file";
import { Card, Icon, Image, Label } from 'semantic-ui-react'
import { Item } from "../../../main/models/Item";

type Handlers = {
    openItem: (item: Item) => () => void,  // カードをクリックしたときに呼ぶ関数
    addContextMenu: (item: Item) => (e: MouseEvent<HTMLDivElement>) => void,  // 各カード上で右クリックしたときに出るメニューを追加する関数
    searchByTag: (tag: string) => (e: MouseEvent<HTMLSpanElement>) => void,  // 各タグをクリックしたときに呼ぶ関数
}

const ItemCards = ({ items, handlers }: { items: Item[], handlers: Handlers }): React.ReactElement => (
    <Card.Group itemsPerRow={4}>
        {items.map(item => <ItemCard key={item.location} item={item} handlers={handlers} />)}
    </Card.Group>
);

const ItemCard = ({ item, handlers }: { item: Item, handlers: Handlers }) => (
    <Card
        image={item.thumbnailPath()}
        header={basename(item.location)}
        description={Tags(item.tags, handlers.searchByTag)}
        fluid={true}
        link={true}
        color={exists(item.location) ? 'black' : 'red'}
        onClick={handlers.openItem(item)}
        onContextMenu={handlers.addContextMenu(item)}
    />
);

const Tags = (tags: string[], handler: Handlers["searchByTag"]) => (
    <div className="description">
        {tags.map(tag =>
            <Label basic key={tag} onClick={handler(tag)}>{tag}</Label>
        )}
    </div>
);

export default ItemCards;