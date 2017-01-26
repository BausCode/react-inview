import React, { Component } from 'react';

// Returns dimensions of container
function getViewPortBox(offsetY, boundingBox) {
  let vTop = 0,
    vLeft = 0,
    vWidth = window.innerWidth || document.documentElement.clientWidth,
    vHeight  = window.innerHeight || document.documentElement.clientHeight;

  if (offsetY >= 0 && offsetY <= 1) {
    const newHeight = vHeight * (1- offsetY);
    const newTop = (vHeight - newHeight) /2;
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
  let rect = el.getBoundingClientRect();
  return rect;
}

// Checks to see if element is visisble

function isElementFullyVisible (el, rect, viewport) {
    return (
        rect.top >= viewport.top &&
        rect.left >= 0 &&
        rect.bottom <= viewport.top + viewport.height && 
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


function isElementTopVisible (el, rect, viewport) {
  const topIsInView = !(rect.top >= (viewport.top + viewport.height));
  const topIsAboveView = !((rect.top + rect.height - viewport.height) <= viewport.top); 
  return (
    topIsInView && topIsAboveView
  );
}

let ReactInviewWrapper = function ReactInviewWrapper ({
  offsetY = 0,
  showGuides = false,
  fullElementInView = true
}={}) {
  return (ComposedComponent) => {

    return class ReactInview extends Component  {

      constructor() {
        super();
        
        this.state = {
          elementIsInView: false,
          elementIsHasBeenInView: false,
          boundingBox: {},
          viewPortBox: {}
        };
      }

      componentDidMount() {
        if (!this.refs.container) {
          throw new Error('Cannot find container');
        }

        if (typeof(window) !== 'undefined') {
          window.addEventListener('scroll', this.handleScroll.bind(this));
          this.handleScroll();
        }

      }

      componentWillUnmount() {
        if (typeof(window) !== 'undefined') {
          window.removeEventListener('scroll', this.handleScroll.bind(this));
        } 
      }

      handleScroll() {
        const element = this.refs.container.children[0];
        const boundingBox = getBoundingBox(element);
        const viewPortBox = getViewPortBox(offsetY, boundingBox);
        let elementIsInView = false;

        if(fullElementInView) {
          elementIsInView = isElementFullyVisible(element, boundingBox, viewPortBox);
        } else {
          elementIsInView = isElementTopVisible(element, boundingBox, viewPortBox);
        }
        if (elementIsInView) {
          this.setState({elementHasBeenInView: elementIsInView});
        }
        
        this.setState({elementIsInView: elementIsInView});
        this.setState({boundingBox: boundingBox});
        this.setState({viewPortBox: viewPortBox});
      }
  
      _showGuides() {
        if (showGuides && typeof this.state.viewPortBox.top !== 'undefined') {
          const {top, left, height, width} = this.state.viewPortBox;
          let styles = {
            'backgroundColor': '#ccc', 
            'position': 'fixed',
            'opacity': '.5',
            'top': top,
            'left': left,
            'height': height,
            'width': width,
            'zIndex': 99999999999
          };

          return <div style={styles}></div>;
        } 
      } 

      render() {
        let styles = {};
        if (showGuides) {
          styles = {
            backgroundColor: 'gray'
          }
        }
        return  (
          <div style={styles} ref="container">
            <ComposedComponent update={this.handleScroll.bind(this)} {...this.state}  {...this.props} />
            { this._showGuides() }
          </div>
        );
      }
    };
  };
};

export default ReactInviewWrapper;
