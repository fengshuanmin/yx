import React from 'react';
export interface ViewPagerProps {
    selectedIndex?: number;
    bounces?: boolean;
    children?: any;
    style?: any;
    dots?: boolean;
    autoplay?: boolean;
    autoplayTimeout?: number;
    infinite?: boolean;
    onScrollBeginDrag?: Function;
    onMomentumScrollEnd?: Function;
}
declare const ViewPager: React.ClassicComponentClass<ViewPagerProps>;
export default ViewPager;
