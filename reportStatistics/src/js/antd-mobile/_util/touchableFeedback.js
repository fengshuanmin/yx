'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports["default"] = touchableFeedBack;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var touchSupported = typeof window !== 'undefined' && 'ontouchstart' in window;
function touchableFeedBack(ComposedComponent) {
    var ComposedComponentName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var TouchableFeedbackComponent = _react2["default"].createClass({
        displayName: 'TouchableFeedbackComponent',

        statics: {
            myName: ComposedComponentName || 'TouchableFeedbackComponent'
        },
        getInitialState: function getInitialState() {
            return {
                touchFeedback: false
            };
        },
        setTouchFeedbackState: function setTouchFeedbackState(touchFeedback) {
            this.setState({
                touchFeedback: touchFeedback
            });
        },
        onTouchStart: function onTouchStart(e) {
            if (this.props.onTouchStart) {
                this.props.onTouchStart(e);
            }
            this.setTouchFeedbackState(true);
        },
        onTouchEnd: function onTouchEnd(e) {
            if (this.props.onTouchEnd) {
                this.props.onTouchEnd(e);
            }
            this.setTouchFeedbackState(false);
        },
        onTouchCancel: function onTouchCancel(e) {
            if (this.props.onTouchCancel) {
                this.props.onTouchCancel(e);
            }
            this.setTouchFeedbackState(false);
        },
        onMouseDown: function onMouseDown(e) {
            if (this.props.onTouchStart) {
                this.props.onTouchStart(e);
            }
            this.setTouchFeedbackState(true);
        },
        onMouseUp: function onMouseUp(e) {
            if (this.props.onTouchEnd) {
                this.props.onTouchEnd(e);
            }
            this.setTouchFeedbackState(false);
        },
        render: function render() {
            var events = touchSupported ? {
                onTouchStart: this.onTouchStart,
                onTouchEnd: this.onTouchEnd,
                onTouchCancel: this.onTouchCancel
            } : {
                onMouseDown: this.onMouseDown,
                onMouseUp: this.onMouseUp
            };
            return _react2["default"].createElement(ComposedComponent, (0, _extends3["default"])({}, this.props, { touchFeedback: this.state.touchFeedback }, events));
        }
    });
    return TouchableFeedbackComponent;
}
module.exports = exports['default'];