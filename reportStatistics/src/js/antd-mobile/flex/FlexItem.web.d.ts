import React from 'react';
export interface FlexItemProps {
    /** web only */
    prefixCls?: string;
    style?: React.CSSProperties;
    /** web only */
    className?: string;
    onClick?: Function;
    children?: any;
}
export default class FlexItem extends React.Component<FlexItemProps, any> {
    static defaultProps: {
        prefixCls: string;
    };
    render(): JSX.Element;
}
