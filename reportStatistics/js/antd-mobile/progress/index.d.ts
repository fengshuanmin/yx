import React from 'react';
import ProgressProps from './ProgressPropsType';
export default class Progress extends React.Component<ProgressProps, any> {
    static defaultProps: {
        percent: number;
        position: string;
        unfilled: string;
    };
    constructor(props: any);
    onLayout: (e: any) => void;
    render(): JSX.Element;
}
