import React, { useEffect, useState } from "react";
import "fomantic-ui/dist/semantic.min.css";
import { useParams } from "react-router-dom";
import { Container, Grid, Image, List } from 'semantic-ui-react'
import { ItemForRendererWithGroupedTags, LocalItem } from "../../types";
import Loading from "../component/Loader";
import TagList from "../component/tagList";
import LocalItemList from "../component/localItemList";

const Content = (): JSX.Element => {
    const { id } = useParams();
    const [item, setItem] = useState(undefined as ItemForRendererWithGroupedTags);
    const [localItems, setLocalItems] = useState([] as LocalItem[]);

    useEffect(() => {
        (async () => {
            const item = await window.api.getItem(id);
            setItem(item);
        })();
        (async () => {
            const localItems = await window.api.getLocalItems(id);
            setLocalItems(localItems);
        })();
    }, []);

    return item ?
        <Container>
            <Grid style={{ marginTop: "2rem" }}>
                <Grid.Column width={6}>
                    <Image src={
                        `data:image/${item.thumbnailExt.slice(1)};base64,${item.encodedThumbnail}`
                    } />
                    <p>{item.createdAt}</p>
                    <p>{item.updatedAt}</p>
                </Grid.Column>
                <Grid.Column width={10}>
                    <TagList tags={item.tags} />
                </Grid.Column>
            </Grid>
            <LocalItemList
                localItems={localItems}
                createOnClick={(location: string) => () => window.api.open(location)}
            />
        </Container> : <Loading size="massive" />
};


export default Content;
