import React from 'react';
import NoticeBarProps from './NoticeBarPropsType';
export default class NoticeBar extends React.Component<NoticeBarProps, any> {
    static defaultProps: {
        mode: string;
        onClick(): void;
    };
    constructor(props: any);
    onClick: () => void;
    render(): JSX.Element;
}
