'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rmcListView = require('rmc-list-view');

var _rmcListView2 = _interopRequireDefault(_rmcListView);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_rmcListView2["default"].RefreshControl.defaultProps = (0, _objectAssign2["default"])({}, _rmcListView2["default"].RefreshControl.defaultProps, {
  prefixCls: 'am-refresh-control',
  icon: _react2["default"].createElement(
    'div',
    { style: { lineHeight: '50px' } },
    _react2["default"].createElement(
      'div',
      { className: 'am-refresh-control-pull' },
      _react2["default"].createElement(_icon2["default"], { type: 'arrow-down' }),
      ' \u4E0B\u62C9'
    ),
    _react2["default"].createElement(
      'div',
      { className: 'am-refresh-control-release' },
      _react2["default"].createElement(_icon2["default"], { type: 'arrow-up' }),
      ' \u91CA\u653E'
    )
  ),
  loading: _react2["default"].createElement(
    'div',
    { style: { lineHeight: '50px' } },
    _react2["default"].createElement(_icon2["default"], { type: 'loading' })
  ),
  refreshing: false
});
exports["default"] = _rmcListView2["default"].RefreshControl;
module.exports = exports['default'];