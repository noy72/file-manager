import React from "react";
import { Link } from "react-router-dom";
import { Icon, List } from "semantic-ui-react";
import { LocalItem } from "../../types";

const LocalItemList = ({
    localItems,
    openOnClick,
    createOnClick,
}: {
    localItems: LocalItem[];
    openOnClick: () => void;
    createOnClick: (location: string) => () => void;
}): JSX.Element => (
    <List divided selection size="big">
        <List.Item as={Link} to="/" key="top">
            <Icon name="list layout" style={{ marginRight: "1rem" }} />
            Top
        </List.Item>
        <List.Item key="open" onClick={openOnClick}>
            <Icon name="folder open" style={{ marginRight: "1rem" }} />
            this.open
        </List.Item>
        {localItems.map(item => (
            <List.Item
                key={item.location}
                onClick={createOnClick(item.location)}>
                {item.name}
            </List.Item>
        ))}
    </List>
);

export default LocalItemList;
