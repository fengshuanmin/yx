import React from 'react';
import CheckboxPropsType from './CheckboxPropsType';
export default class Checkbox extends React.Component<CheckboxPropsType, any> {
    static defaultProps: {
        prefixCls: string;
    };
    static CheckboxItem: any;
    static AgreeItem: any;
    render(): JSX.Element;
}
