'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _spring = require('./spring');

var _spring2 = _interopRequireDefault(_spring);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX = 100;
var sleep = function sleep(msec) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, msec);
  });
};

var PullRefresh = function (_Component) {
  (0, _inherits3.default)(PullRefresh, _Component);

  function PullRefresh(props) {
    (0, _classCallCheck3.default)(this, PullRefresh);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PullRefresh.__proto__ || Object.getPrototypeOf(PullRefresh)).call(this, props));

    _this.state = {
      y: 0,
      yRefreshing: 0,
      max: MAX,
      phase: ''
    };
    return _this;
  }

  (0, _createClass3.default)(PullRefresh, [{
    key: 'refresh',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setState({
                  phase: 'willRefresh'
                });
                _context.next = 3;
                return sleep(0);

              case 3:
                _context.next = 5;
                return this._refresh();

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function refresh() {
        return _ref.apply(this, arguments);
      }

      return refresh;
    }()
  }, {
    key: '_refresh',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var _state, max, phase, onRefresh;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _state = this.state, max = _state.max, phase = _state.phase;
                onRefresh = this.props.onRefresh;

                if (!(phase === 'willRefresh')) {
                  _context2.next = 13;
                  break;
                }

                this._willRefresh = true;
                _context2.next = 6;
                return this._spring.to(max);

              case 6:
                this._spring.pause();
                this._willRefresh = false;
                this.setState({
                  phase: 'refreshing'
                });
                _context2.next = 11;
                return onRefresh();

              case 11:
                this.setState({
                  yRefreshing: 0,
                  phase: 'refreshed'
                });
                this._spring.resume();

              case 13:
                this._y = 0;
                this._spring.endValue = this._y;

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _refresh() {
        return _ref2.apply(this, arguments);
      }

      return _refresh;
    }()
  }, {
    key: 'onScroll',
    value: function onScroll(evt) {
      this._scrollTop = evt.currentTarget.scrollTop !== undefined ? evt.currentTarget.scrollTop : evt.nativeEvent.contentOffset.y;
    }
  }, {
    key: 'onDown',
    value: function onDown(evt) {
      var phase = this.state.phase;

      if (this._willRefresh) return;
      if (phase === 'refreshed' || phase === 'refreshing') return;
      this._down = true;
      var ey = evt.nativeEvent.touches ? evt.nativeEvent.touches[0].pageY : evt.pageY;
      this._py = ey;
    }
  }, {
    key: 'onUp',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(evt) {
        var phase;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                phase = this.state.phase;

                if (!(phase === 'refreshed' || phase === 'refreshing')) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt('return');

              case 3:
                this._down = false;
                _context3.next = 6;
                return this._refresh();

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onUp(_x) {
        return _ref3.apply(this, arguments);
      }

      return onUp;
    }()
  }, {
    key: 'onMove',
    value: function onMove(evt) {
      var phase = this.state.phase;

      if (this._willRefresh || !this._down) return;
      if (phase === 'refreshed' || phase === 'refreshing') return;
      var ey = evt.nativeEvent.touches ? evt.nativeEvent.touches[0].pageY : evt.pageY;
      if (this._scrollTop <= 0) {
        this._y = this._y + ey - this._py;
        this._spring.endValue = this._y;
      }
      this._py = ey;
    }
  }, {
    key: 'onSpringUpdate',
    value: function onSpringUpdate(spring) {
      var _state2 = this.state,
          max = _state2.max,
          yRefreshing = _state2.yRefreshing,
          phase = _state2.phase;

      var y = spring.currentValue;
      this.setState({
        y: y,
        yRefreshing: this._willRefresh ? Math.max(y, yRefreshing) : y
      });
      if (phase !== 'refreshed' && phase !== 'refreshing') {
        var newPhase = y >= max ? 'willRefresh' : '';
        if (phase !== newPhase) this.setState({ phase: newPhase });
      }
      if (phase === 'refreshed' && y === 0) {
        this.setState({ phase: '' });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._y = 0;
      this._scrollTop = 0;
      this._spring = new _spring2.default(60, 10);
      this._spring.onUpdate = this.onSpringUpdate.bind(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          zIndex = _props.zIndex,
          render = _props.render,
          bgColor = _props.bgColor,
          color = _props.color,
          onRefresh = _props.onRefresh,
          disabled = _props.disabled,
          as = _props.as,
          children = _props.children,
          props = (0, _objectWithoutProperties3.default)(_props, ['zIndex', 'render', 'bgColor', 'color', 'onRefresh', 'disabled', 'as', 'children']);

      var PullRefreshComponent = render;
      var Container = as;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          Container,
          (0, _extends3.default)({}, props, {
            onScroll: disabled ? undefined : this.onScroll.bind(this),
            onMouseDown: disabled ? undefined : this.onDown.bind(this),
            onMouseUp: disabled ? undefined : this.onUp.bind(this),
            onMouseMove: disabled ? undefined : this.onMove.bind(this),
            onTouchStart: disabled ? undefined : this.onDown.bind(this),
            onTouchEnd: disabled ? undefined : this.onUp.bind(this),
            onTouchMove: disabled ? undefined : this.onMove.bind(this)
          }),
          children
        ),
        render(this.props, this.state)
      );
    }
  }]);
  return PullRefresh;
}(_react.Component);

exports.default = PullRefresh;


PullRefresh.propTypes = {
  as: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  onRefresh: _propTypes2.default.func,
  style: _propTypes2.default.object,
  disabled: _propTypes2.default.bool,
  color: _propTypes2.default.string,
  bgColor: _propTypes2.default.string,
  render: _propTypes2.default.func,
  zIndex: _propTypes2.default.number
};

PullRefresh.defaultProps = {
  as: 'div',
  style: {},
  disabled: false,
  color: '#4285f4',
  bgColor: '#fff',
  render: _component2.default,
  zIndex: undefined
};