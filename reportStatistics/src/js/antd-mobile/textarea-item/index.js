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

var TextAreaItem = function (_React$Component) {
    (0, _inherits3["default"])(TextAreaItem, _React$Component);

    function TextAreaItem(props) {
        (0, _classCallCheck3["default"])(this, TextAreaItem);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.onChange = function (event) {
            var text = event.nativeEvent.text;
            var height = void 0;
            var _this$props = _this.props;
            var autoHeight = _this$props.autoHeight;
            var rows = _this$props.rows;

            if (autoHeight) {
                height = event.nativeEvent.contentSize.height;
            } else if (rows > 1) {
                height = 6 * rows * 4;
            } else {
                height = _default2["default"].list_item_height;
            }
            _this.setState({
                value: text,
                inputCount: text.length,
                height: height
            });
            _this.props.onChange({ text: text });
        };
        _this.onFocus = function () {
            _this.props.onFocus();
        };
        _this.onBlur = function () {
            _this.props.onBlur();
        };
        _this.onErrorClick = function () {
            _this.props.onErrorClick();
        };
        _this.state = {
            value: props.value,
            inputCount: 0,
            height: props.rows > 1 ? 6 * props.rows * 4 : _default2["default"].list_item_height
        };
        return _this;
    }

    TextAreaItem.prototype.render = function render() {
        var _this2 = this;

        var inputCount = this.state.inputCount;
        var _props = this.props;
        var rows = _props.rows;
        var error = _props.error;
        var clear = _props.clear;
        var count = _props.count;
        var placeholder = _props.placeholder;
        var autoHeight = _props.autoHeight;
        var editable = _props.editable;
        var last = _props.last;

        var containerStyle = {
            borderBottomWidth: last ? 0 : _default2["default"].border_width_sm
        };
        var textareaStyle = {
            color: error ? '#f50' : _default2["default"].color_text_base,
            paddingRight: error ? 2 * _default2["default"].h_spacing_lg : 0
        };
        var maxLength = count > 0 ? count : null;
        return _react2["default"].createElement(
            _reactNative.View,
            { style: [_index2["default"].container, containerStyle, { position: 'relative' }] },
            _react2["default"].createElement(_reactNative.TextInput, { style: [_index2["default"].input, textareaStyle, { height: Math.max(45, this.state.height) }], onChange: function onChange(event) {
                    return _this2.onChange(event);
                }, onFocus: this.onFocus, onBlur: this.onBlur, value: this.state.value, placeholder: placeholder, multiline: rows > 1 || autoHeight, numberOfLines: rows, maxLength: maxLength, clearButtonMode: clear ? 'while-editing' : 'never', editable: editable }),
            error ? _react2["default"].createElement(
                _reactNative.TouchableWithoutFeedback,
                { onPress: this.onErrorClick },
                _react2["default"].createElement(
                    _reactNative.View,
                    { style: [_index2["default"].errorIcon] },
                    _react2["default"].createElement(_reactNative.Image, { source: require('../style/images/error.png'), style: { width: _default2["default"].icon_size_xs, height: _default2["default"].icon_size_xs } })
                )
            ) : null,
            rows > 1 && count > 0 ? _react2["default"].createElement(
                _reactNative.View,
                { style: [_index2["default"].count] },
                _react2["default"].createElement(
                    _reactNative.Text,
                    null,
                    inputCount,
                    ' / ',
                    count
                )
            ) : null
        );
    };

    return TextAreaItem;
}(_react2["default"].Component);

exports["default"] = TextAreaItem;

TextAreaItem.defaultProps = {
    onChange: function onChange() {},
    onFocus: function onFocus() {},
    onBlur: function onBlur() {},
    onErrorClick: function onErrorClick() {},

    clear: true,
    error: false,
    editable: true,
    rows: 1,
    value: '',
    placeholder: '',
    count: 0,
    keyboardType: 'default',
    autoHeight: false,
    last: false
};
module.exports = exports['default'];