'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../icon/index.web');

var _index2 = _interopRequireDefault(_index);

var _splitObject3 = require('../_util/splitObject');

var _splitObject4 = _interopRequireDefault(_splitObject3);

var _touchableFeedback = require('../_util/touchableFeedback');

var _touchableFeedback2 = _interopRequireDefault(_touchableFeedback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
    return typeof str === 'string';
}
// Insert one space between two chinese characters automatically.
function insertSpace(child) {
    if (isString(child.type) && isTwoCNChar(child.props.children)) {
        return _react2["default"].cloneElement(child, {}, child.props.children.split('').join(' '));
    }
    if (isString(child)) {
        if (isTwoCNChar(child)) {
            child = child.split('').join(' ');
        }
        return _react2["default"].createElement(
            'span',
            null,
            child
        );
    }
    return child;
}

var Button = function (_React$Component) {
    (0, _inherits3["default"])(Button, _React$Component);

    function Button() {
        (0, _classCallCheck3["default"])(this, Button);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

        _this.onClick = function () {
            _this.props.onClick(_this);
        };
        return _this;
    }

    Button.prototype.render = function render() {
        var _classNames;

        var _splitObject = (0, _splitObject4["default"])(this.props, ['children', 'className', 'prefixCls', 'type', 'size', 'inline', 'disabled', 'htmlType', 'icon', 'loading', 'touchFeedback']);

        var _splitObject2 = (0, _slicedToArray3["default"])(_splitObject, 2);

        var _splitObject2$ = _splitObject2[0];
        var children = _splitObject2$.children;
        var className = _splitObject2$.className;
        var prefixCls = _splitObject2$.prefixCls;
        var type = _splitObject2$.type;
        var size = _splitObject2$.size;
        var inline = _splitObject2$.inline;
        var disabled = _splitObject2$.disabled;
        var htmlType = _splitObject2$.htmlType;
        var icon = _splitObject2$.icon;
        var loading = _splitObject2$.loading;
        var touchFeedback = _splitObject2$.touchFeedback;
        var restProps = _splitObject2[1];

        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, className, className), (0, _defineProperty3["default"])(_classNames, prefixCls, true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-primary', type === 'primary'), (0, _defineProperty3["default"])(_classNames, prefixCls + '-ghost', type === 'ghost'), (0, _defineProperty3["default"])(_classNames, prefixCls + '-warning', type === 'warning'), (0, _defineProperty3["default"])(_classNames, prefixCls + '-small', size === 'small'), (0, _defineProperty3["default"])(_classNames, prefixCls + '-loading', loading), (0, _defineProperty3["default"])(_classNames, prefixCls + '-inline', inline), (0, _defineProperty3["default"])(_classNames, prefixCls + '-disabled', disabled), (0, _defineProperty3["default"])(_classNames, prefixCls + '-touchFeedback', touchFeedback), _classNames));
        var iconType = loading ? 'loading' : icon;
        var kids = _react2["default"].Children.map(children, insertSpace);
        return _react2["default"].createElement(
            'button',
            (0, _extends3["default"])({}, restProps, { type: htmlType || 'button', className: wrapCls, disabled: disabled, onClick: this.onClick }),
            iconType ? _react2["default"].createElement(_index2["default"], { type: iconType }) : null,
            kids
        );
    };

    return Button;
}(_react2["default"].Component);

Button.defaultProps = {
    prefixCls: 'am-button',
    size: 'large',
    inline: false,
    disabled: false,
    loading: false,
    onClick: function onClick() {}
};
exports["default"] = (0, _touchableFeedback2["default"])(Button);
module.exports = exports['default'];