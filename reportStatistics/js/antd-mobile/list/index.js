'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _index = require('./style/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var THEMES = _index2["default"].ThemesList;

var List = function (_React$Component) {
    (0, _inherits3["default"])(List, _React$Component);

    function List() {
        (0, _classCallCheck3["default"])(this, List);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    List.prototype.render = function render() {
        var _props = this.props;
        var children = _props.children;
        var style = _props.style;
        var renderHeader = _props.renderHeader;
        var renderFooter = _props.renderFooter;

        var headerDom = null;
        var footerDom = null;
        if (renderHeader) {
            var content = renderHeader();
            if (typeof content === 'string') {
                content = _react2["default"].createElement(
                    _reactNative.Text,
                    { style: THEMES.Header },
                    content
                );
            }
            headerDom = _react2["default"].createElement(
                _reactNative.View,
                null,
                content
            );
        }
        if (renderFooter) {
            var _content = renderFooter();
            if (typeof _content === 'string') {
                _content = _react2["default"].createElement(
                    _reactNative.Text,
                    { style: THEMES.Footer },
                    _content
                );
            }
            footerDom = _react2["default"].createElement(
                _reactNative.View,
                null,
                _content
            );
        }
        // TODO remove last
        // user needs to specify last for listitem
        return _react2["default"].createElement(
            _reactNative.View,
            (0, _extends3["default"])({}, this.props, { style: [style] }),
            headerDom,
            _react2["default"].createElement(
                _reactNative.View,
                { style: THEMES.Body },
                children
            ),
            footerDom
        );
    };

    return List;
}(_react2["default"].Component);

exports["default"] = List;

List.Item = _ListItem2["default"];
module.exports = exports['default'];