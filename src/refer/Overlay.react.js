import cx from 'classnames';
import {isEqual, throttle} from 'lodash';
import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {findDOMNode} from 'react-dom';
import {Portal} from 'react-overlays';
import componentOrElement from 'react-prop-types/lib/componentOrElement';

// When appending the overlay to `document.body`, clicking on it will register
// as an "outside" click and immediately close the overlay. This classname tells
// `react-onclickoutside` to ignore the click.
const IGNORE_CLICK_OUTSIDE = 'ignore-react-onclickoutside';

function isBody(container) {
  return container === document.body;
}

/**
 * Custom `Overlay` component, since the version in `react-overlays` doesn't
 * work for our needs. Specifically, the `Position` component doesn't provide
 * the customized placement we need.
 */
const Overlay = createReactClass({
  displayName: 'Overlay',

  propTypes: {
    container: PropTypes.oneOfType([
      componentOrElement,
      PropTypes.func,
    ]).isRequired,
    show: PropTypes.bool,
    target: PropTypes.oneOfType([
      componentOrElement,
      PropTypes.func,
    ]).isRequired,
  },

  getDefaultProps() {
    return {
      show: false,
    };
  },

  getInitialState() {
    return {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    };
  },

  componentDidMount() {
    this._updatePosition();
    this._updatePositionThrottled = throttle(this._updatePosition, 100);

    window.addEventListener('resize', this._updatePositionThrottled);
    window.addEventListener('scroll', this._updatePositionThrottled, true);
  },

  componentWillReceiveProps(nextProps) {
    this._updatePositionThrottled();
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._updatePositionThrottled);
    window.removeEventListener('scroll', this._updatePositionThrottled);
  },

  render() {
    if (!this.props.show) {
      return null;
    }

    const {container, children} = this.props;
    let child = Children.only(children);

    // When not attaching the overlay to `document.body` treat the child as a
    // simple inline element.
    if (!isBody(container)) {
      return child;
    }

    child = cloneElement(child, {
      ...child.props,
      className: cx(child.props.className, IGNORE_CLICK_OUTSIDE),
      style: this.state,
    });

    return (
      <Portal container={container}>
        {child}
      </Portal>
    );
  },

  _updatePosition() {
    // Positioning is only used when body is the container.
    if (!isBody(this.props.container)) {
      return;
    }

    const {target} = this.props;
    const targetElement = typeof target === 'function' ? target() : target;
    const targetNode = findDOMNode(targetElement);

    if (targetNode) {
      const {innerHeight, innerWidth, pageYOffset} = window;
      const {bottom, left, top, width} = targetNode.getBoundingClientRect();
      const newState = {
        bottom: innerHeight - pageYOffset - top,
        left,
        right: innerWidth - left - width,
        top: pageYOffset + bottom,
      };

      // Don't update unless the target element position has changed.
      if (!isEqual(this.state, newState)) {
        this.setState(newState);
      }
    }
  },
});

export default Overlay;
