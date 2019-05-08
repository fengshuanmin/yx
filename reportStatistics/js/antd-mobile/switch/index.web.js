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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Switch = function (_React$Component) {
    (0, _inherits3["default"])(Switch, _React$Component);

    function Switch() {
        (0, _classCallCheck3["default"])(this, Switch);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

        _this.onChange = function (e) {
            var checked = e.target.checked;
            _this.props.onChange(checked);
        };
        return _this;
    }

    Switch.prototype.render = function render() {
        var _classNames;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var style = _props.style;
        var name = _props.name;
        var checked = _props.checked;
        var disabled = _props.disabled;
        var className = _props.className;

        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, '' + prefixCls, true), (0, _defineProperty3["default"])(_classNames, className, className), _classNames));
        return _react2["default"].createElement(
            'label',
            { className: wrapCls, style: style },
            _react2["default"].createElement('input', (0, _extends3["default"])({ type: 'checkbox', name: name, className: prefixCls + '-checkbox' }, disabled ? { disabled: 'disabled' } : '', { checked: checked, onChange: this.onChange })),
            _react2["default"].createElement('div', { className: 'checkbox' })
        );
    };

    return Switch;
}(_react2["default"].Component);

exports["default"] = Switch;

Switch.defaultProps = {
    prefixCls: 'am-switch',
    name: '',
    checked: false,
    disabled: false,
    onChange: function onChange() {}
};
module.exports = exports['default'];