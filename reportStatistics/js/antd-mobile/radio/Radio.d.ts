import React from 'react';
import RadioProps from './RadioPropsType';
export default class Radio extends React.Component<RadioProps, any> {
    static RadioItem: any;
    constructor(props: RadioProps, context: any);
    componentWillReceiveProps(nextProps: RadioProps, nextContext: any): void;
    handleClick: () => void;
    render(): JSX.Element;
}
