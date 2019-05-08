import React from 'react';
import BadgeProps from './BadgePropsType';
export default class Badge extends React.Component<BadgeProps, any> {
    static defaultProps: {
        prefixCls: string;
        text: any;
        dot: boolean;
        corner: boolean;
        overflowCount: number;
        size: any;
    };
    render(): JSX.Element;
}
