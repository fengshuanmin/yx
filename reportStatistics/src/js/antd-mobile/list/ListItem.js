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

var _default = require('../style/themes/default');

var _default2 = _interopRequireDefault(_default);

var _index = require('./style/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var styles = _reactNative.StyleSheet.create({
    column: {
        flex: 1,
        flexDirection: 'column'
    },
    textAlignRight: {
        textAlign: 'right'
    }
});
var THEMES = _index2["default"].ThemesList;

var Brief = function (_React$Component) {
    (0, _inherits3["default"])(Brief, _React$Component);

    function Brief() {
        (0, _classCallCheck3["default"])(this, Brief);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    Brief.prototype.render = function render() {
        var _props = this.props;
        var children = _props.children;
        var style = _props.style;

        return _react2["default"].createElement(
            _reactNative.View,
            { style: {
                    marginTop: _default2["default"].v_spacing_sm,
                    height: _default2["default"].font_size_subhead
                } },
            _react2["default"].createElement(
                _reactNative.Text,
                { style: [THEMES.Brief, style], numberOfLines: 1 },
                children
            )
        );
    };

    return Brief;
}(_react2["default"].Component);

var Item = function (_React$Component2) {
    (0, _inherits3["default"])(Item, _React$Component2);

    function Item() {
        (0, _classCallCheck3["default"])(this, Item);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component2.apply(this, arguments));
    }

    Item.prototype.render = function render() {
        var _this3 = this;

        var line = 1;
        var thumbDom = null;
        var contentDom = null;
        var extraDom = null;
        var arrowDom = null;
        var thumb = this.props.thumb;
        if (thumb) {
            if (typeof thumb === 'string') {
                thumbDom = _react2["default"].createElement(_reactNative.Image, { source: { uri: thumb }, style: [THEMES.Thumb, this.props.multipleLine ? THEMES.multipleLine.Thumb : null] });
            } else {
                thumbDom = thumb;
            }
        }
        if (Array.isArray(this.props.children)) {
            (function () {
                var tempContentDom = [];
                _this3.props.children.forEach(function (el, index) {
                    if (_react2["default"].isValidElement(el)) {
                        tempContentDom.push(el);
                    } else {
                        tempContentDom.push(_react2["default"].createElement(
                            _reactNative.Text,
                            { style: THEMES.Content, numberOfLines: 1, key: index + '-children' },
                            el
                        ));
                    }
                });
                line = _this3.props.children.length;
                contentDom = _react2["default"].createElement(
                    _reactNative.View,
                    { style: styles.column },
                    tempContentDom
                );
            })();
        } else {
            if (_react2["default"].isValidElement(this.props.children)) {
                contentDom = _react2["default"].createElement(
                    _reactNative.View,
                    { style: styles.column },
                    this.props.children
                );
            } else {
                contentDom = _react2["default"].createElement(
                    _reactNative.View,
                    { style: styles.column },
                    _react2["default"].createElement(
                        _reactNative.Text,
                        { style: THEMES.Content, numberOfLines: 1 },
                        this.props.children
                    )
                );
            }
        }
        if (this.props.extra) {
            if (_react2["default"].isValidElement(this.props.extra)) {
                var extraChildren = this.props.extra.props.children;
                if (Array.isArray(extraChildren)) {
                    (function () {
                        var tempExtraDom = [];
                        extraChildren.forEach(function (el, index) {
                            if (typeof el === 'string') {
                                tempExtraDom.push(_react2["default"].createElement(
                                    _reactNative.Text,
                                    { numberOfLines: 1, style: [THEMES.Extra, styles.textAlignRight], key: index + '-children' },
                                    el
                                ));
                            } else {
                                tempExtraDom.push(el);
                            }
                        });
                        line = extraChildren.length > line ? extraChildren.length : line;
                        extraDom = _react2["default"].createElement(
                            _reactNative.View,
                            { style: styles.column },
                            tempExtraDom
                        );
                    })();
                } else {
                    extraDom = this.props.extra;
                }
            } else {
                extraDom = _react2["default"].createElement(
                    _reactNative.View,
                    { style: styles.column },
                    _react2["default"].createElement(
                        _reactNative.Text,
                        { style: [THEMES.Extra, styles.textAlignRight], numberOfLines: 1 },
                        this.props.extra
                    )
                );
            }
        }
        if (this.props.arrow) {
            switch (this.props.arrow) {
                case 'horizontal':
                    arrowDom = _react2["default"].createElement(_reactNative.Image, { source: require('../style/images/arrow.png'), style: THEMES.Arrow });
                    break;
                case 'down':
                    arrowDom = _react2["default"].createElement(_reactNative.Image, { source: require('../style/images/arrow-up.png'), style: THEMES.ArrowV });
                    break;
                case 'up':
                    arrowDom = _react2["default"].createElement(_reactNative.Image, { source: require('../style/images/arrow-down.png'), style: THEMES.ArrowV });
                    break;
                default:
                    arrowDom = _react2["default"].createElement(_reactNative.View, { style: THEMES.Arrow });
                    break;
            }
        }
        var itemHeight = void 0;
        if (line === 2) {
            if (_reactNative.Platform.OS === 'android') {
                itemHeight = 60 + 2 * _default2["default"].v_spacing_sm;
            } else {
                itemHeight = 60 + _default2["default"].v_spacing_sm;
            }
        } else if (line > 2) {
            if (_reactNative.Platform.OS === 'android') {
                itemHeight = _default2["default"].list_item_height + (_default2["default"].font_size_subhead + _default2["default"].v_spacing_sm) * (line - 1) + 2 * _default2["default"].v_spacing_sm - 3;
            } else {
                itemHeight = _default2["default"].list_item_height + (_default2["default"].font_size_subhead + _default2["default"].v_spacing_sm) * (line - 1) + _default2["default"].v_spacing_sm - 3;
            }
        }
        var ItemStyle = [THEMES.Item, this.props.last ? THEMES.Last.Item : {}, line > 1 ? { height: itemHeight } : {}, this.props.style];
        var LineStyle = [THEMES.Line, this.props.multipleLine ? THEMES.multipleLine.Line : {}, this.props.last ? THEMES.Last.Line : {}];
        var itemView = _react2["default"].createElement(
            _reactNative.View,
            (0, _extends3["default"])({}, this.props, { style: ItemStyle }),
            thumbDom,
            _react2["default"].createElement(
                _reactNative.View,
                { style: LineStyle },
                contentDom,
                extraDom,
                arrowDom
            )
        );
        if (this.props.onClick) {
            return _react2["default"].createElement(
                _reactNative.TouchableHighlight,
                { activeOpacity: 1, underlayColor: THEMES.underlayColor, onPress: this.props.onClick, onPressIn: function onPressIn() {}, onPressOut: function onPressOut() {} },
                itemView
            );
        }
        return itemView;
    };

    return Item;
}(_react2["default"].Component);

exports["default"] = Item;

Item.defaultProps = {
    // TODO remove last
    last: false,
    multipleLine: false
};
Item.Brief = Brief;
module.exports = exports['default'];