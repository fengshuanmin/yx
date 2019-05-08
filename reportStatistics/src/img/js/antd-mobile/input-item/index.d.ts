import React from 'react';
import InputItemProps from './InputItemPropsType';
export default class InputItem extends React.Component<InputItemProps, any> {
    static defaultProps: {
        prefixCls: string;
        prefixListCls: string;
        type: string;
        editable: boolean;
        name: string;
        value: string;
        placeholder: string;
        clear: boolean;
        maxLength: number;
        onChange: () => void;
        onBlur: () => void;
        onFocus: () => void;
        extra: string;
        onExtraPress: () => void;
        error: boolean;
        onErrorPress: () => void;
        size: string;
        labelNumber: number;
        labelPosition: string;
        textAlign: string;
        last: boolean;
    };
    constructor(props: any);
    onChange: (text: any) => void;
    render(): JSX.Element;
}
