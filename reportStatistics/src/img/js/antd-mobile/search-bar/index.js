'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _SearchBarPropTypes = require('./SearchBarPropTypes');

var _index = require('./style/index');

var _index2 = _interopRequireDefault(_index);

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
        _this.onChangeText = function (value) {
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            _this.props.onChange(value);
        };
        _this.onCancel = function () {
            if (_this.props.onCancel) {
                _this.props.onCancel(_this.state.value);
            }
        };
        var value = void 0;
        if ('value' in props) {
            value = props.value;
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        } else {
            value = '';
        }
        _this.state = { value: value };
        return _this;
    }

    SearchBar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            });
        }
    };

    SearchBar.prototype.render = function render() {
        var _props = this.props;
        var showCancelButton = _props.showCancelButton;
        var placeholder = _props.placeholder;
        var cancelText = _props.cancelText;
        var onFocus = _props.onFocus;
        var onBlur = _props.onBlur;
        var value = this.state.value;

        return _react2["default"].createElement(
            _reactNative.View,
            { style: _index2["default"].wrapper },
            _react2["default"].createElement(_reactNative.TextInput, { autoCorrect: false, value: value, placeholder: placeholder, onChangeText: this.onChangeText, onFocus: onFocus, onBlur: onBlur, style: _index2["default"].input, ref: 'searchInput', onSubmitEditing: this.onSubmit, clearButtonMode: 'always' }),
            _react2["default"].createElement(_reactNative.Image, { source: require('../style/images/search.png'), style: _index2["default"].search, resizeMode: 'stretch' }),
            showCancelButton ? _react2["default"].createElement(
                _reactNative.View,
                { style: _index2["default"].cancelTextContainer },
                _react2["default"].createElement(
                    _reactNative.Text,
                    { style: _index2["default"].cancelText, onPress: this.onCancel },
                    cancelText
                )
            ) : null
        );
    };

    return SearchBar;
}(_react2["default"].Component);

exports["default"] = SearchBar;

SearchBar.defaultProps = _SearchBarPropTypes.defaultProps;
module.exports = exports['default'];