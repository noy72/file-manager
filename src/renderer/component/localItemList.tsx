import React from "react";
import { List } from "semantic-ui-react";
import { LocalItem } from "../../types";

const LocalItemList = ({
    localItems,
    createOnClick,
}: {
    localItems: LocalItem[];
    createOnClick: (location: string) => () => void;
}): JSX.Element => (
    <List divided selection size="big">
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
