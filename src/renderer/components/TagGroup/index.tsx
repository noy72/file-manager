import React from "react";
import { Accordion, AccordionTitleProps, Checkbox, CheckboxProps, Grid, Icon } from "semantic-ui-react";

type Handler = (_: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => void;

type Props = {
    classifiedTags: { [index: string]: string[] },
    checkedTags: string[],
    handler: Handler
};

const TagGroup = ({
    classifiedTags,
    checkedTags,
    handler
}: Props): JSX.Element => {
    const [activeindices, setindices] = React.useState<string[]>([]);

    const onClick = (_: React.MouseEvent, data: AccordionTitleProps) => {
        const { index } = data;
        if (typeof index !== 'string') return;

        if (activeindices.includes(index)) {
            setindices(activeindices.filter(idx => idx !== index));
        } else {
            setindices([...activeindices, index]);
        }
    };

    return (
        <Accordion>
            {
                Object.entries(classifiedTags).map(([groupName, tags]) => (<>
                    <Accordion.Title
                        index={groupName}
                        onClick={onClick}
                        active={activeindices.includes(groupName)}
                        key={groupName}
                    >
                        <Icon name='dropdown' /> {groupName}
                    </Accordion.Title>
                    <Accordion.Content
                        key={groupName}
                        active={activeindices.includes(groupName)}
                    >
                        <Grid columns={5} className={"compact"}>
                            {
                                tags.sort().map(tag => (
                                    <Grid.Column key={tag}>
                                        <TagCheckBox key={tag} checked={checkedTags.includes(tag)} name={tag} handler={handler} />
                                    </Grid.Column>
                                ))
                            }
                        </Grid>
                    </Accordion.Content>
                </>))
            }
        </Accordion>
    );
};

const TagCheckBox = ({ checked, name, handler }: { checked: boolean, name: string, handler: Handler }) => (
    <Checkbox
        defaultChecked={checked}
        label={name}
        onChange={handler}
        id={name}
        value={name}
    />
);

export default TagGroup;