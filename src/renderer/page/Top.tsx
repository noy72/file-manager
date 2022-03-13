import React, { Component, useEffect, useState } from "react";
import "fomantic-ui/dist/semantic.min.css";
import ItemCards from "../component/itemCards";
import { ItemForRenderer } from "../../types";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../component/searchBar";

const Top = (): JSX.Element => {
    const { query } = useParams();
    const [items, setItems] = useState([] as ItemForRenderer[]);

    useEffect(() => {
        (async () => {
            const items = await window.api.getItems();
            setItems(items);
        })();
    }, []);

    return <>
        <ItemCards
            items={items}
            onContextMenu={() => {
                throw new Error("Function not implemented.");
            }}
        />
    </>;
};


export default Top;
