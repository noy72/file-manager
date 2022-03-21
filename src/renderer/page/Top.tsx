import React, { useMemo, FormEvent, useEffect, useRef, useState, ChangeEvent } from "react";
import "fomantic-ui/dist/semantic.min.css";
import ItemCards from "../component/itemCards";
import { ItemForRenderer } from "../../types";
import { useLocation } from "react-router-dom";
import SearchBar from "../component/searchBar";
import { Container, DropdownProps, Select } from "semantic-ui-react";
import { itemOrderOptions, itemOrders } from "../utils/itemOrders";



const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
};

const Top = (): JSX.Element => {
    const query = useQuery();
    const [items, setItems] = useState([] as ItemForRenderer[]);
    const searchBoxRef = useRef(null);

    useEffect(() => {
        (async () => {
            const searchString = query.get("search") ? query.get("search") : "";
            const items = await window.api.getItems(searchString);
            setItems(items);

            searchBoxRef.current.value = searchString;
        })();
    }, []);

    const search = (e?: FormEvent) => {
        e?.preventDefault();
        window.api
            .getItems(searchBoxRef.current.value)
            .then(items => setItems(items))
            .catch(err => console.error(err));
    };

    const clearInput = () => {
        searchBoxRef.current.value = "";
        search();
    };

    const itemOrderOnChange = (_e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        const key = data.value as string;
        const copy = items
            .map(items => items)
            .sort(itemOrders[key]);
        setItems(copy);
    };

    return (
        <Container>
            <SearchBar
                ref={searchBoxRef}
                onSubmit={search}
                timesOnClick={clearInput}
                searchOnClick={search}
            />
            <Select placeholder='order' options={itemOrderOptions} onChange={itemOrderOnChange} />
            <ItemCards
                items={items}
                onContextMenu={() => {
                    throw new Error("Function not implemented.");
                }}
            />
        </Container>
    );
};

export default Top;
