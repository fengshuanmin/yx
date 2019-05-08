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

var Progress = function (_React$Component) {
    (0, _inherits3["default"])(Progress, _React$Component);

    function Progress(props) {
        (0, _classCallCheck3["default"])(this, Progress);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.onLayout = function (e) {
            _this.setState({
                wrapWidth: e.nativeEvent.layout.width
            });
        };
        _this.state = {
            wrapWidth: 0
        };
        return _this;
    }

    Progress.prototype.render = function render() {
        var _this2 = this;

        var wrapWidth = this.state.wrapWidth;
        var _props = this.props;
        var percent = _props.percent;
        var position = _props.position;
        var unfilled = _props.unfilled;

        var widthPercent = void 0;
        if (percent > 0) {
            widthPercent = percent > 100 ? 100 : percent;
        } else {
            widthPercent = 0;
        }
        var positionStyle = position === 'fixed' ? {
            position: 'absolute',
            top: 0
        } : null;
        var percentStyle = {
            width: wrapWidth * (widthPercent / 100),
            height: 0
        };
        var unfilledHideStyle = unfilled === 'hide' ? {
            backgroundColor: 'transparent'
        } : null;
        return _react2["default"].createElement(
            _reactNative.View,
            { onLayout: function onLayout(e) {
                    _this2.onLayout(e);
                }, style: [_index2["default"].progressOuter, positionStyle, unfilledHideStyle] },
            _react2["default"].createElement(_reactNative.View, { style: [_index2["default"].progressBar, percentStyle] })
        );
    };

    return Progress;
}(_react2["default"].Component);

exports["default"] = Progress;

Progress.defaultProps = {
    percent: 0,
    position: 'normal',
    unfilled: 'show'
};
module.exports = exports['default'];