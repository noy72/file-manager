import React, { RefObject, forwardRef, FormEvent } from "react";
import { Button, Form, Input, Select } from "semantic-ui-react";
import { Tags } from "../../types";

type Props = {
    tags: Tags,
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onChange: (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const Datalist = ({ tags }: { tags: Tags }) => <>
    <datalist id="taglist">
        {
            Object.values(tags).flat().map(tag => <option value={tag} key={tag} />)
        }
    </datalist>
</>;

const TagInputBox = ({ tags, onSubmit, onChange }: Props) => {
    const tagGroupOptions = Object.keys(tags).map(key => ({ text: key, value: key }));
    console.log(tagGroupOptions)

    return <>
        <Datalist tags={tags} />
        <Form onSubmit={onSubmit} size="tiny">
            <Form.Group>
                <Form.Field
                    control={Select}
                    onChange={onChange}
                    options={tagGroupOptions}
                    placeholder='Tag Group'
                />
                <Form.Field
                    autoComplete="on" list="taglist"
                    control={Input}
                    onChange={onChange}
                    placeholder='Tag'
                    name="tag"
                />
                <Form.Field control={Button} type="submit" inline>Submit</Form.Field>
            </Form.Group>
        </Form>
    </>;
}

export default TagInputBox;
