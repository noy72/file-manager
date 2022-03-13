import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
import { ItemForRenderer } from "../../types";

type Event = (e: MouseEvent<HTMLElement>) => void;

const ItemCards = ({
    items,
    onContextMenu,
}: {
    items: ItemForRenderer[];
    onContextMenu: Event;
}): JSX.Element => (
    <Card.Group itemsPerRow={4} data-testid={"cards"}>
        {items.map((item, index) => (
            <ItemCard
                index={index}
                key={item.location}
                item={item}
                onContextMenu={onContextMenu}
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
        image={
            `data:image/${item.thumbnailExt.slice(1)};base64,${item.encodedThumbnail}`
        }
        header={item.name}
        fluid={true}
        color={item.exist ? "grey" : "red"}
        onContextMenu={onContextMenu}
    />
);

export default ItemCards;
