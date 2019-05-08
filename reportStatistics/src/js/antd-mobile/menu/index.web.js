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

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _SubMenu = require('./SubMenu.web');

var _SubMenu2 = _interopRequireDefault(_SubMenu);

var _list = require('../list');

var _list2 = _interopRequireDefault(_list);

var _flex = require('../flex');

var _flex2 = _interopRequireDefault(_flex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Menu = function (_React$Component) {
    (0, _inherits3["default"])(Menu, _React$Component);

    function Menu(props) {
        (0, _classCallCheck3["default"])(this, Menu);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.onClickListItem = function (el) {
            if (el.isLeaf === true) {
                _this.setState({
                    firstValue: el.value,
                    SubMenuData: []
                }, function () {
                    _this.props.onChange([el.value]);
                });
            }
            _this.setState({
                firstValue: el.value,
                SubMenuData: el.children || []
            });
        };
        _this.onClickSubMenuItem = function (el) {
            var _this$props = _this.props;
            var level = _this$props.level;
            var onChange = _this$props.onChange;

            setTimeout(function () {
                onChange(level === 2 ? [_this.state.firstValue, el.value] : [el.value]);
            }, 300);
        };
        var data = props.data;
        var value = props.value;
        var level = props.level;

        if (level !== 2) {
            _this.state = {
                SubMenuData: data
            };
            return (0, _possibleConstructorReturn3["default"])(_this);
        }
        if (value.length > 0) {
            var _SubMenuData = data.filter(function (el) {
                return el.value === (value.length > 0 && value[0] || null);
            })[0].children || [];
            _this.state = {
                SubMenuData: _SubMenuData,
                firstValue: value[0] || ''
            };
            return (0, _possibleConstructorReturn3["default"])(_this);
        }
        var SubMenuData = data[0].children || [];
        if (data[0].isLeaf) {
            _this.state = {
                SubMenuData: [],
                firstValue: ''
            };
        } else {
            _this.state = {
                SubMenuData: SubMenuData,
                firstValue: data[0].value
            };
        }
        return _this;
    }

    Menu.prototype.render = function render() {
        var _classNames,
            _this2 = this;

        var _props = this.props;
        var className = _props.className;
        var data = _props.data;
        var prefixCls = _props.prefixCls;
        var value = _props.value;
        var level = _props.level;
        var style = _props.style;
        var height = this.props.height;

        if (!height) {
            height = document.documentElement.clientHeight / 2;
        }
        var heightStyle = {
            height: Math.round(height) + 'px',
            overflowY: 'scroll'
        };
        var _state = this.state;
        var SubMenuData = _state.SubMenuData;
        var firstValue = _state.firstValue;

        var wrapCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls, true), (0, _defineProperty3["default"])(_classNames, className, !!className), _classNames));
        var listContent = data.map(function (el, index) {
            return _react2["default"].createElement(
                _list2["default"].Item,
                { className: el.value === firstValue ? prefixCls + '-selected' : '', onClick: _this2.onClickListItem.bind(_this2, el), key: 'listitem-1-' + index },
                el.label
            );
        });
        return _react2["default"].createElement(
            'div',
            { className: wrapCls, style: (0, _objectAssign2["default"])({}, style, heightStyle) },
            _react2["default"].createElement(
                _flex2["default"],
                { align: 'top' },
                level === 2 ? _react2["default"].createElement(
                    _flex2["default"].Item,
                    { style: heightStyle },
                    _react2["default"].createElement(
                        _list2["default"],
                        null,
                        listContent
                    )
                ) : null,
                _react2["default"].createElement(
                    _flex2["default"].Item,
                    { style: heightStyle },
                    _react2["default"].createElement(_SubMenu2["default"], { value: SubMenuData.filter(function (el) {
                            return el.value === (value.length && value[value.length - 1]);
                        }), data: SubMenuData, onChange: this.onClickSubMenuItem })
                )
            )
        );
    };

    return Menu;
}(_react2["default"].Component);

exports["default"] = Menu;

Menu.defaultProps = {
    prefixCls: 'am-menu',
    value: [],
    data: [],
    level: 2,
    onChange: function onChange() {}
};
module.exports = exports['default'];