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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function noop() {}
function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

var TextareaItem = function (_React$Component) {
    (0, _inherits3["default"])(TextareaItem, _React$Component);

    function TextareaItem(props) {
        (0, _classCallCheck3["default"])(this, TextareaItem);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.onChange = function (e) {
            var value = e.target.value;
            var onChange = _this.props.onChange;

            onChange(value);
        };
        _this.onBlur = function (e) {
            _this.debounceTimeout = setTimeout(function () {
                _this.setState({
                    focus: false
                });
            }, 500);
            var value = e.target.value;
            _this.props.onBlur(value);
        };
        _this.onFocus = function (e) {
            _this.setState({
                focus: true
            });
            var value = e.target.value;
            _this.props.onFocus(value);
        };
        _this.onErrorClick = function () {
            _this.props.onErrorClick();
        };
        _this.clearInput = function () {
            _this.props.onChange('');
        };
        _this.state = {
            focus: false
        };
        return _this;
    }

    TextareaItem.prototype.componentDidMount = function componentDidMount() {
        if (this.props.autoHeight) {
            this.initialTextHeight = this.refs.textarea.offsetHeight;
            this.componentDidUpdate();
        }
    };

    TextareaItem.prototype.componentDidUpdate = function componentDidUpdate() {
        if (this.props.autoHeight) {
            var textareaDom = this.refs.textarea;
            textareaDom.style.height = '';
            textareaDom.style.height = Math.max(this.initialTextHeight, textareaDom.scrollHeight) + 'px';
        }
    };

    TextareaItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
        return nextProps.value !== this.props.value || nextProps.defaultValue !== this.props.defaultValue || nextProps.error !== this.props.error || nextProps.disabled !== this.props.disabled || nextProps.editable !== this.props.editable || nextState.focus !== this.state.focus;
    };

    TextareaItem.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
    };

    TextareaItem.prototype.render = function render() {
        var _classNames, _classNames2;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var prefixListCls = _props.prefixListCls;
        var style = _props.style;
        var title = _props.title;
        var name = _props.name;
        var value = _props.value;
        var defaultValue = _props.defaultValue;
        var placeholder = _props.placeholder;
        var clear = _props.clear;
        var rows = _props.rows;
        var count = _props.count;
        var editable = _props.editable;
        var disabled = _props.disabled;
        var error = _props.error;
        var className = _props.className;
        var labelNumber = _props.labelNumber;
        var autoHeight = _props.autoHeight;

        var valueProps = void 0;
        if (value !== undefined) {
            valueProps = {
                value: fixControlledValue(value)
            };
        } else {
            valueProps = {
                defaultValue: defaultValue
            };
        }
        var focus = this.state.focus;

        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixListCls + '-item', true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-item', true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-disabled', disabled), (0, _defineProperty3["default"])(_classNames, prefixCls + '-item-single-line', rows === 1 && !autoHeight), (0, _defineProperty3["default"])(_classNames, prefixCls + '-error', error), (0, _defineProperty3["default"])(_classNames, prefixCls + '-focus', focus), (0, _defineProperty3["default"])(_classNames, className, className), _classNames));
        var labelCls = (0, _classnames2["default"])((_classNames2 = {}, (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label', true), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label-2', labelNumber === 2), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label-3', labelNumber === 3), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label-4', labelNumber === 4), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label-5', labelNumber === 5), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label-6', labelNumber === 6), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-label-7', labelNumber === 7), _classNames2));
        return _react2["default"].createElement(
            'div',
            { className: wrapCls, style: style },
            title ? _react2["default"].createElement(
                'div',
                { className: labelCls },
                title
            ) : null,
            _react2["default"].createElement(
                'div',
                { className: prefixCls + '-control' },
                _react2["default"].createElement('textarea', (0, _extends3["default"])({}, valueProps, { ref: 'textarea', name: name, rows: rows, placeholder: placeholder, maxLength: count, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, readOnly: !editable, disabled: disabled }))
            ),
            clear && editable && value && value.length > 0 ? _react2["default"].createElement('div', { className: prefixCls + '-clear', onClick: this.clearInput, onTouchStart: this.clearInput }) : null,
            error ? _react2["default"].createElement('div', { className: prefixCls + '-error-extra', onClick: this.onErrorClick }) : null,
            count > 0 && rows > 1 ? _react2["default"].createElement(
                'span',
                { className: prefixCls + '-count' },
                _react2["default"].createElement(
                    'span',
                    null,
                    value.length
                ),
                '/',
                count
            ) : null
        );
    };

    return TextareaItem;
}(_react2["default"].Component);

exports["default"] = TextareaItem;

TextareaItem.defaultProps = {
    prefixCls: 'am-textarea',
    prefixListCls: 'am-list',
    title: '',
    autoHeight: false,
    editable: true,
    disabled: false,
    name: '',
    defaultValue: '',
    placeholder: '',
    clear: false,
    rows: 1,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    onErrorClick: noop,
    error: false,
    labelNumber: 4
};
module.exports = exports['default'];