import React from 'react';
export default class Table extends React.Component<any, any> {
    static defaultProps: {
        dataSource: any[];
        prefixCls: string;
    };
    render(): JSX.Element;
}
