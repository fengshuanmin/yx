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

var _index = require('../list/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../radio/index.web');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SubMenu = function (_React$Component) {
    (0, _inherits3["default"])(SubMenu, _React$Component);

    function SubMenu(props) {
        (0, _classCallCheck3["default"])(this, SubMenu);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.onClick = function (el) {
            _this.setState({
                value: [el]
            });
            _this.props.onChange(el);
        };
        _this.state = {
            value: _this.props.value,
            data: _this.props.data
        };
        return _this;
    }

    SubMenu.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('data' in nextProps) {
            this.setState({
                data: nextProps.data
            });
        }
    };

    SubMenu.prototype.render = function render() {
        var _classNames,
            _this2 = this;

        var _state = this.state;
        var value = _state.value;
        var data = _state.data;
        var _props = this.props;
        var className = _props.className;
        var prefixCls = _props.prefixCls;
        var radioPrefixCls = _props.radioPrefixCls;

        var subMenuCls = (0, _classnames2["default"])((_classNames = {}, (0, _defineProperty3["default"])(_classNames, '' + prefixCls, true), (0, _defineProperty3["default"])(_classNames, className, className), _classNames));
        var itemsDom = [];
        data.forEach(function (el, idx) {
            var _classNames2;

            var listItemCls = (0, _classnames2["default"])((_classNames2 = {}, (0, _defineProperty3["default"])(_classNames2, radioPrefixCls + '-item', true), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-item-selected', value.length > 0 && value[0].value === el.value), (0, _defineProperty3["default"])(_classNames2, prefixCls + '-item-disabled', el.disabled), _classNames2));
            itemsDom.push(_react2["default"].createElement(
                _index2["default"].Item,
                { className: listItemCls, key: idx, extra: _react2["default"].createElement(_index4["default"], { checked: value.length > 0 && value[0].value === el.value, disabled: el.disabled, onChange: _this2.onClick.bind(_this2, el) }) },
                el.label
            ));
        });
        return _react2["default"].createElement(
            _index2["default"],
            { style: { paddingTop: 0 }, className: subMenuCls },
            itemsDom
        );
    };

    return SubMenu;
}(_react2["default"].Component);

exports["default"] = SubMenu;

SubMenu.defaultProps = {
    prefixCls: 'am-sub-menu',
    radioPrefixCls: 'am-radio',
    value: [],
    data: [],
    onChange: function onChange() {}
};
module.exports = exports['default'];