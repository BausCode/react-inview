'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
  return rect.top >= viewport.top;
}

var ReactInviewWrapper = function ReactInviewWrapper() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$offsetY = _ref.offsetY;
  var offsetY = _ref$offsetY === undefined ? 0 : _ref$offsetY;
  var _ref$showGuides = _ref.showGuides;
  var showGuides = _ref$showGuides === undefined ? false : _ref$showGuides;
  var _ref$fullElementInVie = _ref.fullElementInView;
  var fullElementInView = _ref$fullElementInVie === undefined ? true : _ref$fullElementInVie;

  return function (ComposedComponent) {

    return function (_Component) {
      _inherits(ReactInview, _Component);

      function ReactInview() {
        _classCallCheck(this, ReactInview);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactInview).call(this));

        _this.state = {
          elementIsInView: false,
          boundingBox: {},
          viewPortBox: {}
        };
        return _this;
      }

      _createClass(ReactInview, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          if (!this.refs.container) {
            throw new Error('Cannot find container');
          }

          if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this.handleScroll.bind(this));
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', this.handleScroll.bind(this));
          }
        }
      }, {
        key: 'handleScroll',
        value: function handleScroll() {
          var element = this.refs.container.children[0];
          var boundingBox = getBoundingBox(element);
          var viewPortBox = getViewPortBox(offsetY, boundingBox);
          var elementIsInView = false;

          if (fullElementInView) {
            elementIsInView = isElementFullyVisible(element, boundingBox, viewPortBox);
          } else {
            elementIsInView = isElementTopVisible(element, boundingBox, viewPortBox);
          }

          this.setState({ elementIsInView: elementIsInView });
          this.setState({ boundingBox: boundingBox });
          this.setState({ viewPortBox: viewPortBox });
        }
      }, {
        key: '_showGuides',
        value: function _showGuides() {
          if (showGuides && typeof this.state.viewPortBox.top !== 'undefined') {
            var _state$viewPortBox = this.state.viewPortBox;
            var top = _state$viewPortBox.top;
            var left = _state$viewPortBox.left;
            var height = _state$viewPortBox.height;
            var width = _state$viewPortBox.width;

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
              backgroundColor: 'green'
            };
          }
          return _react2.default.createElement(
            'div',
            { style: styles, ref: 'container' },
            _react2.default.createElement(ComposedComponent, _extends({ update: this.handleScroll.bind(this) }, this.state, this.props)),
            this._showGuides()
          );
        }
      }]);

      return ReactInview;
    }(_react.Component);
  };
};

exports.default = ReactInviewWrapper;