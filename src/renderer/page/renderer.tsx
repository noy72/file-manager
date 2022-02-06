import React from "react";
import "fomantic-ui/dist/semantic.min.css";
import ItemCards from "../component/itemCards";
import { ItemForRenderer } from "../../types";
import { Link } from "react-router-dom";

type State = {
    items: ItemForRenderer[];
};

class Content extends React.Component<Record<string, unknown>, State> {
    constructor(props: Record<string, unknown>) {
        super(props);
        this.state = {
            items: [],
        };
    }

    async componentDidMount() {
        this.setState({
            items: await window.api.getItems(),
        });
    }

    render() {
        return (
            <>
                <Link to="test/123435">test</Link>
                <ItemCards
                    items={this.state.items}
                    onContextMenu={_e => {
                        throw new Error("Function not implemented.");
                    }}
                />
            </>
        );
    }
}

export default Content;
