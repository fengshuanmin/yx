'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcDrawer = require('rc-drawer');

var _rcDrawer2 = _interopRequireDefault(_rcDrawer);

var _splitObject3 = require('../_util/splitObject');

var _splitObject4 = _interopRequireDefault(_splitObject3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Drawer = function (_React$Component) {
    (0, _inherits3["default"])(Drawer, _React$Component);

    function Drawer() {
        (0, _classCallCheck3["default"])(this, Drawer);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    Drawer.prototype.render = function render() {
        var _splitObject = (0, _splitObject4["default"])(this.props, ['prefixCls', 'children']);

        var _splitObject2 = (0, _slicedToArray3["default"])(_splitObject, 2);

        var _splitObject2$ = _splitObject2[0];
        var prefixCls = _splitObject2$.prefixCls;
        var children = _splitObject2$.children;
        var restProps = _splitObject2[1];

        return _react2["default"].createElement(
            _rcDrawer2["default"],
            (0, _extends3["default"])({ prefixCls: prefixCls }, restProps),
            children
        );
    };

    return Drawer;
}(_react2["default"].Component);

exports["default"] = Drawer;

Drawer.defaultProps = {
    prefixCls: 'am-drawer',
    enableDragHandle: false
};
module.exports = exports['default'];