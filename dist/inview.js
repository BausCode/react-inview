'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Returns dimensions of container
function getViewPortBox(offsetY, boundingBox) {
  var vTop = 0,
      vLeft = 0,
      vWidth = window.innerWidth || document.documentElement.clientWidth,
      vHeight = window.innerHeight || document.documentElement.clientHeight;

  if (offsetY >= 0 && offsetY <= 1) {
    var newHeight = vHeight * (1 - offsetY);
    var newTop = (vHeight - newHeight) / 2;
    vTop = newTop;
    vHeight = newHeight;
  }

  return {
    top: vTop,
    height: vHeight,
    width: vWidth,
    left: vLeft
  };
}

// Returns dimensions of element/target
function getBoundingBox(el) {
  var rect = el.getBoundingClientRect();
  return rect;
}

// Checks to see if element is visisble
function isElementFullyVisible(el, rect, viewport) {
  return rect.top >= viewport.top && rect.left >= 0 && rect.bottom <= viewport.top + viewport.height && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

function isElementTopVisible(el, rect, viewport) {
  var topIsInView = !(rect.top >= viewport.top + viewport.height);
  var topIsAboveView = !(rect.top + rect.height - viewport.height <= viewport.top);
  return topIsInView && topIsAboveView;
}

var ReactInviewWrapper = function ReactInviewWrapper() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$offsetY = _ref.offsetY,
      offsetY = _ref$offsetY === undefined ? 0 : _ref$offsetY,
      _ref$showGuides = _ref.showGuides,
      showGuides = _ref$showGuides === undefined ? false : _ref$showGuides,
      _ref$fullElementInVie = _ref.fullElementInView,
      fullElementInView = _ref$fullElementInVie === undefined ? true : _ref$fullElementInVie,
      _ref$debounceTime = _ref.debounceTime,
      debounceTime = _ref$debounceTime === undefined ? 100 : _ref$debounceTime;

  return function (ComposedComponent) {

    return function (_Component) {
      _inherits(ReactInview, _Component);

      function ReactInview() {
        _classCallCheck(this, ReactInview);

        var _this = _possibleConstructorReturn(this, (ReactInview.__proto__ || Object.getPrototypeOf(ReactInview)).call(this));

        _this.state = {
          elementIsInView: false,
          elementIsHasBeenInView: false,
          boundingBox: {},
          viewPortBox: {}
        };

        _this.scrollListener = _this.scrollListener.bind(_this);
        _this.handleScroll = (0, _debounce2.default)(_this.handleScroll.bind(_this), debounceTime);
        _this.containerRef = _react2.default.createRef();
        return _this;
      }

      _createClass(ReactInview, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          if (!this.containerRef) {
            throw new Error('Cannot find container');
          }

          if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this.scrollListener);
            this.handleScroll();
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', this.scrollListener);
          }
        }
      }, {
        key: 'scrollListener',
        value: function scrollListener() {
          var _this2 = this;

          window.requestAnimationFrame(function () {
            _this2.handleScroll();
          });
        }
      }, {
        key: 'handleScroll',
        value: function handleScroll() {
          if (typeof this.containerRef === 'undefined') {
            return;
          }

          var element = this.containerRef.children[0];
          var boundingBox = getBoundingBox(element);
          var viewPortBox = getViewPortBox(offsetY, boundingBox);
          var elementIsInView = false;

          if (fullElementInView) {
            elementIsInView = isElementFullyVisible(element, boundingBox, viewPortBox);
          } else {
            elementIsInView = isElementTopVisible(element, boundingBox, viewPortBox);
          }
          var newState = {
            elementIsInView: elementIsInView,
            boundingBox: boundingBox,
            viewPortBox: viewPortBox
          };
          if (elementIsInView) {
            newState.elementHasBeenInView = elementIsInView;
          }
          this.setState(newState);
        }
      }, {
        key: '_showGuides',
        value: function _showGuides() {
          if (showGuides && typeof this.state.viewPortBox.top !== 'undefined') {
            var _state$viewPortBox = this.state.viewPortBox,
                top = _state$viewPortBox.top,
                left = _state$viewPortBox.left,
                height = _state$viewPortBox.height,
                width = _state$viewPortBox.width;

            var styles = {
              'backgroundColor': '#ccc',
              'position': 'fixed',
              'opacity': '.5',
              'top': top,
              'left': left,
              'height': height,
              'width': width,
              'zIndex': 99999999999
            };

            return _react2.default.createElement('div', { style: styles });
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var styles = {};
          if (showGuides) {
            styles = {
              backgroundColor: 'gray'
            };
          }
          return _react2.default.createElement(
            'div',
            { style: styles, ref: this.containerRef },
            _react2.default.createElement(ComposedComponent, _extends({ update: this.handleScroll }, this.state, this.props)),
            this._showGuides()
          );
        }
      }]);

      return ReactInview;
    }(_react.Component);
  };
};

exports.default = ReactInviewWrapper;