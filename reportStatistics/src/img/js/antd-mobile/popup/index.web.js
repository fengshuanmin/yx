'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcDialog = require('rc-dialog');

var _rcDialog2 = _interopRequireDefault(_rcDialog);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function create(instanceId, config, content) {
    var afterClose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (x) {};

    var props = (0, _objectAssign2["default"])({}, {
        prefixCls: 'am-popup',
        animationType: 'slide-down'
    }, config);
    var prefixCls = props.prefixCls;
    var transitionName = props.transitionName;
    var maskTransitionName = props.maskTransitionName;
    var _props$maskClosable = props.maskClosable;
    var maskClosable = _props$maskClosable === undefined ? true : _props$maskClosable;
    var animationType = props.animationType;

    var div = document.createElement('div');
    document.body.appendChild(div);
    function close() {
        if (div) {
            _reactDom2["default"].unmountComponentAtNode(div);
            div.parentNode.removeChild(div);
            div = null;
        }
        afterClose(instanceId);
    }
    var transName = 'am-slide-down';
    if (animationType === 'slide-up') {
        transName = 'am-slide-up';
    }
    _reactDom2["default"].render(_react2["default"].createElement(
        _rcDialog2["default"],
        { prefixCls: prefixCls, visible: true, title: '', footer: '', className: prefixCls + '-' + animationType, transitionName: transitionName || transName, maskTransitionName: maskTransitionName || 'am-fade', onClose: close, maskClosable: maskClosable },
        content
    ), div);
    return {
        instanceId: instanceId,
        close: close
    };
}
var ins = {
    defaultInstance: null,
    instances: []
};
var instanceId = 1;

var Popup = function Popup() {
    (0, _classCallCheck3["default"])(this, Popup);
};

exports["default"] = Popup;

Popup.newInstance = function () {
    var j = void 0;
    return {
        show: function show(content, config) {
            j = create(instanceId++, config, content, function (iId) {
                for (var i = 0; i < ins.instances.length; i++) {
                    if (ins.instances[i].instanceId === iId) {
                        ins.instances.splice(i, 1);
                        return;
                    }
                }
            });
            ins.instances.push(j);
        },
        hide: function hide() {
            j.close();
        }
    };
};
Popup.show = function (content, config) {
    ins.defaultInstance = create('0', config, content, function (iId) {
        if (iId === '0') {
            ins.defaultInstance = null;
        }
    });
};
Popup.hide = function () {
    ins.defaultInstance.close();
};
module.exports = exports['default'];