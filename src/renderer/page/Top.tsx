import React, { useMemo, FormEvent, useEffect, useRef, useState } from "react";
import "fomantic-ui/dist/semantic.min.css";
import ItemCards from "../component/itemCards";
import { ItemForRenderer } from "../../types";
import { useLocation } from "react-router-dom";
import SearchBar from "../component/searchBar";
import {
    Container,
    DropdownProps,
    PaginationProps,
    Select,
} from "semantic-ui-react";
import { itemOrderOptions, itemOrders } from "../utils/itemOrders";
import Pagination from "../component/pagination";
import { PAGE_SIZE } from "../../constant";

const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
};

const sliceItems = (
    items: ItemForRenderer[],
    currentPage: number
): ItemForRenderer[] =>
    items.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

const Top = (): JSX.Element => {
    const query = useQuery();
    const [state, setState] = useState({
        items: [],
        totalPages: 0,
        currentPage: 0,
    } as { items: ItemForRenderer[]; totalPages: number; currentPage: number });
    const searchBoxRef = useRef(null);

    useEffect(() => {
        (async () => {
            const searchString = query.get("search") ? query.get("search") : "";
            const items = await window.api.getItems(searchString);
            console.log(items);
            setState({
                items: items,
                totalPages: Math.ceil(items.length / PAGE_SIZE),
                currentPage: 0,
            });

            searchBoxRef.current.value = searchString;
        })();
    }, []);

    const search = (e?: FormEvent) => {
        e?.preventDefault();
        window.api
            .getItems(searchBoxRef.current.value)
            .then(items =>
                setState({
                    items: sliceItems(items, 0),
                    totalPages: Math.ceil(items.length / PAGE_SIZE),
                    currentPage: 0,
                })
            )
            .catch(err => console.error(err));
    };

    const clearInput = () => {
        searchBoxRef.current.value = "";
        search();
    };

    const itemOrderOnChange = (
        _e: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        const key = data.value as string;
        const copy = state.items.map(items => items).sort(itemOrders[key]);
        setState({ ...state, items: copy });
    };

    const createOnContextMenu = (location: string) => () =>
        window.api.popupItemCardMenu(location);

    const onPageChange = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        _data: PaginationProps
    ): void => {
        const value = event.currentTarget.innerText;
        let nextPage = -1;
        switch (value) {
            case "⟩":
                nextPage = Math.min(
                    state.currentPage + 1,
                    state.totalPages - 1
                );
                break;
            case "⟨":
                nextPage = Math.max(state.currentPage - 1, 0);
                break;
            case "»":
                nextPage = state.totalPages - 1;
                break;
            case "«":
                nextPage = 0;
                break;
            default:
                nextPage = parseInt(value) - 1;
        }
        setState({
            ...state,
            currentPage: nextPage,
        });
    };

    return (
        <Container>
            <SearchBar
                ref={searchBoxRef}
                onSubmit={search}
                timesOnClick={clearInput}
                searchOnClick={search}
            />
            <Select
                placeholder="order"
                options={itemOrderOptions}
                onChange={itemOrderOnChange}
                style={{ marginBottom: "1rem" }}
            />
            <div>
                <Pagination
                    activePage={state.currentPage + 1}
                    totalPages={state.totalPages}
                    onPageChange={onPageChange}
                />
            </div>
            <ItemCards
                items={sliceItems(state.items, state.currentPage)}
                createOnContextMenu={createOnContextMenu}
            />
            <div>
                <Pagination
                    activePage={state.currentPage + 1}
                    totalPages={state.totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </Container>
    );
};

export default Top;
