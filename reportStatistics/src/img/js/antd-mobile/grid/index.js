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

var _flex = require('../flex');

var _flex2 = _interopRequireDefault(_flex);

var _carousel = require('../carousel');

var _carousel2 = _interopRequireDefault(_carousel);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Grid = function (_React$Component) {
    (0, _inherits3["default"])(Grid, _React$Component);

    function Grid() {
        (0, _classCallCheck3["default"])(this, Grid);
        return (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
    }

    Grid.prototype.getFlexItemStyle = function getFlexItemStyle() {
        var clientWidth = _reactNative.Dimensions.get('window').width;
        var flexItemStyle = {
            height: clientWidth / 4,
            borderRightWidth: this.props.hasLine ? 1 : 0
        };
        return flexItemStyle;
    };

    Grid.prototype.getGridContent = function getGridContent() {
        var _props = this.props;
        var data = _props.data;
        var hasLine = _props.hasLine;
        var onClick = _props.onClick;

        var flexItemStyle = this.getFlexItemStyle();
        var gridContent = [];
        var dataLength = data.length;
        var rowCount = Math.ceil(dataLength / 4);
        for (var i = 0; i < rowCount; i++) {
            var row = [];

            var _loop = function _loop(j) {
                var itemIndex = i * 4 + j;
                var item = data[itemIndex];
                if (item) {
                    row.push(_react2["default"].createElement(
                        _flex2["default"].Item,
                        { key: j, style: [_style2["default"].grayBorderBox, flexItemStyle] },
                        _react2["default"].createElement(
                            _flex2["default"],
                            { direction: 'column', justify: 'center', style: { flex: 1 }, onPress: function onPress() {
                                    return onClick(item, itemIndex);
                                } },
                            _react2["default"].createElement(_reactNative.Image, { source: { uri: item.icon }, style: _style2["default"].icon }),
                            _react2["default"].createElement(
                                _reactNative.Text,
                                { style: _style2["default"].text },
                                item.text
                            )
                        )
                    ));
                } else {
                    row.push(_react2["default"].createElement(_flex2["default"].Item, { key: j, style: [_style2["default"].grayBorderBox, flexItemStyle] }));
                }
            };

            for (var j = 0; j < 4; j++) {
                _loop(j);
            }
            gridContent.push(_react2["default"].createElement(
                _flex2["default"],
                { key: i, style: [_style2["default"].grayBorderBox, { borderBottomWidth: hasLine ? 1 : 0 }] },
                row
            ));
        }
        return gridContent;
    };

    Grid.prototype.toCarousel = function toCarousel(gridContent) {
        var hasLine = this.props.hasLine;
        var flexItemStyle = this.getFlexItemStyle();
        var carouselContent = [];
        var gridContentLength = gridContent.length;
        var frameCount = Math.ceil(gridContentLength / 2);
        for (var i = 0; i < frameCount; i++) {
            if (i * 2 + 1 < gridContentLength) {
                carouselContent.push(_react2["default"].createElement(
                    _reactNative.View,
                    { key: i },
                    gridContent[i * 2],
                    gridContent[i * 2 + 1]
                ));
            } else {
                carouselContent.push(_react2["default"].createElement(
                    _reactNative.View,
                    { key: i },
                    gridContent[i * 2],
                    _react2["default"].createElement(
                        _flex2["default"],
                        { style: [_style2["default"].grayBorderBox, { borderBottomWidth: hasLine ? 1 : 0 }] },
                        _react2["default"].createElement(_flex2["default"].Item, { style: [_style2["default"].grayBorderBox, flexItemStyle] }),
                        _react2["default"].createElement(_flex2["default"].Item, { style: [_style2["default"].grayBorderBox, flexItemStyle] }),
                        _react2["default"].createElement(_flex2["default"].Item, { style: [_style2["default"].grayBorderBox, flexItemStyle] }),
                        _react2["default"].createElement(_flex2["default"].Item, { style: [_style2["default"].grayBorderBox, flexItemStyle] })
                    )
                ));
            }
        }
        return carouselContent;
    };

    Grid.prototype.render = function render() {
        var gridContent = this.getGridContent();
        var isCarousel = this.props.isCarousel;
        var children = isCarousel ? this.toCarousel(gridContent) : gridContent;
        return _react2["default"].createElement(
            _flex2["default"],
            { direction: 'column' },
            isCarousel ? _react2["default"].createElement(
                _carousel2["default"],
                { infinite: false, dots: true },
                children
            ) : children
        );
    };

    return Grid;
}(_react2["default"].Component);

exports["default"] = Grid;

Grid.defaultProps = {
    data: [],
    hasLine: true,
    isCarousel: false,
    onClick: function onClick() {}
};
module.exports = exports['default'];