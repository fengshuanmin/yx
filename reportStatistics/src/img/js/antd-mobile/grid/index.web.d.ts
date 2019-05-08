import React from 'react';
export interface DataItem {
    icon?: any;
    text?: any;
    [key: string]: any;
}
export interface GridProps {
    /** web only */
    prefixCls?: string;
    /** web only */
    className?: string;
    style?: React.CSSProperties;
    data?: Array<DataItem>;
    renderItem?: (dataItem: DataItem, itemIndex: number) => React.ReactElement<any>;
    columnNum?: number;
    onClick?: (dataItem: DataItem, itemIndex: number) => void;
    hasLine?: boolean;
    isCarousel?: boolean;
    carouselMaxRow?: number;
}
export default class Grid extends React.Component<GridProps, any> {
    static defaultProps: {
        prefixCls: string;
        data: any[];
        onClick: () => void;
        columnNum: number;
        hasLine: boolean;
        isCarousel: boolean;
        carouselMaxRow: number;
    };
    clientWidth: number;
    render(): JSX.Element;
}
