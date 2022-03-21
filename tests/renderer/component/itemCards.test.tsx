import { basename } from "path";
import React from "react";
import jest from "jest-mock";
import { fireEvent, render } from "@testing-library/react";
import { createItemForRenderer } from "../../utils";
import ItemCards from "../../../src/renderer/component/itemCards";
import { ItemForRenderer } from "../../../src/types";
import { HashRouter } from "react-router-dom";

const items: ItemForRenderer[] = [
    createItemForRenderer({ exist: true }),
    createItemForRenderer({ exist: true }),
    createItemForRenderer(),
];

describe("ItemCards", () => {
    test("display three cards", () => {
        const { getByTestId } = render(
            <HashRouter>
                <ItemCards items={items} createOnContextMenu={jest.fn()} />
            </HashRouter>
        );
        expect(getByTestId("cards").children.length).toBe(3);
    });

    test("the color of non-existent location is red", () => {
        const { getByTestId } = render(
            <HashRouter>
                <ItemCards items={items} createOnContextMenu={jest.fn()} />
            </HashRouter>
        );
        ["grey", "grey", "red"].forEach((color, index) => {
            expect(
                getByTestId(`card=${index}`).className.includes(color)
            ).toBeTruthy();
        });
    });

    test("createOnContextMenu", () => {
        const onContextMenu = jest.fn();
        const { getByTestId } = render(
            <HashRouter>
                <ItemCards items={items} createOnContextMenu={() => onContextMenu} />
            </HashRouter>
        );
        fireEvent.contextMenu(getByTestId(`card=0`));
        expect(onContextMenu.mock.calls.length).toBe(1);
    });
});
