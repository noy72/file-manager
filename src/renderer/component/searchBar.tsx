import React, { RefObject, forwardRef, FormEvent } from "react";

type Props = {
    onSubmit: (e?: FormEvent) => void;
    timesOnClick: () => void;
    searchOnClick: (e?: FormEvent) => void;
};

const SearchBar = forwardRef(
    (props: Props, ref: RefObject<HTMLInputElement>) => (
        <form
            className="ui big fluid icon input"
            onSubmit={props.onSubmit}
            style={{ marginTop: "2rem", marginBottom: "1rem" }}>
            <input
                data-testid="input"
                ref={ref}
                type="text"
                placeholder="title #tag"
            />
            <i
                data-testid="times-icon"
                className="circular times link icon"
                onClick={props.timesOnClick}
                style={{ marginRight: "3rem" }}></i>
            <i
                data-testid="search-icon"
                className="circular search link icon"
                onClick={props.searchOnClick}></i>
        </form>
    )
);

export default SearchBar;
