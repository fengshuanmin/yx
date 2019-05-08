import React from 'react';
import TextareaItemProps from './TextAreaItemPropsType';
export interface TextareaItemState {
    focus: boolean;
}
export default class TextareaItem extends React.Component<TextareaItemProps, TextareaItemState> {
    static defaultProps: {
        prefixCls: string;
        prefixListCls: string;
        title: string;
        autoHeight: boolean;
        editable: boolean;
        disabled: boolean;
        name: string;
        defaultValue: string;
        placeholder: string;
        clear: boolean;
        rows: number;
        onChange: () => void;
        onBlur: () => void;
        onFocus: () => void;
        onErrorClick: () => void;
        error: boolean;
        labelNumber: number;
    };
    initialTextHeight: number;
    debounceTimeout: any;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentWillUnmount(): void;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
    onFocus: (e: any) => void;
    onErrorClick: () => void;
    clearInput: () => void;
    render(): JSX.Element;
}
