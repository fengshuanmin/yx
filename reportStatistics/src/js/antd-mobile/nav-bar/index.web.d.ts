import React from 'react';
export interface NavBarProps {
    prefixCls?: string;
    children?: any;
    mode?: 'dark' | 'light';
    iconName?: string | boolean;
    leftContent?: any;
    rightContent?: any;
    onLeftClick?: () => void;
}
export default class NavBar extends React.Component<NavBarProps, any> {
    static defaultProps: {
        prefixCls: string;
        mode: string;
        iconName: string;
        onLeftClick(): void;
    };
    render(): JSX.Element;
}
