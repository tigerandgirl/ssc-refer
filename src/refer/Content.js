'use strict';

import cx from 'classnames';
import React, {Children, PropTypes} from 'react';

import {BaseMenuItem} from './MenuItem.react';

const BaseContent = props => (
  <div
    {...props}
    className={cx('dropup-menu', props.className)}>
    {props.children}
  </div>
);

/**
 * Menu component that automatically handles pagination and empty state when
 * passed a set of filtered and truncated results.
 */
const Content = React.createClass({
  displayName: 'Content',

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

    const contents = noResults ?
      <BaseMenuItem disabled>
        {emptyLabel}
      </BaseMenuItem> :
      children;

    return (
      <BaseContent
        className={cx('bootstrap-refer-content', {
          'dropdown-menu-justify': align === 'justify',
          'dropdown-menu-right': align === 'right',
        }, className)}
        style={this._getMenuStyle()}>
        {contents}
        {this._renderPaginationMenuItem()}
      </BaseContent>
    );
  },

  /**
   * Allow user to see more results, if available.
   */
  _renderPaginationMenuItem() {
    const {children, onPaginate, paginate, paginationText} = this.props;

    if (paginate && Children.count(children)) {
      return [
        <li
          className="divider"
          key="pagination-item-divider"
          role="separator"
        />,
        <BaseMenuItem
          className="bootstrap-typeahead-menu-paginator"
          key="pagination-item"
          onClick={onPaginate}>
          {paginationText}
        </BaseMenuItem>,
      ];
    }
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

export default Content;
