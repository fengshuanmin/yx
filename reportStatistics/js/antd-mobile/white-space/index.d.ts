import React from 'react';
import WhiteSpaceProps from './WhiteSpacePropsType';
declare class WhiteSpace extends React.Component<WhiteSpaceProps, any> {
    static defaultProps: {
        size: string;
    };
    render(): JSX.Element;
}
export default WhiteSpace;
