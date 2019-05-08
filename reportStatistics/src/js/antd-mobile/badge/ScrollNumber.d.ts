import React from 'react';
export default class ScrollNumber extends React.Component<any, any> {
    static defaultProps: {
        prefixCls: string;
        count: any;
        component: string;
        onAnimated(): void;
        height: number;
    };
    lastCount: any;
    constructor(props: any);
    componentDidMount(): void;
    getPositionByNum(num: any, i: any): any;
    componentWillReceiveProps(nextProps: any): void;
    renderNumberList(position: any): any[];
    renderCurrentNumber(num: any, i: any): React.ReactElement<{
        className: string;
        style: {
            transition: string;
            WebkitTransform: string;
            transform: string;
            height: any;
        };
        key: any;
    }>;
    renderNumberElement(): any;
    render(): React.DOMElement<{}, Element>;
}
