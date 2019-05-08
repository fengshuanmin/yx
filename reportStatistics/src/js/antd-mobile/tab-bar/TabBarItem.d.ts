import React from 'react';
import TabBarItemProps from './TabBarItemPropTypes';
export default class TabBarItem extends React.Component<TabBarItemProps, any> {
    static defaultProps: {
        onPress(): void;
    };
    render(): JSX.Element;
}
