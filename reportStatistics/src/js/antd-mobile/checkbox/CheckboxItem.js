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

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _index = require('../list/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./style/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ListItem = _index2["default"].Item;
var refCheckbox = 'checkbox';

var CheckboxItem = function (_React$Component) {
    (0, _inherits3["default"])(CheckboxItem, _React$Component);

    function CheckboxItem() {
        (0, _classCallCheck3["default"])(this, CheckboxItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

        _this.handleClick = function () {
            var checkBox = _this.refs[refCheckbox];
            checkBox.handleClick();
            if (_this.props.onClick) {
                _this.props.onClick();
            }
        };
        return _this;
    }

    CheckboxItem.prototype.render = function render() {
        var _props = this.props;
        var style = _props.style;
        var checkboxStyle = _props.checkboxStyle;
        var defaultChecked = _props.defaultChecked;
        var checked = _props.checked;
        var disabled = _props.disabled;
        var children = _props.children;
        var extra = _props.extra;
        var line = _props.line;
        var onChange = _props.onChange;

        return _react2["default"].createElement(
            ListItem,
            { style: style, onClick: disabled ? null : this.handleClick, line: line, extra: extra, thumb: _react2["default"].createElement(_Checkbox2["default"], { ref: refCheckbox, style: [_index4["default"].checkboxItemCheckbox, checkboxStyle], defaultChecked: defaultChecked, checked: checked, onChange: onChange, disabled: disabled }) },
            children
        );
    };

    return CheckboxItem;
}(_react2["default"].Component);

exports["default"] = CheckboxItem;
module.exports = exports['default'];