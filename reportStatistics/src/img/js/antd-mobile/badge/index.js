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

var _index = require('./style/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Badge = function (_React$Component) {
  (0, _inherits3["default"])(Badge, _React$Component);

  function Badge() {
    (0, _classCallCheck3["default"])(this, Badge);
    return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
  }

  Badge.prototype.render = function render() {
    var _props = this.props;
    var size = _props.size;
    var overflowCount = _props.overflowCount;
    var corner = _props.corner;
    var dot = _props.dot;
    var text = _props.text;
    var children = _props.children;
    var style = _props.style;

    var overflowNum = overflowCount || 99;
    var badgeText = typeof text === 'number' && text > overflowNum ? overflowNum + '+' : text;
    var badgeCls = corner ? 'textCorner' : 'textDom';
    return _react2["default"].createElement(
      _reactNative.View,
      { style: [_index2["default"].wrap, style] },
      _react2["default"].createElement(
        _reactNative.View,
        { style: [_index2["default"][badgeCls + 'Wrap']] },
        children,
        !dot ? _react2["default"].createElement(
          _reactNative.TouchableWithoutFeedback,
          null,
          _react2["default"].createElement(
            _reactNative.View,
            { style: [_index2["default"][badgeCls], _index2["default"]['' + badgeCls + size]] },
            _react2["default"].createElement(
              _reactNative.Text,
              { style: [_index2["default"].text] },
              badgeText
            )
          )
        ) : _react2["default"].createElement(
          _reactNative.TouchableWithoutFeedback,
          null,
          _react2["default"].createElement(_reactNative.View, { style: [_index2["default"].dot, _index2["default"]['dotSize' + size]] })
        )
      )
    );
  };

  return Badge;
}(_react2["default"].Component);

exports["default"] = Badge;

Badge.defaultProps = {
  size: 'small',
  overflowCount: 99,
  corner: false,
  dot: false
};
module.exports = exports['default'];