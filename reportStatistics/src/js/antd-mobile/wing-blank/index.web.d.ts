import React from 'react';
import WingBlankProps from './WingBlankPropsType';
export default class WingBlank extends React.Component<WingBlankProps, any> {
    static defaultProps: {
        prefixCls: string;
        size: string;
    };
    render(): JSX.Element;
}
