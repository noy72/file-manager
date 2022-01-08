import { ipcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import { RENDER_ITEMS } from '../../constant';
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

    componentWillUnmount() {
    }

    render() {
        return <>
            <ItemCards
                items={this.state.items}
                onContextMenu={e => {
                    throw new Error('Function not implemented.');
                }}
            />
        </>;
    }
}

const content = document.getElementById("content");
ReactDOM.render(<Content />, content);
