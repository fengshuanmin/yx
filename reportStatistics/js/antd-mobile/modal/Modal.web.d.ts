import React from 'react';
import ModalProps from './ModalPropsType';
export default class Modal extends React.Component<ModalProps, any> {
    static defaultProps: {
        prefixCls: string;
        transparent: boolean;
        animated: boolean;
        style: {};
        onShow(): void;
        footer: any[];
    };
    render(): JSX.Element;
}
