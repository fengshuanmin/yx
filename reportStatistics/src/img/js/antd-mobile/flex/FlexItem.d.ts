import React from 'react';
export interface FlexItemProps {
    flex?: number;
    style?: React.CSSProperties;
    onPress?: any;
    children?: any;
}
export default class FlexItem extends React.Component<FlexItemProps, any> {
    static defaultProps: {
        flex: number;
    };
    render(): JSX.Element;
}
