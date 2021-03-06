import React from 'react';
export interface GridItem {
    icon: string;
    text: string;
}
export interface GridProps {
    data: GridItem[];
    hasLine?: boolean;
    isCarousel?: boolean;
    onClick?: (el: GridItem, index: number) => void;
}
export default class Grid extends React.Component<GridProps, any> {
    static defaultProps: {
        data: any[];
        hasLine: boolean;
        isCarousel: boolean;
        onClick(): void;
    };
    getFlexItemStyle(): {
        height: number;
        borderRightWidth: number;
    };
    getGridContent(): any[];
    toCarousel(gridContent: any): any[];
    render(): JSX.Element;
}
