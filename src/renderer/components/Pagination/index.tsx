import React, { SyntheticEvent } from "react";
import { Pagination, PaginationProps } from "semantic-ui-react";

type Props = {
    current: number;
    pageSize: number;
    onClick: (page: number) => void;
};

const pagication = ({ current, pageSize, onClick }: Props): React.ReactElement => (
    <Pagination
        activePage={current + 1}
        totalPages={pageSize}
        onPageChange={(_: SyntheticEvent, data: PaginationProps) => {
            if (typeof data.activePage === 'number') onClick(data.activePage - 1)
            else throw Error('Invalid PaginationProps.activePage type');
        }}
    />
);

export default pagication;