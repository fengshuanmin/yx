import React from 'react';
import tsProps from './PropsType';
export default class Button extends React.Component<tsProps, any> {
    static defaultProps: {
        pressIn: boolean;
        size: string;
        disabled: boolean;
        inline: boolean;
        loading: boolean;
        onClick: (x: any) => void;
    };
    mTextColor: string;
    mBorderColor: string;
    mTextHighlightColor: string;
    mBorderHighlightColor: string;
    constructor(props: any);
    pressTextColor(): {
        color: string;
    };
    pressBorderColor(): {
        borderColor: string;
    };
    onPressIn: (...args: any[]) => void;
    onPressOut: (...args: any[]) => void;
    render(): JSX.Element;
}
