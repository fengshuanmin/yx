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

var _SearchBarPropTypes = require('./SearchBarPropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SearchBar = function (_React$Component) {
    (0, _inherits3["default"])(SearchBar, _React$Component);

    function SearchBar(props) {
        (0, _classCallCheck3["default"])(this, SearchBar);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.onSubmit = function (e) {
            e.preventDefault();
            _this.props.onSubmit(_this.state.value);
        };
        _this.onChange = function (e) {
            var value = e.target.value;
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            _this.props.onChange(value);
        };
        _this.onFocus = function (e) {
            _this.setState({
                focus: true
            });
            _this.props.onFocus(e);
        };
        _this.onBlur = function (e) {
            _this.setState({
                focus: false
            });
            _this.props.onBlur(e);
        };
        _this.onClear = function () {
            if (!('value' in _this.props)) {
                _this.setState({ value: '' });
            }
            _this.refs.searchInput.focus();
            _this.props.onClear('');
            _this.props.onChange('');
        };
        _this.onCancel = function () {
            if (_this.props.onCancel) {
                _this.props.onCancel(_this.state.value);
            } else {
                _this.onClear();
            }
            _this.refs.searchInput.blur();
        };
        var value = void 0;
        if ('value' in props) {
            value = props.value || '';
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        } else {
            value = '';
        }
        _this.state = {
            value: value,
            focus: false
        };
        return _this;
    }

    SearchBar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            });
        }
    };

    SearchBar.prototype.componentDidMount = function componentDidMount() {
        if (/U3/i.test(navigator.userAgent)) {
            this.initialInputContainerWidth = this.refs.searchInputContainer.offsetWidth;
            if (this.props.showCancelButton) {
                this.refs.searchInputContainer.style.width = this.refs.searchInputContainer.offsetWidth - 41 * (window.devicePixelRatio || 1) + 'px';
            }
        }
    };

    SearchBar.prototype.render = function render() {
        var _classNames, _classNames2, _classNames3;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var showCancelButton = _props.showCancelButton;
        var disabled = _props.disabled;
        var placeholder = _props.placeholder;
        var cancelText = _props.cancelText;
        var className = _props.className;
        var _state = this.state;
        var value = _state.value;
        var focus = _state.focus;

        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, '' + prefixCls, true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-start', showCancelButton || focus), (0, _defineProperty3["default"])(_classNames, className, className), _classNames));
        var containerStyle = {};
        if (/U3/i.test(navigator.userAgent)) {
            if (this.initialInputContainerWidth) {
                if (showCancelButton || focus) {
                    containerStyle = {
                        width: this.initialInputContainerWidth - 41 * (window.devicePixelRatio || 1) + 'px'
                    };
                } else {
                    containerStyle = {
                        width: this.initialInputContainerWidth + 'px'
                    };
                }
            }
        }
        var clearCls = (0, _classnames2["default"])((_classNames2 = {}, (0, _defineProperty3["default"])(_classNames2, prefixCls + '-clear', true), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-clear-show', focus && value && value.length > 0), _classNames2));
        var cancelCls = (0, _classnames2["default"])((_classNames3 = {}, (0, _defineProperty3["default"])(_classNames3, prefixCls + '-cancel', true), (0, _defineProperty3["default"])(_classNames3, prefixCls + '-all-cancel', showCancelButton), _classNames3));
        return _react2["default"].createElement(
            'form',
            { onSubmit: this.onSubmit, className: wrapCls },
            _react2["default"].createElement(
                'div',
                { ref: 'searchInputContainer', className: prefixCls + '-input', style: containerStyle },
                _react2["default"].createElement('input', { type: 'search', className: prefixCls + '-value', value: value, disabled: disabled, placeholder: placeholder, onChange: this.onChange, onFocus: this.onFocus, onBlur: this.onBlur, ref: 'searchInput' }),
                _react2["default"].createElement('a', { onClick: this.onClear, className: clearCls })
            ),
            _react2["default"].createElement(
                'div',
                { className: cancelCls, onClick: this.onCancel },
                cancelText
            )
        );
    };

    return SearchBar;
}(_react2["default"].Component);

exports["default"] = SearchBar;

SearchBar.defaultProps = _SearchBarPropTypes.defaultProps;
module.exports = exports['default'];