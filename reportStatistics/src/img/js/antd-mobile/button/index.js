'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Button = function (_React$Component) {
    (0, _inherits3["default"])(Button, _React$Component);

    function Button(props) {
        (0, _classCallCheck3["default"])(this, Button);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.onPressIn = function () {
            _this.setState({ pressIn: true });
        };
        _this.onPressOut = function () {
            _this.setState({ pressIn: false });
        };
        _this.state = {
            pressIn: false
        };
        return _this;
    }

    Button.prototype.pressTextColor = function pressTextColor() {
        if (this.state.pressIn) {
            return { color: this.mTextHighlightColor };
        }
        return { color: this.mTextColor };
    };

    Button.prototype.pressBorderColor = function pressBorderColor() {
        if (this.state.pressIn && this.mBorderHighlightColor) {
            return { borderColor: this.mBorderHighlightColor };
        }
        return { borderColor: this.mBorderColor };
    };

    Button.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props;
        var size = _props.size;
        var type = _props.type;
        var disabled = _props.disabled;

        var height = void 0;
        var fontSize = void 0;
        var paddingLeft = void 0;
        var paddingRight = void 0;
        var backgroundColor = void 0;
        var textColor = void 0;
        var borderColor = void 0;
        var highlightBackgroundColor = void 0;
        var highlightTextColor = void 0;
        var highlightBorderColor = void 0;
        switch (size) {
            case 'large':
                height = _default2["default"].button_height;
                fontSize = _default2["default"].button_font_size;
                paddingLeft = paddingRight = _default2["default"].h_spacing_sm;
                break;
            case 'small':
                height = _default2["default"].button_height_sm;
                fontSize = _default2["default"].button_font_size_sm;
                paddingLeft = paddingRight = _default2["default"].h_spacing_sm;
                break;
            default:
                break;
        }
        if (type === 'primary') {
            textColor = _default2["default"].color_text_base_inverse;
            backgroundColor = _default2["default"].primary_button_fill;
            borderColor = _default2["default"].primary_button_fill;
            highlightTextColor = _default2["default"].color_text_base_inverse;
            highlightBackgroundColor = _default2["default"].primary_button_fill_tap;
            highlightBorderColor = _default2["default"].primary_button_fill;
        } else if (type === 'ghost') {
            textColor = _default2["default"].ghost_button_color;
            backgroundColor = 'transparent';
            borderColor = _default2["default"].ghost_button_color;
            highlightTextColor = _default2["default"].color_text_base_inverse;
            highlightBackgroundColor = _default2["default"].ghost_button_fill_tap;
            highlightBorderColor = _default2["default"].ghost_button_color;
        } else if (type === 'warning') {
            textColor = _default2["default"].brand_warning;
            backgroundColor = _default2["default"].fill_base;
            borderColor = _default2["default"].brand_warning;
            highlightBackgroundColor = _default2["default"].brand_warning;
        } else {
            textColor = _default2["default"].color_text_base;
            backgroundColor = _default2["default"].fill_base;
            borderColor = _default2["default"].border_color_base;
            highlightBackgroundColor = _default2["default"].fill_tap;
            highlightTextColor = textColor;
        }
        if (disabled) {
            textColor = _default2["default"].color_text_disabled;
            backgroundColor = _default2["default"].fill_disabled;
            borderColor = _default2["default"].fill_disabled;
        }
        var touchableProps = {};
        if (!disabled) {
            touchableProps.onPressIn = this.onPressIn;
            touchableProps.onPressOut = this.onPressOut;
        }
        var style = {
            alignItems: 'center',
            height: height,
            paddingLeft: paddingLeft,
            paddingRight: paddingRight,
            backgroundColor: backgroundColor,
            borderRadius: _default2["default"].radius_md,
            borderWidth: 1,
            borderColor: borderColor,
            justifyContent: 'center'
        };
        this.mTextColor = textColor;
        this.mBorderColor = borderColor;
        this.mTextHighlightColor = highlightTextColor;
        if (highlightBorderColor) {
            this.mBorderHighlightColor = highlightBorderColor;
        }
        if (disabled) {
            return _react2["default"].createElement(
                _reactNative.View,
                (0, _extends3["default"])({}, this.props, { style: [style, this.pressBorderColor(), this.props.style] }),
                _react2["default"].createElement(
                    _reactNative.Text,
                    { style: [{ fontSize: fontSize }, this.pressTextColor()] },
                    this.props.children
                )
            );
        }
        return _react2["default"].createElement(
            _reactNative.TouchableHighlight,
            (0, _extends3["default"])({ activeOpacity: 1, onPress: function onPress() {
                    return _this2.props.onClick(_this2);
                }, delayPressOut: 1 }, this.props, touchableProps, { style: [style, this.pressBorderColor(), this.props.style], underlayColor: highlightBackgroundColor }),
            _react2["default"].createElement(
                _reactNative.Text,
                { style: [{ fontSize: fontSize }, this.pressTextColor()] },
                this.props.children
            )
        );
    };

    return Button;
}(_react2["default"].Component);

exports["default"] = Button;

Button.defaultProps = {
    pressIn: false,
    size: 'large',
    disabled: false,
    inline: false,
    loading: false,
    onClick: function onClick(x) {}
};
module.exports = exports['default'];