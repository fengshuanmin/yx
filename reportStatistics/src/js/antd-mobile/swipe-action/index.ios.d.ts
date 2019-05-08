import React from 'react';
import SwipeActionProps from './SwipeActionPropsType';
declare class SwipeAction extends React.Component<SwipeActionProps, any> {
    static defaultProps: {
        autoClose: boolean;
        disabled: boolean;
        left: any[];
        right: any[];
        onOpen(): void;
        onClose(): void;
    };
    render(): JSX.Element;
}
export default SwipeAction;
