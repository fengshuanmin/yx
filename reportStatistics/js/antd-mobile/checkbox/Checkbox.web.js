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

var _rcCheckbox = require('rc-checkbox');

var _rcCheckbox2 = _interopRequireDefault(_rcCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Checkbox = function (_React$Component) {
    (0, _inherits3["default"])(Checkbox, _React$Component);

    function Checkbox() {
        (0, _classCallCheck3["default"])(this, Checkbox);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    Checkbox.prototype.render = function render() {
        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var style = _props.style;
        var name = _props.name;
        var defaultChecked = _props.defaultChecked;
        var checked = _props.checked;
        var disabled = _props.disabled;
        var className = _props.className;
        var onChange = _props.onChange;

        return _react2["default"].createElement(_rcCheckbox2["default"], { prefixCls: prefixCls, className: className, style: style, checked: checked, defaultChecked: defaultChecked, name: name, onChange: onChange, disabled: disabled });
    };

    return Checkbox;
}(_react2["default"].Component);

exports["default"] = Checkbox;

Checkbox.defaultProps = {
    prefixCls: 'am-checkbox'
};
module.exports = exports['default'];