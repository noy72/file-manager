import React, { useEffect, useState } from "react";
import "fomantic-ui/dist/semantic.min.css";
import { ItemForRenderer } from "../../types";
import { useParams } from "react-router-dom";

const Content = (): JSX.Element => {
    const { id } = useParams();
    const [item, setItem] = useState({} as ItemForRenderer);

    useEffect(() => {
        const getItem = async () => {
            const item = await window.api.getItem(id);
            setItem(item);
        };
        getItem();
    }, []);

    return <>
        {item.name && <p>{item.name}</p>}
        {item.name && item.tags.map(tag => <p>{tag}</p>)}
    </>;
};


export default Content;
