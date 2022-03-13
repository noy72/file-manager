import React, { useEffect, useState } from "react";
import "fomantic-ui/dist/semantic.min.css";
import { useParams } from "react-router-dom";
import { Container, Grid, Image, List, Segment, Loader, Dimmer } from 'semantic-ui-react'
import { ItemForRenderer, ItemForRendererWithGroupedTags } from "../../types";
import Loading from "../component/Loader";
import TagList from "../component/tagList";

const Content = (): JSX.Element => {
    const { id } = useParams();
    const [item, setItem] = useState(undefined as ItemForRendererWithGroupedTags);

    useEffect(() => {
        const getItem = async () => {
            const item = await window.api.getItem(id);
            setItem(item);
        };
        getItem();
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
            <List divided selection size="big">
                <List.Item>hoge</List.Item>
                <List.Item>fuga</List.Item>
            </List>
        </Container> : <Loading size="massive" />
};


export default Content;
