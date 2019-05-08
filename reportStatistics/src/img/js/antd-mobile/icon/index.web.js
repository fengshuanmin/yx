'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = function (props) {
    var type = props.type;
    var _props$className = props.className;
    var className = _props$className === undefined ? '' : _props$className;

    return _react2["default"].createElement('i', (0, _extends3["default"])({}, props, { className: (className + ' anticon anticon-' + type).trim() }));
};

module.exports = exports['default'];