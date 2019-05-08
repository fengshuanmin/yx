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
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    onSubmit: (e: any) => void;
    onChangeText: (value: any) => void;
    onCancel: () => void;
    render(): JSX.Element;
}
