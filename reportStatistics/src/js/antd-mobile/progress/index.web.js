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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Progress = function (_React$Component) {
    (0, _inherits3["default"])(Progress, _React$Component);

    function Progress(props) {
        (0, _classCallCheck3["default"])(this, Progress);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.state = {};
        return _this;
    }

    Progress.prototype.render = function render() {
        var _classNames;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var percent = _props.percent;
        var position = _props.position;
        var unfilled = _props.unfilled;

        var percentStyle = {
            width: percent + '%',
            height: 0
        };
        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls + '-outer', true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-fixed-outer', position === 'fixed'), (0, _defineProperty3["default"])(_classNames, prefixCls + '-hide-outer', unfilled === 'hide'), _classNames));
        return _react2["default"].createElement(
            'div',
            { className: wrapCls },
            _react2["default"].createElement('div', { className: prefixCls + '-bar', style: percentStyle })
        );
    };

    return Progress;
}(_react2["default"].Component);

exports["default"] = Progress;

Progress.defaultProps = {
    prefixCls: 'am-progress',
    percent: 0,
    position: 'fixed',
    unfilled: 'show'
};
module.exports = exports['default'];