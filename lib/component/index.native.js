'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  position: absolute;\n  left: 50%;\n  border-radius: 20px;\n  width: 40px;\n  height: 40px;\n  shadow-radius: 2;\n  shadow-offset: { width: 0, height: 2 };\n  shadow-opacity: 0.14;\n  shadow-color: #000;\n'], ['\n  position: absolute;\n  left: 50%;\n  border-radius: 20px;\n  width: 40px;\n  height: 40px;\n  shadow-radius: 2;\n  shadow-offset: { width: 0, height: 2 };\n  shadow-opacity: 0.14;\n  shadow-color: #000;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _native = require('styled-components/native');

var _native2 = _interopRequireDefault(_native);

var _reactNative = require('react-native');

var _reactNativeSvg = require('react-native-svg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RotatingSvg = function (_Component) {
  (0, _inherits3.default)(RotatingSvg, _Component);

  function RotatingSvg(props) {
    (0, _classCallCheck3.default)(this, RotatingSvg);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RotatingSvg.__proto__ || Object.getPrototypeOf(RotatingSvg)).call(this, props));

    _this.state = {
      r: new _reactNative.Animated.Value(0),
      value: 0
    };
    return _this;
  }

  (0, _createClass3.default)(RotatingSvg, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.state.r.addListener(function (r) {
        _this2.setState({ value: r.value });
      });
      this._animated = _reactNative.Animated.loop(_reactNative.Animated.timing(this.state.r, {
        easing: _reactNative.Easing.linear,
        toValue: 270,
        duration: 1400
      }));
      this._animated.start();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._animated.stop();
    }
  }, {
    key: 'render',
    value: function render() {
      var value = this.state.value;
      var _props = this.props,
          style = _props.style,
          props = (0, _objectWithoutProperties3.default)(_props, ['style']);

      return _react2.default.createElement(_reactNativeSvg.Svg, (0, _extends3.default)({
        style: (0, _extends3.default)({}, style || {}, {
          transform: [].concat((0, _toConsumableArray3.default)(style.transform || []), [{ rotate: value + 'deg' }])
        })
      }, props));
    }
  }]);
  return RotatingSvg;
}(_react.Component);

var DashedCircle = function (_Component2) {
  (0, _inherits3.default)(DashedCircle, _Component2);

  function DashedCircle(props) {
    (0, _classCallCheck3.default)(this, DashedCircle);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (DashedCircle.__proto__ || Object.getPrototypeOf(DashedCircle)).call(this, props));

    _this3.state = {
      rotate: new _reactNative.Animated.Value(0),
      dash: new _reactNative.Animated.Value(62)
    };
    return _this3;
  }

  (0, _createClass3.default)(DashedCircle, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      this.state.rotate.addListener(function (r) {
        _this4.setState({ r: r.value });
      });
      this.state.dash.addListener(function (d) {
        _this4.setState({ d: d.value });
      });
      this._animated = _reactNative.Animated.loop(_reactNative.Animated.parallel([_reactNative.Animated.sequence([_reactNative.Animated.timing(this.state.rotate, {
        toValue: 135,
        duration: 700
      }), _reactNative.Animated.timing(this.state.rotate, {
        toValue: 450,
        duration: 700
      })]), _reactNative.Animated.sequence([_reactNative.Animated.timing(this.state.dash, {
        toValue: 62 / 4,
        duration: 700
      }), _reactNative.Animated.timing(this.state.dash, {
        toValue: 62,
        duration: 700
      })])]));
      this._animated.start();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._animated.stop();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          r = _state.r,
          d = _state.d;
      var _props2 = this.props,
          strokeDasharray = _props2.strokeDasharray,
          style = _props2.style,
          props = (0, _objectWithoutProperties3.default)(_props2, ['strokeDasharray', 'style']);

      return _react2.default.createElement(_reactNativeSvg.Circle, (0, _extends3.default)({}, props, {
        strokeDashoffset: d,
        strokeDasharray: [62],
        style: (0, _extends3.default)({}, style || {}, {
          transform: [].concat((0, _toConsumableArray3.default)(style.transform || []), [{ rotate: r + 'deg' }])
        })
      }));
    }
  }]);
  return DashedCircle;
}(_react.Component);

var Container = (0, _native2.default)(_reactNative.View)(_templateObject);

exports.default = function (props, state, children) {
  var max = state.max,
      yRefreshing = state.yRefreshing,
      y = state.y,
      phase = state.phase;
  var color = props.color,
      bgColor = props.bgColor;

  var p = Math.atan(y / max);
  var pMax = Math.atan(yRefreshing / max);
  var r = Math.PI * 10 * 2;
  var Svg = phase === 'refreshing' ? RotatingSvg : _reactNativeSvg.Svg;
  var Circle = phase === 'refreshing' ? DashedCircle : _reactNativeSvg.Circle;
  var refreshed = phase === 'refreshed';
  return [children, _react2.default.createElement(
    Container,
    {
      key: 'pull',
      style: {
        top: Math.max(refreshed ? Math.atan(1) : p, 0) * max - 10,
        transform: [{ translateX: -20 }, { translateY: -40 }, { scale: refreshed ? p : 1 }],
        backgroundColor: bgColor
      }
    },
    _react2.default.createElement(
      Svg,
      {
        style: {
          transform: [{ rotate: yRefreshing * 0.05 + 'deg)' },
          // 0 270
          { rotate: yRefreshing * 0.05 + 'deg)' }]
        },
        width: 40,
        height: 40,
        viewBox: '0 0 40 40'
      },
      _react2.default.createElement(Circle, {
        style: { opacity: pMax },
        stroke: color,
        strokeWidth: 2.5,
        strokeDasharray: [r * pMax * 0.6, r * (1 - pMax * 0.6)],
        strokeDashoffset: -r * (1 - pMax * 0.6),
        fill: 'none',
        cx: 20,
        cy: 20,
        r: 8.5
      }),
      phase !== 'refreshing' && _react2.default.createElement(_reactNativeSvg.Path, {
        style: {
          opacity: pMax,
          transform: [{ scale: Math.min(pMax, 1) }]
        },
        fill: color,
        d: 'M23.5,19l5,5l5-5H23.5z'
      })
    )
  )];
};