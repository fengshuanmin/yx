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

var Tag = function (_React$Component) {
    (0, _inherits3["default"])(Tag, _React$Component);

    function Tag(props) {
        (0, _classCallCheck3["default"])(this, Tag);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.onClick = function () {
            var _this$props = _this.props;
            var disabled = _this$props.disabled;
            var onChange = _this$props.onChange;

            if (disabled) {
                return;
            }
            var isSelect = _this.state.selected;
            _this.setState({
                selected: !isSelect
            }, function () {
                onChange(!isSelect);
            });
        };
        _this.onTagClose = function () {
            _this.props.onClose();
            _this.setState({
                closed: true
            }, _this.props.afterClose);
        };
        _this.state = {
            selected: props.selected,
            closed: false
        };
        return _this;
    }

    Tag.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (this.props.selected !== nextProps.selected) {
            this.setState({
                selected: nextProps.selected
            });
        }
    };

    Tag.prototype.render = function render() {
        var _classNames;

        var _props = this.props;
        var children = _props.children;
        var className = _props.className;
        var prefixCls = _props.prefixCls;
        var disabled = _props.disabled;
        var closable = _props.closable;
        var small = _props.small;
        var style = _props.style;

        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, className, !!className), (0, _defineProperty3["default"])(_classNames, '' + prefixCls, true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-small', small), (0, _defineProperty3["default"])(_classNames, prefixCls + '-normal', !this.state.selected && !disabled), (0, _defineProperty3["default"])(_classNames, prefixCls + '-active', this.state.selected && !disabled), (0, _defineProperty3["default"])(_classNames, prefixCls + '-disabled', disabled), _classNames));
        return !this.state.closed ? _react2["default"].createElement(
            'div',
            { className: wrapCls, onClick: this.onClick, style: style },
            _react2["default"].createElement(
                'div',
                { className: prefixCls + '-text' },
                children
            ),
            closable && !disabled && !small && _react2["default"].createElement(
                'div',
                { className: prefixCls + '-close', onClick: this.onTagClose },
                _react2["default"].createElement(_icon2["default"], { type: 'cross-circle' })
            )
        ) : null;
    };

    return Tag;
}(_react2["default"].Component);

exports["default"] = Tag;

Tag.defaultProps = {
    prefixCls: 'am-tag',
    disabled: false,
    selected: false,
    closable: false,
    small: false,
    onChange: function onChange() {},
    onClose: function onClose() {},
    afterClose: function afterClose() {}
};
module.exports = exports['default'];