import { basename } from "path";
import React from "react";
import jest from "jest-mock";
import { fireEvent, render } from "@testing-library/react";
import { createItemForRenderer } from "../../utils";
import ItemCards from "../../../src/renderer/component/itemCards";
import { ItemForRenderer } from "../../../src/types";

const items: ItemForRenderer[] = [
    createItemForRenderer({ exist: true }),
    createItemForRenderer({ exist: true }),
    createItemForRenderer(),
];

describe("ItemCards", () => {
    test("display three cards", () => {
        const { getByTestId } = render(
            <ItemCards items={items} onContextMenu={jest.fn()} />
        );
        expect(getByTestId("cards").children.length).toBe(3);
    });

    test("the color of non-existent location is red", () => {
        const { getByTestId } = render(
            <ItemCards items={items} onContextMenu={jest.fn()} />
        );
        ["grey", "grey", "red"].forEach((color, index) => {
            expect(
                getByTestId(`card=${index}`).className.includes(color)
            ).toBeTruthy();
        });
    });

    test("onContextMenu", () => {
        const onContextMenu = jest.fn();
        const { getByTestId } = render(
            <ItemCards items={items} onContextMenu={onContextMenu} />
        );
        fireEvent.contextMenu(getByTestId(`card=0`));
        expect(onContextMenu.mock.calls.length).toBe(1);
    });
});
