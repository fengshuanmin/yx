import React from 'react';
import { SearchBarProps, SearchBarState } from './SearchBarPropTypes';
export default class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    static defaultProps: {
        prefixCls: string;
        placeholder: string;
        onSubmit: () => void;
        onChange: () => void;
        onFocus: () => void;
        onBlur: () => void;
        onClear: () => void;
        showCancelButton: boolean;
        cancelText: string;
        disabled: boolean;
    };
    initialInputContainerWidth: number;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    onSubmit: (e: any) => void;
    onChange: (e: any) => void;
    onFocus: (e: any) => void;
    onBlur: (e: any) => void;
    onClear: () => void;
    onCancel: () => void;
    render(): JSX.Element;
}
