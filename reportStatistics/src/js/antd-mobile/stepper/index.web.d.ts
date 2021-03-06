import React from 'react';
import StepProps from './StepPropTypes';
export default class Stepper extends React.Component<StepProps, any> {
    static defaultProps: {
        prefixCls: string;
        step: number;
        readOnly: boolean;
        showNumber: boolean;
    };
    render(): JSX.Element;
}
