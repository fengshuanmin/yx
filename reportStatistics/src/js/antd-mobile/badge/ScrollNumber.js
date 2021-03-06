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

var _reactDom = require('react-dom');

var _isCssAnimationSupported = require('../_util/isCssAnimationSupported');

var _isCssAnimationSupported2 = _interopRequireDefault(_isCssAnimationSupported);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _objectOmit = require('object-omit');

var _objectOmit2 = _interopRequireDefault(_objectOmit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getNumberArray(num) {
    return num ? num.toString().split('').reverse().map(function (i) {
        return Number(i);
    }) : [];
}

var ScrollNumber = function (_React$Component) {
    (0, _inherits3["default"])(ScrollNumber, _React$Component);

    function ScrollNumber(props) {
        (0, _classCallCheck3["default"])(this, ScrollNumber);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

        _this.state = {
            animateStarted: true,
            count: props.count
        };
        return _this;
    }

    ScrollNumber.prototype.componentDidMount = function componentDidMount() {
        if (!(0, _isCssAnimationSupported2["default"])()) {
            (0, _reactDom.findDOMNode)(this).className += ' not-support-css-animation';
        }
    };

    ScrollNumber.prototype.getPositionByNum = function getPositionByNum(num, i) {
        if (this.state.animateStarted) {
            return 10 + num;
        }
        var currentDigit = getNumberArray(this.state.count)[i];
        var lastDigit = getNumberArray(this.lastCount)[i];
        // 同方向则在同一侧切换数字
        if (this.state.count > this.lastCount) {
            if (currentDigit >= lastDigit) {
                return 10 + num;
            }
            return 20 + num;
        }
        if (currentDigit <= lastDigit) {
            return 10 + num;
        }
        return num;
    };

    ScrollNumber.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        if ('count' in nextProps) {
            if (this.state.count === nextProps.count) {
                return;
            }
            this.lastCount = this.state.count;
            // 复原数字初始位置
            this.setState({
                animateStarted: true
            }, function () {
                // 等待数字位置复原完毕
                // 开始设置完整的数字
                setTimeout(function () {
                    _this2.setState({
                        animateStarted: false,
                        count: nextProps.count
                    }, function () {
                        _this2.props.onAnimated();
                    });
                }, 5);
            });
        }
    };

    ScrollNumber.prototype.renderNumberList = function renderNumberList(position) {
        var childrenToReturn = [];
        for (var i = 0; i < 30; i++) {
            var currentClassName = position === i ? 'current' : null;
            childrenToReturn.push(_react2["default"].createElement(
                'p',
                { key: i, className: currentClassName },
                i % 10
            ));
        }
        return childrenToReturn;
    };

    ScrollNumber.prototype.renderCurrentNumber = function renderCurrentNumber(num, i) {
        var position = this.getPositionByNum(num, i);
        var height = this.props.height;
        var removeTransition = this.state.animateStarted || getNumberArray(this.lastCount)[i] === undefined;
        return (0, _react.createElement)('span', {
            className: this.props.prefixCls + '-only',
            style: {
                transition: removeTransition && 'none',
                WebkitTransform: 'translate3d(0, ' + -position * height + 'px, 0)',
                transform: 'translate3d(0, ' + -position * height + 'px, 0)',
                height: height
            },
            key: i
        }, this.renderNumberList(position));
    };

    ScrollNumber.prototype.renderNumberElement = function renderNumberElement() {
        var _this3 = this;

        var state = this.state;
        if (!state.count || isNaN(state.count)) {
            return state.count;
        }
        return getNumberArray(state.count).map(function (num, i) {
            return _this3.renderCurrentNumber(num, i);
        }).reverse();
    };

    ScrollNumber.prototype.render = function render() {
        // fix https://fb.me/react-unknown-prop
        var props = (0, _objectAssign2["default"])({}, (0, _objectOmit2["default"])(this.props, ['count', 'onAnimated', 'component', 'prefixCls']), {
            className: this.props.prefixCls + ' ' + this.props.className
        });
        return (0, _react.createElement)(this.props.component, props, this.renderNumberElement());
    };

    return ScrollNumber;
}(_react2["default"].Component);

exports["default"] = ScrollNumber;

ScrollNumber.defaultProps = {
    prefixCls: 'am-scroll-number',
    count: null,
    component: 'sup',
    onAnimated: function onAnimated() {},

    height: 24
};
module.exports = exports['default'];