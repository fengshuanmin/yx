import React from 'react';
import StepsProps from './StepsPropType';
export default class Steps extends React.Component<StepsProps, any> {
    static Step: any;
    static defaultProps: {
        direction: string;
    };
    constructor(props: any);
    onLayout: (e: any) => void;
    render(): JSX.Element;
}
