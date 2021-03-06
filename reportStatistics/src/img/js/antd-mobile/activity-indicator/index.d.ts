import React from 'react';
import PropTypes from './ActivityIndicatorPropTypes';
export default class RNActivityIndicator extends React.Component<PropTypes, any> {
    static defaultProps: {
        animating: boolean;
        color: string;
        size: string;
        panelColor: string;
        toast: boolean;
    };
    _renderToast(): JSX.Element;
    _renderSpinner(): JSX.Element;
    render(): JSX.Element;
}
