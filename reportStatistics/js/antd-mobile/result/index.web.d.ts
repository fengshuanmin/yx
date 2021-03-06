import React from 'react';
export interface ResultProps {
    prefixCls?: string;
    style?: React.CSSProperties;
    className?: string;
    imgUrl?: string;
    title?: React.ReactNode;
    message?: React.ReactNode;
    buttonText?: string;
    buttonType?: 'primary' | 'ghost';
    buttonClick?: () => void;
}
export default class Result extends React.Component<ResultProps, any> {
    static defaultProps: {
        prefixCls: string;
        imgUrl: string;
        title: string;
        message: string;
        buttonText: string;
        buttonType: string;
        buttonClick: () => void;
    };
    render(): JSX.Element;
}
