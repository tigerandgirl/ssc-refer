'use strict';

import cx from 'classnames';
import React, {Children} from 'react';
import PropTypes from 'prop-types';
import {Breadcrumb} from 'react-bootstrap';

const BaseMenu = props => (
  <ul
    {...props}
    className={cx('dropdown-menu', props.className)}>
    {props.children}
  </ul>
);

/**
 * Menu component that automatically handles pagination and empty state when
 * passed a set of filtered and truncated results.
 */
const List = React.createClass({
  displayName: 'List',

  propTypes: {
    /**
     * Specify menu alignment. The default value is `justify`, which makes the
     * menu as wide as the input and truncates long values. Specifying `left`
     * or `right` will align the menu to that side and the width will be
     * determined by the length of menu item values.
     */
    align: PropTypes.oneOf(['justify', 'left', 'right']),
    /**
     * Message to display in the menu if there are no valid results.
     */
    emptyLabel: PropTypes.string,
    /**
     * Maximum height of the dropdown menu, in px.
     */
    maxHeight: PropTypes.number,
    /**
     * Prompt displayed when large data sets are paginated.
     */
    paginationText: PropTypes.string,
  },

  getDefaultProps() {
    return {
      align: 'justify',
      emptyLabel: '无匹配结果.',
      maxHeight: 300,
      paginate: true,
      paginationText: '显示更多...',
    };
  },

  render() {
    const {align, children, className, emptyLabel} = this.props;
    const noResults = Children.count(children) === 0;

    // If an empty string is passed, suppress menu when there are no results.
    if (noResults && emptyLabel === '') {
      return null;
    }

    const contents = children;

    return (
      <BaseMenu
        className={cx('bootstrap-typeahead-menu', {
          'dropdown-menu-justify': align === 'justify',
          'dropdown-menu-right': align === 'right',
        }, className)}
        style={this._getMenuStyle()}>
        {contents}
      </BaseMenu>
    );
  },

  _getMenuStyle() {
    const {align, dropup, maxHeight, style} = this.props;
    const menuStyle = {
      ...style,
      display: 'block',
      maxHeight: maxHeight + 'px',
      overflow: 'auto',
    };

    if (style) {
      if (dropup) {
        menuStyle.top = 'auto';
      } else {
        delete menuStyle.bottom;
      }
      menuStyle.left = align === 'right' ? 'auto' : style.left;
      menuStyle.right = align === 'left' ? 'auto' : style.right;
    }

    return menuStyle;
  },
});

export default List;
