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

var _reactNativeMenu = require('react-native-menu');

var _reactNativeMenu2 = _interopRequireDefault(_reactNativeMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Popover = function (_React$Component) {
  (0, _inherits3["default"])(Popover, _React$Component);

  function Popover() {
    (0, _classCallCheck3["default"])(this, Popover);
    return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
  }

  Popover.prototype.render = function render() {
    var _props = this.props;
    var children = _props.children;
    var onSelect = _props.onSelect;
    var overlay = _props.overlay;
    var disabled = _props.disabled;
    var contextStyle = _props.contextStyle;
    var name = _props.name;
    var style = _props.style;
    var triggerStyle = _props.triggerStyle;
    var overlayStyle = _props.overlayStyle;
    var renderOverlayComponent = _props.renderOverlayComponent;

    var menuOptionsProp = {
      optionsContainerStyle: overlayStyle,
      renderOptionsContainer: renderOverlayComponent
    };
    return _react2["default"].createElement(
      _reactNativeMenu.MenuContext,
      { ref: 'menuContext', style: contextStyle },
      _react2["default"].createElement(
        _reactNativeMenu2["default"],
        { name: name, onSelect: onSelect, style: style },
        _react2["default"].createElement(
          _reactNativeMenu.MenuTrigger,
          { disabled: disabled, style: triggerStyle },
          children
        ),
        _react2["default"].createElement(
          _reactNativeMenu.MenuOptions,
          menuOptionsProp,
          overlay
        )
      )
    );
  };

  return Popover;
}(_react2["default"].Component);

exports["default"] = Popover;

Popover.defaultProps = {
  onSelect: function onSelect() {}
};
Popover.Item = _reactNativeMenu.MenuOption;
module.exports = exports['default'];