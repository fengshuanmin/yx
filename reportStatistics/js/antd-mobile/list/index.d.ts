import React from 'react';
import Item from './ListItem';
import { ListProps } from './ListPropTypes';
export default class List extends React.Component<ListProps, any> {
    static Item: typeof Item;
    render(): JSX.Element;
}
