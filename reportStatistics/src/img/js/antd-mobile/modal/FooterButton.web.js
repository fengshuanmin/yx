'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _touchableFeedback = require('../_util/touchableFeedback');

var _touchableFeedback2 = _interopRequireDefault(_touchableFeedback);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FooterButton = function (_React$Component) {
    (0, _inherits3["default"])(FooterButton, _React$Component);

    function FooterButton() {
        (0, _classCallCheck3["default"])(this, FooterButton);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    FooterButton.prototype.render = function render() {
        var _classNames;

        var _props = this.props;
        var button = _props.button;
        var prefixCls = _props.prefixCls;
        var touchFeedback = _props.touchFeedback;

        var restProps = (0, _objectAssign2["default"])({}, this.props);
        ['button', 'prefixCls', 'touchFeedback'].forEach(function (prop) {
            if (restProps.hasOwnProperty(prop)) {
                delete restProps[prop];
            }
        });
        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls + '-button', true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-button-touchFeedback', touchFeedback), _classNames));
        return React.createElement(
            'a',
            (0, _extends3["default"])({ className: wrapCls, href: '#', onClick: function onClick(e) {
                    e.preventDefault();
                    if (button.onPress) {
                        button.onPress();
                    }
                } }, restProps),
            button.text || 'Button'
        );
    };

    return FooterButton;
}(React.Component);

;
exports["default"] = (0, _touchableFeedback2["default"])(FooterButton);
module.exports = exports['default'];