'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _flex = require('../flex');

var _flex2 = _interopRequireDefault(_flex);

var _index = require('../carousel/index.web');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Grid = function (_React$Component) {
    (0, _inherits3["default"])(Grid, _React$Component);

    function Grid() {
        (0, _classCallCheck3["default"])(this, Grid);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

        _this.clientWidth = document.documentElement.clientWidth;
        return _this;
    }

    Grid.prototype.render = function render() {
        var _classNames,
            _this2 = this;

        var _props = this.props;
        var className = _props.className;
        var data = _props.data;
        var prefixCls = _props.prefixCls;
        var hasLine = _props.hasLine;
        var isCarousel = _props.isCarousel;
        var columnNum = _props.columnNum;
        var carouselMaxRow = _props.carouselMaxRow;

        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls, true), (0, _defineProperty3["default"])(_classNames, prefixCls + '-line', hasLine), (0, _defineProperty3["default"])(_classNames, className, className), _classNames));
        var itemCls = (0, _classnames2["default"])((0, _defineProperty3["default"])({}, prefixCls + '-item', true));
        var dataLength = data.length;
        var lineCount = Math.ceil(dataLength / columnNum);
        var defaultHeight = this.clientWidth / columnNum;
        var renderItem = this.props.renderItem || function (dataItem, itemIndex) {
            return _react2["default"].createElement(
                'div',
                { className: prefixCls + '-item-contain column-num-' + columnNum, style: { height: defaultHeight + 'px' } },
                _react2["default"].createElement('img', { className: prefixCls + '-icon', src: dataItem.icon }),
                _react2["default"].createElement(
                    'div',
                    { className: prefixCls + '-text' },
                    dataItem.text
                )
            );
        };
        var lineElArray = [];
        var pageElArray = [];
        for (var i = 0; i < lineCount; i++) {
            var lineContent = [];

            var _loop = function _loop(j) {
                var dataIndex = i * columnNum + j;
                if (dataIndex < dataLength) {
                    lineContent.push(_react2["default"].createElement(
                        _flex2["default"].Item,
                        { className: itemCls, onClick: function onClick() {
                                _this2.props.onClick(data[dataIndex], dataIndex);
                            }, key: 'griditem-' + dataIndex },
                        renderItem(data[dataIndex], dataIndex)
                    ));
                } else {
                    lineContent.push(_react2["default"].createElement(_flex2["default"].Item, { key: 'griditem-' + dataIndex }));
                }
            };

            for (var j = 0; j < columnNum; j++) {
                _loop(j);
            }
            lineElArray.push(_react2["default"].createElement(
                _flex2["default"],
                { justify: 'center', align: 'stretch', key: 'gridline-' + i },
                lineContent
            ));
        }
        var pageCount = Math.ceil(lineCount / carouselMaxRow);
        if (isCarousel && pageCount > 1) {
            for (var pageIndex = 0; pageIndex < pageCount; pageIndex++) {
                var pageLines = [];
                for (var lineIndexInPage = 0; lineIndexInPage < carouselMaxRow; lineIndexInPage++) {
                    var lineIndexInAll = pageIndex * carouselMaxRow + lineIndexInPage;
                    if (lineIndexInAll < lineCount) {
                        pageLines.push(lineElArray[lineIndexInAll]);
                    } else {
                        pageLines.push(_react2["default"].createElement('div', { key: 'gridline-' + lineIndexInAll })); // 空节点为了确保末尾页的最后未到底的行有底线(样式中last-child会没线)
                    }
                }
                pageElArray.push(_react2["default"].createElement(
                    'div',
                    { className: prefixCls + '-carousel-page', key: 'pageitem-' + pageIndex },
                    pageLines
                ));
            }
        }
        return _react2["default"].createElement(
            'div',
            { className: wrapCls },
            isCarousel && pageCount > 1 ? _react2["default"].createElement(
                _index2["default"],
                null,
                pageElArray
            ) : lineElArray
        );
    };

    return Grid;
}(_react2["default"].Component);

exports["default"] = Grid;

Grid.defaultProps = {
    prefixCls: 'am-grid',
    data: [],
    onClick: function onClick() {},
    columnNum: 4,
    hasLine: true,
    isCarousel: false,
    carouselMaxRow: 2
};
module.exports = exports['default'];