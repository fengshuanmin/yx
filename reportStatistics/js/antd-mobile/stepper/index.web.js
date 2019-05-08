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

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _rcInputNumber = require('rc-input-number');

var _rcInputNumber2 = _interopRequireDefault(_rcInputNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Stepper = function (_React$Component) {
    (0, _inherits3["default"])(Stepper, _React$Component);

    function Stepper() {
        (0, _classCallCheck3["default"])(this, Stepper);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    Stepper.prototype.render = function render() {
        var _classNames;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var className = _props.className;
        var showNumber = _props.showNumber;

        var stepperClass = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, className, !!className), (0, _defineProperty3["default"])(_classNames, 'showNumber', !!showNumber), _classNames));
        var restProps = (0, _objectAssign2["default"])({}, this.props);
        ['className', 'prefixCls', 'showNumber'].forEach(function (prop) {
            if (restProps.hasOwnProperty(prop)) {
                delete restProps[prop];
            }
        });
        return _react2["default"].createElement(_rcInputNumber2["default"], (0, _extends3["default"])({ ref: 'inputNumber', prefixCls: prefixCls, className: stepperClass }, restProps));
    };

    return Stepper;
}(_react2["default"].Component);

exports["default"] = Stepper;

Stepper.defaultProps = {
    prefixCls: 'am-stepper',
    step: 1,
    readOnly: false,
    showNumber: false
};
module.exports = exports['default'];