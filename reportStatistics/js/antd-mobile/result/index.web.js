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

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function noop() {}

var Result = function (_React$Component) {
    (0, _inherits3["default"])(Result, _React$Component);

    function Result() {
        (0, _classCallCheck3["default"])(this, Result);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    Result.prototype.render = function render() {
        var _classNames;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var imgUrl = _props.imgUrl;
        var title = _props.title;
        var message = _props.message;
        var buttonText = _props.buttonText;
        var buttonClick = _props.buttonClick;
        var buttonType = _props.buttonType;
        var className = _props.className;

        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, '' + prefixCls, true), (0, _defineProperty3["default"])(_classNames, className, className), _classNames));
        return _react2["default"].createElement(
            'div',
            { className: wrapCls },
            _react2["default"].createElement('div', { className: prefixCls + '-pic', style: { backgroundImage: 'url(' + imgUrl + ')' } }),
            title !== '' ? _react2["default"].createElement(
                'div',
                { className: prefixCls + '-title' },
                title
            ) : null,
            message !== '' ? _react2["default"].createElement(
                'div',
                { className: prefixCls + '-message' },
                message
            ) : null,
            buttonText !== '' ? _react2["default"].createElement(
                'div',
                { className: prefixCls + '-button' },
                _react2["default"].createElement(
                    _button2["default"],
                    { type: buttonType, onClick: buttonClick },
                    buttonText
                )
            ) : null
        );
    };

    return Result;
}(_react2["default"].Component);

exports["default"] = Result;

Result.defaultProps = {
    prefixCls: 'am-result',
    imgUrl: '',
    title: '',
    message: '',
    buttonText: '',
    buttonType: '',
    buttonClick: noop
};
module.exports = exports['default'];