import React from 'react';
import ReactDOM from 'react-dom';
import ItemCards from '../component/itemCards';
import { ItemForRenderer } from '../../types';

type State = {
    items: ItemForRenderer[],
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
            items: await window.api.getItems()
        });
    }

    render() {
        return <>
            <ItemCards
                items={this.state.items}
                onContextMenu={_e => {
                    throw new Error('Function not implemented.');
                }}
            />
        </>;
    }
}

const content = document.getElementById("content");
ReactDOM.render(<Content />, content);
