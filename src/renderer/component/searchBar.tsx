import React, { RefObject } from "react";

type Event = () => void;

type Props = {
    onSubmit: Event;
    timesOnClick: Event;
    searchOnClick: Event;
};


const SearchBar = React.forwardRef(
    (props: Props, ref: RefObject<any>) => (
        <div className="ui big fluid form" onSubmit={props.onSubmit}>
            <input data-testid="input" ref={ref} type="text" placeholder="title #tag" />
            <i data-testid="times-icon" className="times link icon" onClick={props.timesOnClick} style={{ marginRight: "2rem" }}></i>
            <i data-testid="search-icon" className="search link icon" onClick={props.searchOnClick}></i>
        </div>
    )
);

export default SearchBar;
