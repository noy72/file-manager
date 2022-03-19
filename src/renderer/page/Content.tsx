import React, { FormEvent, useEffect, useRef, useState } from "react";
import "fomantic-ui/dist/semantic.min.css";
import { useParams } from "react-router-dom";
import { Container, Grid, Image, List } from 'semantic-ui-react'
import { ItemForRendererWithGroupedTags, LocalItem, Tags } from "../../types";
import Loading from "../component/Loader";
import TagList from "../component/tagList";
import LocalItemList from "../component/localItemList";
import TagInputBox from "../component/tagInputBox";



const Content = (): JSX.Element => {
    const { id } = useParams();
    const [item, setItem] = useState(undefined as ItemForRendererWithGroupedTags);
    const [localItems, setLocalItems] = useState([] as LocalItem[]);
    const [tags, setTags] = useState({} as Tags);
    const [tagInput, setTagInput] = useState({ tagGroup: "", tag: "" });

    useEffect(() => {
        (async () => {
            const item = await window.api.getItem(id);
            setItem(item);

            const localItems = await window.api.getLocalItems(id);
            setLocalItems(localItems);

            const tags = await window.api.getTags();
            setTags(tags);
        })();
    }, []);

    useEffect(() => {
        (async () => { })();
    }, [tags]);

    const tagInputBoxOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(tagInput);
    };

    const tagInputBoxOnChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();

        const target = e.currentTarget;
        const name = target.name ? target.name : "tagGroup";
        const value = target.value ? target.value : target.innerText;
        setTagInput({ ...tagInput, [name]: value });
    }


    return item ?
        <Container>
            <Grid style={{ marginTop: "2rem" }}>
                <Grid.Column width={6}>
                    <Image src={
                        `data:image/${item.thumbnailExt.slice(1)};base64,${item.encodedThumbnail}`
                    } />
                </Grid.Column>
                <Grid.Column width={10}>
                    <TagList tags={item.tags} />
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column width={6}>
                    <p>{item.createdAt}</p>
                    <p>{item.updatedAt}</p>
                </Grid.Column>
                <Grid.Column width={10}>
                    <TagInputBox
                        tags={tags}
                        onSubmit={tagInputBoxOnSubmit}
                        onChange={tagInputBoxOnChange}
                    />
                </Grid.Column>
            </Grid>
            <LocalItemList
                localItems={localItems}
                createOnClick={(location: string) => () => window.api.open(location)}
            />
        </Container> : <Loading size="massive" />
};


export default Content;
