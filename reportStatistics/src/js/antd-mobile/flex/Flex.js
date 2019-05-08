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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Flex = function (_React$Component) {
    (0, _inherits3["default"])(Flex, _React$Component);

    function Flex() {
        (0, _classCallCheck3["default"])(this, Flex);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    Flex.prototype.render = function render() {
        var _props = this.props;
        var style = _props.style;
        var direction = _props.direction;
        var wrap = _props.wrap;
        var justify = _props.justify;
        var align = _props.align;
        var children = _props.children;
        var onPress = _props.onPress;

        var transferConst = [justify, align];
        transferConst = transferConst.map(function (el) {
            var tempTxt = el;
            switch (el) {
                case 'start':
                    tempTxt = 'flex-start';
                    break;
                case 'end':
                    tempTxt = 'flex-end';
                    break;
                case 'between':
                    tempTxt = 'space-between';
                    break;
                case 'around':
                    tempTxt = 'space-around';
                    break;
                default:
                    break;
            }
            return tempTxt;
        });
        var flexStyle = {
            flexDirection: direction,
            flexWrap: wrap,
            justifyContent: transferConst[0],
            alignItems: transferConst[1]
        };
        return _react2["default"].createElement(
            _reactNative.TouchableWithoutFeedback,
            { onPress: onPress },
            _react2["default"].createElement(
                _reactNative.View,
                { style: [flexStyle, style] },
                children
            )
        );
    };

    return Flex;
}(_react2["default"].Component);

exports["default"] = Flex;

Flex.defaultProps = {
    direction: 'row',
    wrap: 'nowrap',
    justify: 'start',
    align: 'center',
    onPress: function onPress() {}
};
module.exports = exports['default'];