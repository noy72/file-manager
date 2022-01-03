import React, { MouseEvent } from "react";
import { basename } from "path";
import { Card } from "semantic-ui-react";
import { ItemWithExistance } from "../types";

type Event = (e: MouseEvent<HTMLElement>) => void;

const ItemCards = (
    { items, onContextMenu }: { items: ItemWithExistance[], onContextMenu: Event }
): JSX.Element => (
    <Card.Group itemsPerRow={4} data-testid={"cards"}>
        {items.map((item, index) =>
            <ItemCard
                index={index}
                key={item.location}
                item={item}
                onContextMenu={onContextMenu}
            />)}
    </Card.Group>
);

const ItemCard = (
    { index, item, onContextMenu }: { index: number, item: ItemWithExistance, onContextMenu: Event }
): JSX.Element => (
    <Card
        data-testid={`card=${index}`}
        image={item.thumbnail}
        header={basename(item.location)}
        fluid={true}
        link={true}
        href={encodeURI(item.location)}
        color={item.exist ? 'grey' : 'red'}
        onContextMenu={onContextMenu}
    />
);

export default ItemCards;
