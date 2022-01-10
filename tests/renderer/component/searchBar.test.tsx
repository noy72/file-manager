import React from "react";
import jest from "jest-mock";
import { fireEvent, render } from "@testing-library/react";
import SearchBar from "../../../src/renderer/component/searchBar";

describe("SearchBar", () => {
    test("get input value", () => {
        const ref = React.createRef<HTMLInputElement>();
        const mockCallback = jest.fn(() => ref.current.value);
        const { getByTestId } = render(
            <SearchBar
                ref={ref}
                onSubmit={mockCallback}
                timesOnClick={() => {}}
                searchOnClick={() => {}}
            />
        );

        const input = getByTestId("input");
        fireEvent.change(input, { target: { value: "1" } });

        const form = getByTestId("form");
        fireEvent.submit(form);
        expect(mockCallback.mock.results[0].value).toBe("1");

        fireEvent.change(input, { target: { value: "2" } });
        fireEvent.submit(form);
        expect(mockCallback.mock.results[1].value).toBe("2");
    });
});
