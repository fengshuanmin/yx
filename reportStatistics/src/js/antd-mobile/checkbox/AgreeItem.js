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

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _index = require('./style/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var refCheckbox = 'checkbox';

var AgreeItem = function (_React$Component) {
    (0, _inherits3["default"])(AgreeItem, _React$Component);

    function AgreeItem() {
        (0, _classCallCheck3["default"])(this, AgreeItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

        _this.handleClick = function () {
            var checkBox = _this.refs[refCheckbox];
            checkBox.handleClick();
        };
        return _this;
    }

    AgreeItem.prototype.render = function render() {
        var _props = this.props;
        var style = _props.style;
        var checkboxStyle = _props.checkboxStyle;
        var children = _props.children;
        var disabled = _props.disabled;
        var checked = _props.checked;
        var defaultChecked = _props.defaultChecked;
        var onChange = _props.onChange;

        var contentDom = void 0;
        if (_react2["default"].isValidElement(children)) {
            contentDom = children;
        } else {
            contentDom = _react2["default"].createElement(
                _reactNative.Text,
                null,
                children
            );
        }
        return _react2["default"].createElement(
            _reactNative.TouchableWithoutFeedback,
            { onPress: this.handleClick },
            _react2["default"].createElement(
                _reactNative.View,
                { style: [_index2["default"].agreeItem, style] },
                _react2["default"].createElement(_Checkbox2["default"], { ref: refCheckbox, style: [_index2["default"].agreeItemCheckbox, checkboxStyle], disabled: disabled, checked: checked, defaultChecked: defaultChecked, onChange: onChange }),
                _react2["default"].createElement(
                    _reactNative.View,
                    { style: { flex: 1 } },
                    contentDom
                )
            )
        );
    };

    return AgreeItem;
}(_react2["default"].Component);

exports["default"] = AgreeItem;
module.exports = exports['default'];