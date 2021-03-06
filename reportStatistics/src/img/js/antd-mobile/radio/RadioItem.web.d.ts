import React from 'react';
import RadioItemProps from './RadioItemPropsType';
export default class RadioItem extends React.Component<RadioItemProps, any> {
    static defaultProps: {
        prefixCls: string;
        listPrefixCls: string;
    };
    render(): JSX.Element;
}
