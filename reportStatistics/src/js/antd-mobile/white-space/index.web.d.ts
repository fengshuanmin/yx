import React from 'react';
import WhiteSpaceProps from './WhiteSpacePropsType';
export default class WhiteSpace extends React.Component<WhiteSpaceProps, any> {
    static defaultProps: {
        prefixCls: string;
        size: string;
    };
    render(): JSX.Element;
}
