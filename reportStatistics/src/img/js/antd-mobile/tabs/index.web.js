'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcTabs = require('rc-tabs');

var _rcTabs2 = _interopRequireDefault(_rcTabs);

var _SwipeableTabContent = require('rc-tabs/lib/SwipeableTabContent');

var _SwipeableTabContent2 = _interopRequireDefault(_SwipeableTabContent);

var _TabContent = require('rc-tabs/lib/TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

var _InkTabBar = require('rc-tabs/lib/InkTabBar');

var _InkTabBar2 = _interopRequireDefault(_InkTabBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Tabs = _react2["default"].createClass({
    displayName: 'Tabs',

    statics: {
        TabPane: _rcTabs.TabPane
    },
    getDefaultProps: function getDefaultProps() {
        return {
            prefixCls: 'am-tabs',
            animated: true,
            swipeable: true,
            onChange: function onChange() {},

            tabBarPosition: 'top',
            onTabClick: function onTabClick() {}
        };
    },
    renderTabBar: function renderTabBar() {
        var props = this.props;

        return _react2["default"].createElement(_InkTabBar2["default"], { onTabClick: props.onTabClick, inkBarAnimated: props.animated });
    },
    renderTabContent: function renderTabContent() {
        var _props = this.props;
        var animated = _props.animated;
        var swipeable = _props.swipeable;

        return swipeable ? _react2["default"].createElement(_SwipeableTabContent2["default"], { animated: animated }) : _react2["default"].createElement(_TabContent2["default"], { animated: animated });
    },
    render: function render() {
        return _react2["default"].createElement(_rcTabs2["default"], (0, _extends3["default"])({ renderTabBar: this.renderTabBar, renderTabContent: this.renderTabContent }, this.props));
    }
});
exports["default"] = Tabs;
module.exports = exports['default'];