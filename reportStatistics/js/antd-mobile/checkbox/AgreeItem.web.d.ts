import React from 'react';
import AgreeItemProps from './AgreeItemPropsType';
export default class AgreeItem extends React.Component<AgreeItemProps, any> {
    static defaultProps: {
        prefixCls: string;
    };
    render(): JSX.Element;
}
