import React from 'react';
import PaginationProps from './PaginationPropTypes';
export default class Pagination extends React.Component<PaginationProps, any> {
    static defaultProps: {
        mode: string;
        current: number;
        simple: boolean;
        prevText: string;
        nextText: string;
        onChange: () => void;
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    _hasPrev(): boolean;
    _hasNext(): boolean;
    _handleChange(p: any): any;
    onPrev(): void;
    onNext(): void;
    getIndexes(count: any): any[];
    render(): JSX.Element;
}
