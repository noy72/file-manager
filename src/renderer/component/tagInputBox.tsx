import React, { FormEvent } from "react";
import { Button, Form, Input, Select } from "semantic-ui-react";
import { Tags } from "../../types";

type Props = {
    tags: Tags;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const Datalist = ({ tags }: { tags: Tags }) => (
    <>
        <datalist id="taglist">
            {Object.values(tags)
                .flat()
                .map(tag => (
                    <option value={tag} key={tag} />
                ))}
        </datalist>
    </>
);

const TagInputBox = ({ tags, onSubmit }: Props): JSX.Element => {
    const tagGroupOptions = Object.keys(tags).map(key => ({
        text: key,
        value: key,
    }));

    return (
        <>
            <Datalist tags={tags} />
            <Form onSubmit={onSubmit} size="tiny">
                <Form.Group>
                    <Form.Field
                        control={Select}
                        options={tagGroupOptions}
                        placeholder="Tag Group"
                        id="tag-group"
                    />
                    <Form.Field
                        autoComplete="on"
                        list="taglist"
                        control={Input}
                        placeholder="Tag"
                        id="tag"
                    />
                    <Form.Field control={Button} type="submit" inline>
                        Submit
                    </Form.Field>
                </Form.Group>
            </Form>
        </>
    );
};

export default TagInputBox;
