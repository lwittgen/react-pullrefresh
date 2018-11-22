'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(270deg);\n  }\n'], ['\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(270deg);\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  0% {\n    stroke-dashoffset: 62px;\n  }\n  50% {\n    stroke-dashoffset: ', 'px;\n    transform: rotate(135deg);\n  }\n  100% {\n    stroke-dashoffset: 62px;\n    transform: rotate(450deg);\n  }\n'], ['\n  0% {\n    stroke-dashoffset: 62px;\n  }\n  50% {\n    stroke-dashoffset: ', 'px;\n    transform: rotate(135deg);\n  }\n  100% {\n    stroke-dashoffset: 62px;\n    transform: rotate(450deg);\n  }\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  position: absolute;\n  z-index: ', ';\n  left: 50%;\n  border-radius: 20px;\n  width: 40px;\n  height: 40px;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n'], ['\n  position: absolute;\n  z-index: ', ';\n  left: 50%;\n  border-radius: 20px;\n  width: 40px;\n  height: 40px;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  transform-origin: center;\n  animation: ', ' 1.4s linear infinite;\n'], ['\n  transform-origin: center;\n  animation: ', ' 1.4s linear infinite;\n']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['\n  stroke-dasharray: 62px;\n  transform-origin: center;\n  animation: ', ' 1.4s ease-in-out infinite;\n'], ['\n  stroke-dasharray: 62px;\n  transform-origin: center;\n  animation: ', ' 1.4s ease-in-out infinite;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rotating = (0, _styledComponents.keyframes)(_templateObject);
var dashed = (0, _styledComponents.keyframes)(_templateObject2, 62 / 4);

var Component = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.zIndex;
});

var RotatingSvg = _styledComponents2.default.svg(_templateObject4, rotating);

var DashedCircle = _styledComponents2.default.circle(_templateObject5, dashed);

exports.default = function (props, state) {
  var max = state.max,
      yRefreshing = state.yRefreshing,
      y = state.y,
      phase = state.phase;
  var zIndex = props.zIndex,
      color = props.color,
      bgColor = props.bgColor;

  var p = Math.atan(y / max);
  var pMax = Math.atan(yRefreshing / max);
  var r = Math.PI * 10 * 2;
  var Svg = phase === 'refreshing' ? RotatingSvg : 'svg';
  var Circle = phase === 'refreshing' ? DashedCircle : 'circle';
  var refreshed = phase === 'refreshed';
  return _react2.default.createElement(
    Component,
    {
      key: 'pull',
      zIndex: zIndex,
      style: {
        top: Math.max(refreshed ? Math.atan(1) : p, 0) * max - 10,
        transform: 'translate(-50%, -100%) scale(' + (refreshed ? p : 1) + ',' + (refreshed ? p : 1) + ')',
        backgroundColor: bgColor
      }
    },
    _react2.default.createElement(
      Svg,
      {
        style: {
          transform: 'rotate(' + yRefreshing + 'deg)'
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
      phase !== 'refreshing' && _react2.default.createElement('path', {
        style: {
          opacity: pMax,
          transformOrigin: '50% 0%',
          transform: 'scale(' + Math.min(pMax, 1) + ', ' + Math.min(pMax, 1) + ')'
        },
        fill: color,
        d: 'M23.5,19l5,5l5-5H23.5z'
      })
    )
  );
};