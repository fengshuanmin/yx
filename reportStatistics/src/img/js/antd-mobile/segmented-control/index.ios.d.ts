import React from 'react';
import SegmentedControlProps from './SegmentedControlPropTypes';
export default class SegmentedControl extends React.Component<SegmentedControlProps, any> {
    static defaultProps: {
        tintColor: string;
        selectedIndex: number;
    };
    render(): JSX.Element;
}
