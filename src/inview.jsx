import React, { Component } from 'react';

// Returns dimensions of container
function getViewPortBox(offsetY, boundingBox) {
  let vTop = 0,
    vLeft = 0,
    vWidth = window.innerWidth || document.documentElement.clientWidth,
    vHeight  = window.innerHeight || document.documentElement.clientHeight;

  if (offsetY > 0 && offsetY <= 1) {
    const newHeight = vHeight * (1-offsetY);
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
function isElementVisible(el, rect, viewPort) {
  const efp = function (x, y) { return document.elementFromPoint(x, y); };     

  // Return false if it's not in the viewport
  if (rect.right < rect.left || rect.bottom < rect.height 
          || rect.left > viewPort.width || rect.top > viewPort.top)
    return false;

  // Return true if any of its four corners are visibl
  return (
        el.contains(efp(rect.left,  rect.top))
    ||  el.contains(efp(rect.right, rect.top))
    ||  el.contains(efp(rect.right, rect.bottom))
    ||  el.contains(efp(rect.left,  rect.bottom))
  );
}


let ReactInviewWrapper = function ReactInviewWrapper ({
  offsetY = 0,
  showGuides = false
}={}) {
  return (ComposedComponent) => {

    return class ReactInview extends Component  {

      constructor() {
        super();
        
        this.state = {
          elementIsInView: 0,
          boundingBox: {},
          viewPortBox: {}
        };
      }

      componentDidMount() {
        if (!this.refs.container) {
          throw new Error('Cannot find container');
        }

        if (process.env.BROWSER) {
          window.addEventListener('scroll', this.handleScroll.bind(this));
        }

      }

      componentWillUnmount() {
        if (process.env.BROWSER) {
          window.removeEventListener('scroll', this.handleScroll.bind(this));
        }
      }

      handleScroll() {
        const element = this.refs.container.children[0];
        const boundingBox = getBoundingBox(element);
        const viewPortBox = getViewPortBox(offsetY, boundingBox);

        const elementIsInView = isElementVisible(element, boundingBox, viewPortBox);

        
        this.setState({elementIsInView: elementIsInView});
        this.setState({boundingBox: boundingBox});
        this.setState({viewPortBox: viewPortBox});
      }
  
      _showGuides() {
        if (showGuides) {
          const {top, left, height, width} = this.state.viewPortBox;
          let styles = {
            'background-color': '#ccc', 
            'position': 'fixed',
            'opacity': '.5',
            'top': top -height,
            'left': left,
            'height': height,
            'width': width
          };

          return <div style={styles} >–––</div>;
        } 
      } 

      render() {
        return  (
          <div ref="container">
            <ComposedComponent update={this.handleScroll.bind(this)} {...this.state}  {...this.props} />
            { this._showGuides() }
          </div>
        );
      }
    };
  };
};

export default ReactInviewWrapper;
