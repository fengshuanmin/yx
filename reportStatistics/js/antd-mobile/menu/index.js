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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AntMenu = function (_React$Component) {
    (0, _inherits3["default"])(AntMenu, _React$Component);

    function AntMenu() {
        (0, _classCallCheck3["default"])(this, AntMenu);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    AntMenu.prototype.render = function render() {
        return _react2["default"].createElement(
            _reactNative.Text,
            null,
            'One'
        );
    };

    return AntMenu;
}(_react2["default"].Component);

exports["default"] = AntMenu;

AntMenu.defaultProps = {};
module.exports = exports['default'];