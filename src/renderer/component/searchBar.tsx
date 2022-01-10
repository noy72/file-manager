import React, { RefObject } from "react";
import { Form } from "semantic-ui-react";

type Event = () => void;

type Props = {
    onSubmit: Event;
    timesOnClick: Event;
    searchOnClick: Event;
};

const SearchBar = React.forwardRef(
    (props: Props, ref: RefObject<HTMLInputElement>) => (
        <Form onSubmit={props.onSubmit} data-testid="form">
            <input
                data-testid="input"
                ref={ref}
                type="text"
                placeholder="title #tag"
            />
            <i className="times link icon" onClick={props.timesOnClick}></i>
            <i className="search link icon" onClick={props.searchOnClick}></i>
        </Form>
    )
);

export default SearchBar;
