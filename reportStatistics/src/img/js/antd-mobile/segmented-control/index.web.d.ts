import React from 'react';
import SegmentedControlProps from './SegmentedControlPropTypes';
export default class SegmentedControl extends React.Component<SegmentedControlProps, any> {
    static defaultProps: {
        prefixCls: string;
        selectedIndex: number;
        enabled: boolean;
        values: any[];
        onChange(): void;
        onValueChange(): void;
        tintColor: string;
        style: {};
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    onClick(e: any, index: any, value: any): void;
    render(): JSX.Element;
}
