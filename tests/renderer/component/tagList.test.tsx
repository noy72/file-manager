import React from "react";
import jest from "jest-mock";
import { fireEvent, render } from "@testing-library/react";
import TagList from "../../../src/renderer/component/tagList";

describe("SearchBar", () => {
    test("get input value", () => {
        const ref = React.createRef<HTMLInputElement>();
        const mockCallback = jest.fn(() => ref.current.value);
        const { getByTestId } = render(
            <SearchBar
                ref={ref}
                onSubmit={mockCallback}
                timesOnClick={() => { }}
                searchOnClick={() => { }}
            />
        );
    });
});
