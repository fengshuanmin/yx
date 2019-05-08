'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _default = require('../style/themes/default');

var _default2 = _interopRequireDefault(_default);

var _index = require('./style/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function noop() {}

var InputItem = function (_React$Component) {
    (0, _inherits3["default"])(InputItem, _React$Component);

    function InputItem(props) {
        (0, _classCallCheck3["default"])(this, InputItem);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.onChange = function (text) {
            var _this$props = _this.props;
            var maxLength = _this$props.maxLength;
            var onChange = _this$props.onChange;
            var type = _this$props.type;

            switch (type) {
                case 'text':
                    if (maxLength > 0) {
                        text = text.substring(0, maxLength);
                    }
                    break;
                case 'bankCard':
                    text = text.replace(/\D/g, '');
                    if (maxLength > 0) {
                        text = text.substring(0, maxLength);
                    }
                    text = text.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
                    break;
                case 'phone':
                    text = text.replace(/\D/g, '');
                    if (maxLength > 0) {
                        text = text.substring(0, 11);
                    }
                    var valueLen = text.length;
                    if (valueLen > 3 && valueLen < 8) {
                        text = text.substr(0, 3) + ' ' + text.substr(3);
                    } else if (valueLen >= 8) {
                        text = text.substr(0, 3) + ' ' + text.substr(3, 4) + ' ' + text.substr(7);
                    }
                    break;
                case 'number':
                    text = text.replace(/\D/g, '');
                    break;
                case 'password':
                    break;
                default:
                    break;
            }
            onChange(text);
        };
        return _this;
    }

    InputItem.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props;
        var type = _props.type;
        var editable = _props.editable;
        var value = _props.value;
        var placeholder = _props.placeholder;
        var style = _props.style;
        var clear = _props.clear;
        var children = _props.children;
        var error = _props.error;
        var extra = _props.extra;
        var labelNumber = _props.labelNumber;
        var last = _props.last;

        var containerStyle = {
            borderBottomWidth: last ? 0 : _default2["default"].border_width_sm
        };
        var textStyle = {
            width: _default2["default"].font_size_heading * labelNumber
        };
        var inputStyle = {
            color: error ? '#f50' : _default2["default"].color_text_base
        };
        var extraStyle = {
            width: typeof extra === 'string' && extra.length > 0 ? extra.length * _default2["default"].font_size_heading : 0
        };
        return _react2["default"].createElement(
            _reactNative.View,
            { style: [_index2["default"].container, containerStyle, style] },
            children ? _react2["default"].createElement(
                _reactNative.Text,
                { style: [_index2["default"].text, textStyle] },
                children
            ) : null,
            _react2["default"].createElement(_reactNative.TextInput, { style: [_index2["default"].input, inputStyle], value: value, keyboardType: type === 'number' || type === 'bankCard' ? 'numeric' : 'default', onChange: function onChange(event) {
                    return _this2.onChange(event.nativeEvent.text);
                }, onFocus: function onFocus() {
                    return _this2.props.onFocus();
                }, onBlur: function onBlur() {
                    return _this2.props.onBlur();
                }, placeholder: placeholder, autoCorrect: false, secureTextEntry: type === 'password', clearButtonMode: clear ? 'while-editing' : 'never', editable: editable }),
            extra ? _react2["default"].createElement(
                _reactNative.TouchableWithoutFeedback,
                { onPress: function onPress() {
                        _this2.props.onExtraPress();
                    } },
                _react2["default"].createElement(
                    _reactNative.View,
                    null,
                    _react2["default"].createElement(
                        _reactNative.Text,
                        { style: [_index2["default"].extra, extraStyle] },
                        extra
                    )
                )
            ) : null,
            error && _react2["default"].createElement(
                _reactNative.TouchableWithoutFeedback,
                { onPress: function onPress() {
                        _this2.props.onErrorPress();
                    } },
                _react2["default"].createElement(
                    _reactNative.View,
                    { style: [_index2["default"].errorIcon] },
                    _react2["default"].createElement(_reactNative.Image, { source: require('../style/images/error.png'), style: { width: _default2["default"].icon_size_xs, height: _default2["default"].icon_size_xs } })
                )
            )
        );
    };

    return InputItem;
}(_react2["default"].Component);

exports["default"] = InputItem;

InputItem.defaultProps = {
    prefixCls: 'am-input',
    prefixListCls: 'am-list',
    type: 'text',
    editable: true,
    name: '',
    value: '',
    placeholder: '',
    clear: false,
    maxLength: -1,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    extra: '',
    onExtraPress: noop,
    error: false,
    onErrorPress: noop,
    size: 'large',
    labelNumber: 4,
    labelPosition: 'left',
    textAlign: 'left',
    last: false
};
module.exports = exports['default'];