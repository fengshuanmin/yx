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

var _rcCheckbox = require('rc-checkbox');

var _rcCheckbox2 = _interopRequireDefault(_rcCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Radio = function (_React$Component) {
    (0, _inherits3["default"])(Radio, _React$Component);

    function Radio() {
        (0, _classCallCheck3["default"])(this, Radio);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    Radio.prototype.render = function render() {
        return _react2["default"].createElement(_rcCheckbox2["default"], (0, _extends3["default"])({}, this.props, { type: 'radio' }));
    };

    return Radio;
}(_react2["default"].Component);

exports["default"] = Radio;

Radio.defaultProps = {
    prefixCls: 'am-radio'
};
module.exports = exports['default'];