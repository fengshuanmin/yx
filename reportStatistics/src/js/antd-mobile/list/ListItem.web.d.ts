import React from 'react';
import { ListItemProps, BriefProps } from './ListPropTypes';
export declare class Brief extends React.Component<BriefProps, any> {
    render(): JSX.Element;
}
export default class ListItem extends React.Component<ListItemProps, any> {
    static Brief: typeof Brief;
    static defaultProps: {
        prefixCls: string;
        thumb: string;
        arrow: string;
        children: string;
        extra: string;
        error: boolean;
        multipleLine: boolean;
        align: string;
        wrap: boolean;
    };
    static myName: string;
    constructor(props: any);
    onClick: (e: any) => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
    render(): JSX.Element;
}
