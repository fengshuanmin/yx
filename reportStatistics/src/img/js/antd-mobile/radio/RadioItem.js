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

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _list = require('../list');

var _list2 = _interopRequireDefault(_list);

var _index = require('./style/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ListItem = _list2["default"].Item;
var refRadio = 'radio';

var RadioItem = function (_React$Component) {
    (0, _inherits3["default"])(RadioItem, _React$Component);

    function RadioItem() {
        (0, _classCallCheck3["default"])(this, RadioItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

        _this.handleClick = function () {
            var radio = _this.refs[refRadio];
            radio.handleClick();
        };
        return _this;
    }

    RadioItem.prototype.render = function render() {
        var _props = this.props;
        var style = _props.style;
        var radioStyle = _props.radioStyle;
        var defaultChecked = _props.defaultChecked;
        var checked = _props.checked;
        var disabled = _props.disabled;
        var children = _props.children;
        var onChange = _props.onChange;

        var contentDom = null;
        if (_react2["default"].isValidElement(children)) {
            contentDom = _react2["default"].createElement(
                _reactNative.View,
                { style: { flex: 1 } },
                children
            );
        } else {
            var contentStyle = [_index2["default"].radioItemContent, disabled ? _index2["default"].radioItemContentDisable : {}];
            contentDom = _react2["default"].createElement(
                _reactNative.Text,
                { style: contentStyle, numberOfLines: 1 },
                this.props.children
            );
        }
        return _react2["default"].createElement(
            ListItem,
            { style: style, onClick: disabled ? null : this.handleClick, extra: _react2["default"].createElement(_Radio2["default"], { ref: refRadio, style: radioStyle, defaultChecked: defaultChecked, checked: checked, onChange: onChange, disabled: disabled }) },
            contentDom
        );
    };

    return RadioItem;
}(_react2["default"].Component);

exports["default"] = RadioItem;
module.exports = exports['default'];