import React from 'react';
import RadioProps from './RadioPropsType';
export default class Radio extends React.Component<RadioProps, any> {
    static RadioItem: any;
    static defaultProps: {
        prefixCls: string;
    };
    render(): JSX.Element;
}
