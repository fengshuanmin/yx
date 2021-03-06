import React from 'react';
import ModalPropsType from './ModalPropsType';
declare class AntmModal extends React.Component<ModalPropsType, any> {
    static defaultProps: {
        visible: boolean;
        closable: boolean;
        maskClosable: boolean;
        style: {};
        onClose(): void;
        footer: any[];
        transparent: boolean;
    };
    onMaskClose: () => void;
    render(): JSX.Element;
}
export default AntmModal;
