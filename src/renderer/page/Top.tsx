import React, { Component } from "react";
import "fomantic-ui/dist/semantic.min.css";
import ItemCards from "../component/itemCards";
import { ItemForRenderer } from "../../types";
import { Link } from "react-router-dom";

type State = {
    items: ItemForRenderer[];
};

class Top extends Component<Record<string, unknown>, State> {
    constructor(props: Record<string, unknown>) {
        super(props);
        this.state = {
            items: [],
        };
    }

    async componentDidMount(): Promise<void> {
        this.setState({
            items: await window.api.getItems(),
        });
    }

    render(): JSX.Element {
        return (
            <>
                <Link to="content/123435">test</Link>
                <ItemCards
                    items={this.state.items}
                    onContextMenu={() => {
                        throw new Error("Function not implemented.");
                    }}
                />
            </>
        );
    }
}

export default Top;
