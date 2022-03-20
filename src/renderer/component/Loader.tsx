import React from "react";
import { Dimmer, Segment, Loader, SemanticSIZES } from "semantic-ui-react";

const Loading = ({ size }: { size: SemanticSIZES }): JSX.Element => (
    <Segment>
        <Dimmer active inverted>
            <Loader size={size} inverted content="Loading" />
        </Dimmer>
    </Segment>
);

export default Loading;
