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

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NoticeBar = function (_React$Component) {
    (0, _inherits3["default"])(NoticeBar, _React$Component);

    function NoticeBar(props) {
        (0, _classCallCheck3["default"])(this, NoticeBar);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.state = {
            show: true
        };
        return _this;
    }

    NoticeBar.prototype.onClick = function onClick() {
        var _props = this.props;
        var mode = _props.mode;
        var onClick = _props.onClick;

        onClick();
        if (mode === 'closable') {
            this.setState({
                show: false
            });
        }
    };

    NoticeBar.prototype.render = function render() {
        var _classNames,
            _this2 = this;

        var _props2 = this.props;
        var prefixCls = _props2.prefixCls;
        var children = _props2.children;
        var mode = _props2.mode;
        var type = _props2.type;
        var onClick = _props2.onClick;
        var className = _props2.className;

        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls, true), (0, _defineProperty3["default"])(_classNames, className, !!className), _classNames));
        var operationDom = void 0;
        switch (mode) {
            case 'closable':
                operationDom = _react2["default"].createElement(
                    'div',
                    { className: prefixCls + '-operation', onClick: function onClick() {
                            return _this2.onClick();
                        } },
                    _react2["default"].createElement(_icon2["default"], { type: 'cross' })
                );
                break;
            case 'link':
                operationDom = _react2["default"].createElement(
                    'div',
                    { className: prefixCls + '-operation', onClick: onClick },
                    _react2["default"].createElement(_icon2["default"], { type: 'right' })
                );
                break;
            default:
                operationDom = null;
                break;
        }
        var iconType = '';
        switch (type) {
            case 'success':
                iconType = 'check-circle';
                break;
            case 'error':
                iconType = 'cross-circle';
                break;
            case 'warn':
                iconType = 'exclamation-circle';
                break;
            case 'question':
                iconType = 'question-circle';
                break;
            case 'info':
            default:
                iconType = 'info-circle';
                break;
        }
        var iconDom = type ? _react2["default"].createElement(
            'div',
            { className: prefixCls + '-icon' },
            _react2["default"].createElement(_icon2["default"], { type: iconType })
        ) : null;
        return this.state.show ? _react2["default"].createElement(
            'div',
            { className: wrapCls },
            iconDom,
            _react2["default"].createElement(
                'div',
                { className: prefixCls + '-content' },
                children
            ),
            operationDom
        ) : null;
    };

    return NoticeBar;
}(_react2["default"].Component);

exports["default"] = NoticeBar;

NoticeBar.defaultProps = {
    prefixCls: 'am-notice-bar',
    mode: '',
    onClick: function onClick() {}
};
module.exports = exports['default'];