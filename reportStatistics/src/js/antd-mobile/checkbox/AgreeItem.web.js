'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

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

var _Checkbox = require('./Checkbox.web');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AgreeItem = function (_React$Component) {
    (0, _inherits3["default"])(AgreeItem, _React$Component);

    function AgreeItem() {
        (0, _classCallCheck3["default"])(this, AgreeItem);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    AgreeItem.prototype.render = function render() {
        var _classNames;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var style = _props.style;
        var name = _props.name;
        var defaultChecked = _props.defaultChecked;
        var checked = _props.checked;
        var disabled = _props.disabled;
        var children = _props.children;
        var onChange = _props.onChange;
        var className = _props.className;

        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls + '-agree', true), (0, _defineProperty3["default"])(_classNames, className, className), _classNames));
        return _react2["default"].createElement(
            'div',
            { className: wrapCls, style: style },
            _react2["default"].createElement(
                'label',
                { className: prefixCls + '-agree-label', htmlFor: name },
                _react2["default"].createElement(_Checkbox2["default"], { prefixCls: prefixCls, defaultChecked: defaultChecked, checked: checked, name: name, onChange: onChange, disabled: disabled }),
                children
            )
        );
    };

    return AgreeItem;
}(_react2["default"].Component);

exports["default"] = AgreeItem;

AgreeItem.defaultProps = {
    prefixCls: 'am-checkbox'
};
module.exports = exports['default'];