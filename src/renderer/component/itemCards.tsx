import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import { ItemForRenderer } from "../../types";

type Event = (e: MouseEvent<HTMLElement>) => void;

const ItemCards = ({
    items,
    createOnContextMenu,
}: {
    items: ItemForRenderer[];
    createOnContextMenu: (location: string) => () => void;
}): JSX.Element => (
    <Card.Group itemsPerRow={5} data-testid={"cards"}>
        {items.map((item, index) => (
            <ItemCard
                index={index}
                key={item.location}
                item={item}
                onContextMenu={createOnContextMenu(item.location)}
            />
        ))}
    </Card.Group>
);

const ItemCard = ({
    index,
    item,
    onContextMenu,
}: {
    index: number;
    item: ItemForRenderer;
    onContextMenu: Event;
}): JSX.Element => (
    <Card
        as={Link}
        to={`content/${item.id}`}
        data-testid={`card=${index}`}
        fluid={true}
        color={item.exist ? "grey" : "red"}
        onContextMenu={onContextMenu}>
        <Image
            src={`data:image/${item.thumbnailExt.slice(1)};base64,${item.encodedThumbnail
                }`}
            ui={false}
            className="item-card-img"
        />
        <Card.Content>
            <Card.Header>{item.name}</Card.Header>
            <Card.Meta>{item.tags.slice(0, 5).join(", ")}</Card.Meta>
        </Card.Content>
    </Card>
);

export default ItemCards;
