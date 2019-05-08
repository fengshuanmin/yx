'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _splitObject3 = require('../_util/splitObject');

var _splitObject4 = _interopRequireDefault(_splitObject3);

var _touchableFeedback = require('../_util/touchableFeedback');

var _touchableFeedback2 = _interopRequireDefault(_touchableFeedback);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ButtonListItem = function (_React$Component) {
    (0, _inherits3["default"])(ButtonListItem, _React$Component);

    function ButtonListItem() {
        (0, _classCallCheck3["default"])(this, ButtonListItem);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    ButtonListItem.prototype.render = function render() {
        var _splitObject = (0, _splitObject4["default"])(this.props, ['children', 'className', 'prefixCls', 'onClick', 'touchFeedback']);

        var _splitObject2 = (0, _slicedToArray3["default"])(_splitObject, 2);

        var _splitObject2$ = _splitObject2[0];
        var children = _splitObject2$.children;
        var className = _splitObject2$.className;
        var prefixCls = _splitObject2$.prefixCls;
        var onClick = _splitObject2$.onClick;
        var touchFeedback = _splitObject2$.touchFeedback;
        var restProps = _splitObject2[1];

        return React.createElement(
            'div',
            (0, _extends3["default"])({}, restProps, { className: touchFeedback ? className + ' ' + prefixCls + '-touchFeedback' : '' + className, onClick: onClick }),
            children
        );
    };

    return ButtonListItem;
}(React.Component);

;
exports["default"] = (0, _touchableFeedback2["default"])(ButtonListItem);
module.exports = exports['default'];