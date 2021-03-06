import React from 'react';
export interface AccordionProps {
    prefixCls?: string;
    style?: React.CSSProperties;
}
export default class Accordion extends React.Component<AccordionProps, any> {
    static Panel: any;
    static defaultProps: {
        prefixCls: string;
    };
    render(): JSX.Element;
}
