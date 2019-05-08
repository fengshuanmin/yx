import React from 'react';
import tsPropsType from './PropsType';
export default class Popover extends React.Component<tsPropsType, any> {
    static defaultProps: {
        prefixCls: string;
        placement: string;
        popupAlign: {
            overflow: {
                adjustY: number;
                adjustX: number;
            };
        };
        trigger: string[];
        onSelect: () => void;
    };
    static Item: React.ClassicComponentClass<{
        onTouchStart?: Function;
        onTouchEnd?: Function;
        onTouchCancel?: Function;
    } & {}>;
    render(): JSX.Element;
}
