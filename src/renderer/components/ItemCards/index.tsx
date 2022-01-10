import { basename } from "path";
import React, { MouseEvent } from "react";
import { exists } from "../../../main/infrastructure/file";
import { Card, Icon, Label } from 'semantic-ui-react';
import { Item } from "../../../main/models/Item";

type Handlers = {
    openItem: (item: Item) => (e: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => void,  // カードをクリックしたときに呼ぶ関数
    addContextMenu: (item: Item) => (e: MouseEvent<HTMLDivElement>) => void,  // 各カード上で右クリックしたときに出るメニューを追加する関数
    searchByTag: (tag: string) => (e: MouseEvent<HTMLSpanElement>) => void,  // 各タグをクリックしたときに呼ぶ関数
}

const ItemCards = ({ items, handlers }: { items: Item[], handlers: Handlers }): React.ReactElement => (
    <Card.Group itemsPerRow={4}>
        {items.map(item => <ItemCard key={item.location} item={item} handlers={handlers} />)}
    </Card.Group>
);

const ItemCard = ({ item, handlers }: { item: Item, handlers: Handlers }) => {
    const [active, setActive] = React.useState<boolean>(false);

    const onClick = () => {
        setActive(active === false);
    }

    return (
        <Card
            image={item.thumbnailPath()}
            header={basename(item.location)}
            description={Tags(item.tags, handlers.searchByTag, active)}
            fluid={true}
            link={true}
            color={exists(item.location) ? 'grey' : 'red'}
            extra={
                item.tags.length > 10 ?
                    <div onClick={onClick} className={"expand-button"}>
                        <Icon name={`chevron ${active ? "up" : "down"}`} />
                    </div> : null
            }
            onClick={handlers.openItem(item)}
            onContextMenu={handlers.addContextMenu(item)}
        />
    );
};

const Tags = (tags: string[], handler: Handlers["searchByTag"], active: boolean) => {
    const alwaysDisplay = tags.slice(0, 10);
    const defaultHide = tags.slice(10, tags.length)
    return (
        <div className="description">
            {alwaysDisplay.map(tag =>
                <Label basic key={tag} onClick={handler(tag)}>{tag}</Label>
            )}
            {
                active ?
                    defaultHide.map(tag =>
                        <Label basic key={tag} onClick={handler(tag)}>{tag}</Label>
                    )
                    : null
            }
        </div>
    );
}

export default ItemCards;
