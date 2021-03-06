'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Radio = require('./Radio.web');

var _Radio2 = _interopRequireDefault(_Radio);

var _list = require('../list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ListItem = _list2["default"].Item;

var RadioItem = function (_React$Component) {
    (0, _inherits3["default"])(RadioItem, _React$Component);

    function RadioItem() {
        (0, _classCallCheck3["default"])(this, RadioItem);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    RadioItem.prototype.render = function render() {
        var _classNames;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var listPrefixCls = _props.listPrefixCls;
        var style = _props.style;
        var name = _props.name;
        var defaultChecked = _props.defaultChecked;
        var checked = _props.checked;
        var disabled = _props.disabled;
        var children = _props.children;
        var className = _props.className;
        var onChange = _props.onChange;

        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls + '-item', true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-item-disabled', disabled === true), (0, _defineProperty3["default"])(_classNames, className, className), _classNames));
        var onClickProps = disabled ? {} : { onClick: function onClick() {} };
        return _react2["default"].createElement(
            ListItem,
            (0, _extends3["default"])({ prefixCls: listPrefixCls, style: style, className: wrapCls }, onClickProps, { extra: _react2["default"].createElement(_Radio2["default"], { defaultChecked: defaultChecked, checked: checked, name: name, onChange: onChange, disabled: disabled }) }),
            children
        );
    };

    return RadioItem;
}(_react2["default"].Component);

exports["default"] = RadioItem;

RadioItem.defaultProps = {
    prefixCls: 'am-radio',
    listPrefixCls: 'am-list'
};
module.exports = exports['default'];