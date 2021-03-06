import React from 'react';
import CheckboxItemProps from './CheckboxItemPropsType';
export default class CheckboxItem extends React.Component<CheckboxItemProps, any> {
    static defaultProps: {
        prefixCls: string;
        listPrefixCls: string;
    };
    render(): JSX.Element;
}
