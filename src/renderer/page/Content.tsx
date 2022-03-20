import React, { FormEvent, useEffect, useState } from "react";
import "fomantic-ui/dist/semantic.min.css";
import { Link, useParams } from "react-router-dom";
import { Container, Grid, Image } from "semantic-ui-react";
import { ItemForRendererWithGroupedTags, LocalItem, Tags } from "../../types";
import Loading from "../component/Loader";
import TagList from "../component/tagList";
import LocalItemList from "../component/localItemList";
import TagInputBox from "../component/tagInputBox";

const dateFTime = (jsonDate: string): string => {
    const d = new Date(jsonDate);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
};

const Content = (): JSX.Element => {
    const { id } = useParams();
    const [item, setItem] = useState(
        undefined as ItemForRendererWithGroupedTags
    );
    const [localItems, setLocalItems] = useState([] as LocalItem[]);
    const [tags, setTags] = useState({} as Tags);

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

    const tagInputBoxOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const target = e.currentTarget;
        const group = target.querySelector('#tag-group').children[0].innerHTML;
        const tag = (target.querySelector('#tag') as HTMLInputElement).value;

        (async () => {
            await window.api.addItemTag(id, group, tag);

            const item = await window.api.getItem(id);
            setItem(item);
        })();
    };

    return item ? (
        <Container>
            <Grid style={{ marginTop: "2rem" }}>
                <Grid.Column>
                    <Link to="/">Top</Link>
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column width={6}>
                    <Image
                        centered
                        className="img-one-third"
                        src={`data:image/${item.thumbnailExt.slice(1)};base64,${item.encodedThumbnail
                            }`}
                    />
                </Grid.Column>
                <Grid.Column width={10}>
                    <TagList tags={item.tags} />
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column width={6}>
                    <p>{dateFTime(item.createdAt as unknown as string)}</p>
                    <p>{dateFTime(item.updatedAt as unknown as string)}</p>
                </Grid.Column>
                <Grid.Column width={10}>
                    <TagInputBox tags={tags} onSubmit={tagInputBoxOnSubmit} />
                </Grid.Column>
            </Grid>
            <LocalItemList
                localItems={localItems}
                createOnClick={(location: string) => () =>
                    window.api.open(location)}
            />
        </Container>
    ) : (
        <Loading size="massive" />
    );
};

export default Content;
