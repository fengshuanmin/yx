import React from 'react';
import CheckboxProps from './CheckboxPropsType';
export default class Checkbox extends React.Component<CheckboxProps, any> {
    static CheckboxItem: any;
    static AgreeItem: any;
    constructor(props: CheckboxProps, context: any);
    componentWillReceiveProps(nextProps: CheckboxProps): void;
    toggle(): void;
    handleClick: () => void;
    render(): JSX.Element;
}
