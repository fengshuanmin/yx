/**
 *  fix active style
 *  on Uc browser, css :active not work normal
 */
import React from 'react';
export default function touchableFeedBack<Props>(ComposedComponent: any, ComposedComponentName?: string): React.ClassicComponentClass<{
    onTouchStart?: Function;
    onTouchEnd?: Function;
    onTouchCancel?: Function;
} & Props>;
