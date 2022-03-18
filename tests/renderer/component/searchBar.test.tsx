import React from "react";
import jest from "jest-mock";
import { fireEvent, render } from "@testing-library/react";
import SearchBar from "../../../src/renderer/component/searchBar";

describe("SearchBar", () => {
    test("Submit input value", () => {
        const ref = React.createRef<HTMLInputElement>();
        const mockOnSubmit = jest.fn(() => ref.current.value);
        const { getByTestId } = render(
            <SearchBar
                ref={ref}
                onSubmit={mockOnSubmit}
                timesOnClick={() => { }}
                searchOnClick={() => { }}
            />
        );
        const input = getByTestId("input");
        fireEvent.change(input, { target: { value: "1" } });
        fireEvent.submit(input);
        expect(mockOnSubmit.mock.results[0].value).toBe("1");

        fireEvent.change(input, { target: { value: "2" } });
        fireEvent.submit(input);
        expect(mockOnSubmit.mock.results[1].value).toBe("2");
    });

    test("Click icons", () => {
        const ref = React.createRef<HTMLInputElement>();
        const mockTimesOnClick = jest.fn();
        const mockSearchOnClick = jest.fn();
        const { getByTestId } = render(
            <SearchBar
                ref={ref}
                onSubmit={() => { }}
                timesOnClick={mockTimesOnClick}
                searchOnClick={mockSearchOnClick}
            />
        );

        const timesIcon = getByTestId("times-icon");
        expect(mockTimesOnClick.mock.results.length).toBe(0);
        fireEvent.click(timesIcon);
        expect(mockTimesOnClick.mock.results.length).toBe(1);

        const searchIcon = getByTestId("search-icon");
        expect(mockSearchOnClick.mock.results.length).toBe(0);
        fireEvent.click(searchIcon);
        expect(mockSearchOnClick.mock.results.length).toBe(1);
    });
});
