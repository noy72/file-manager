import React from "react";
import {
    Pagination as SemanticUIPagination,
    PaginationProps,
} from "semantic-ui-react";

type Props = {
    activePage: number;
    totalPages: number;
    onPageChange: (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        data: PaginationProps
    ) => void;
};

const Pagination = ({
    activePage,
    totalPages,
    onPageChange,
}: Props): JSX.Element => (
    <SemanticUIPagination
        activePage={activePage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        style={{ marginBottom: "1rem" }}
    />
);

export default Pagination;
