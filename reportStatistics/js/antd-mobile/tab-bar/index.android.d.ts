import React from 'react';
import TabBarProps from './TabBarPropTypes';
declare class TabBar extends React.Component<TabBarProps, any> {
    static defaultProps: {
        barTintColor: string;
        tintColor: string;
        unselectedTintColor: string;
    };
    static Item: any;
    getPanes(content: any): any[];
    render(): JSX.Element;
}
export default TabBar;