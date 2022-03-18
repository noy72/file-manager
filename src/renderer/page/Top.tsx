import React, { useEffect, useRef, useState } from "react";
import "fomantic-ui/dist/semantic.min.css";
import ItemCards from "../component/itemCards";
import { ItemForRenderer } from "../../types";
import { useParams } from "react-router-dom";
import SearchBar from "../component/searchBar";

const Top = (): JSX.Element => {
    const { query } = useParams();
    const [items, setItems] = useState([] as ItemForRenderer[]);
    const searchBoxRef = useRef(null);

    useEffect(() => {
        (async () => {
            const items = await window.api.getItems(
                ""
            );
            setItems(items);
        })();
    }, []);

    return <>
        <SearchBar
            ref={searchBoxRef}
            onSubmit={() => { }}
            timesOnClick={() => { searchBoxRef.current.value = "" }}
            searchOnClick={() => { }}
        />
        <ItemCards
            items={items}
            onContextMenu={() => {
                throw new Error("Function not implemented.");
            }}
        />
    </>;
};


export default Top;
