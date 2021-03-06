import React from 'react';
import SegmentedControlProps from './SegmentedControlPropTypes';
export default class SegmentedControl extends React.Component<SegmentedControlProps, any> {
    static defaultProps: {
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
    onPress(e: any, index: any, value: any): void;
    render(): JSX.Element;
}
