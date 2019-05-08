'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _badge = require('../badge/');

var _badge2 = _interopRequireDefault(_badge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Tab = function (_React$Component) {
    (0, _inherits3["default"])(Tab, _React$Component);

    function Tab() {
        (0, _classCallCheck3["default"])(this, Tab);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    Tab.prototype.render = function render() {
        var _props = this.props;
        var title = _props.title;
        var icon = _props.icon;
        var selectedIcon = _props.selectedIcon;
        var prefixCls = _props.prefixCls;
        var badge = _props.badge;
        var selected = _props.selected;
        var unselectedTintColor = _props.unselectedTintColor;
        var tintColor = _props.tintColor;

        var iconRes = selected ? selectedIcon : icon;
        return _react2["default"].createElement(
            'div',
            null,
            _react2["default"].createElement(
                'div',
                { className: prefixCls + '-icon' },
                badge ? _react2["default"].createElement(
                    _badge2["default"],
                    { text: badge, className: prefixCls + '-badge' },
                    _react2["default"].createElement('img', { className: prefixCls + '-image', src: selected ? selectedIcon.uri : icon.uri, alt: title })
                ) : _react2["default"].createElement('img', { className: prefixCls + '-image', src: iconRes.uri || iconRes, alt: title })
            ),
            _react2["default"].createElement(
                'p',
                { className: prefixCls + '-title', style: {
                        color: selected ? tintColor : unselectedTintColor
                    } },
                title
            )
        );
    };

    return Tab;
}(_react2["default"].Component);

exports["default"] = Tab;
module.exports = exports['default'];