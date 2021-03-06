import React from 'react';
import ProgressProps from './ProgressPropsType';
export default class Progress extends React.Component<ProgressProps, any> {
    static defaultProps: {
        prefixCls: string;
        percent: number;
        position: string;
        unfilled: string;
    };
    constructor(props: any);
    render(): JSX.Element;
}
