import React from 'react';
import ImagePickerPropTypes from './ImagePickerPropTypes';
export default class ImagePicker extends React.Component<ImagePickerPropTypes, any> {
    static defaultProps: {
        prefixCls: string;
        files: any[];
        onChange: () => void;
    };
    getOrientation: (file: any, callback: any) => void;
    removeImage: (index: any) => void;
    addImage: (imgItem: any) => void;
    onFileChange: () => void;
    render(): JSX.Element;
}
