import React, { RefObject, forwardRef } from "react";

type Event = () => void;

type Props = {
    onSubmit: Event;
    timesOnClick: Event;
    searchOnClick: Event;
};


const SearchBar = forwardRef(
    (props: Props, ref: RefObject<HTMLInputElement>) => (
        <div className="ui big fluid icon input" onSubmit={props.onSubmit}>
            <input data-testid="input" ref={ref} type="text" placeholder="title #tag" />
            <i data-testid="times-icon" className="circular times link icon" onClick={props.timesOnClick} style={{ marginRight: "3rem" }}></i>
            <i data-testid="search-icon" className="circular search link icon" onClick={props.searchOnClick}></i>
        </div>
    )
);

export default SearchBar;
