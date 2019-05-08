import React from 'react';
import FlexProps from './FlexPropTypes';
export default class Flex extends React.Component<FlexProps, any> {
    static Item: any;
    static defaultProps: {
        prefixCls: string;
        align: string;
        onClick: () => void;
    };
    render(): JSX.Element;
}
