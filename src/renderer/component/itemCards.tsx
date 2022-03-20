import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
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
        fluid={true}
        color={item.exist ? "grey" : "red"}
        onContextMenu={onContextMenu}
    >
        <Image
            src={`data:image/${item.thumbnailExt.slice(1)};base64,${item.encodedThumbnail}`}
            ui={false}
            className="img-one-third"
        />
        <Card.Content>
            <Card.Header>{item.name}</Card.Header>
            <Card.Meta>{item.tags.slice(0, 5).join(', ')}</Card.Meta>
        </Card.Content>
    </Card>
);

export default ItemCards;
