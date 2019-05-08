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

var SegmentItem = function (_React$Component) {
    (0, _inherits3["default"])(SegmentItem, _React$Component);

    function SegmentItem() {
        (0, _classCallCheck3["default"])(this, SegmentItem);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    SegmentItem.prototype.render = function render() {
        var _classNames;

        var _props = this.props;
        var label = _props.label;
        var prefixCls = _props.prefixCls;
        var selected = _props.selected;
        var tintColor = _props.tintColor;
        var enabled = _props.enabled;
        var touchFeedback = _props.touchFeedback;

        var itemCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls + '-item', true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-item-selected', selected), _classNames));
        var restProps = (0, _objectAssign2["default"])({}, this.props);
        ['prefixCls', 'label', 'selected', 'tintColor', 'enabled', 'touchFeedback'].forEach(function (prop) {
            if (restProps.hasOwnProperty(prop)) {
                delete restProps[prop];
            }
        });
        return React.createElement(
            'div',
            (0, _extends3["default"])({ className: itemCls, style: {
                    color: selected ? '#fff' : tintColor,
                    backgroundColor: selected ? tintColor : '#fff',
                    borderColor: tintColor
                } }, restProps),
            React.createElement('div', { className: prefixCls + '-item-feedback', style: {
                    backgroundColor: enabled && touchFeedback && !selected ? tintColor : 'transparent'
                } }),
            label
        );
    };

    return SegmentItem;
}(React.Component);

SegmentItem.defaultProps = {
    onClick: function onClick() {},

    selected: false
};
;
exports["default"] = (0, _touchableFeedback2["default"])(SegmentItem);
module.exports = exports['default'];