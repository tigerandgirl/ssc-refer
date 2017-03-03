'use strict';

import cx from 'classnames';
import {noop} from 'lodash';
import React from 'react';

import menuItemContainer from '../containers/menuItemContainer';

const BaseListItem = React.createClass({
  displayName: 'BaseListItem',

  getDefaultProps() {
    return {
      onClick: noop,
    };
  },

  render() {
    const {active, children, className, disabled} = this.props;

    return (
      <li className={cx({
        'active': active,
        'disabled': disabled,
      }, className)}>
        <span className="hoverBackground" onClick={this._handleClick}>{children}</span>
      </li>

    );
  },

  _handleClick(e) {
    const {disabled, onClick} = this.props;

    e.preventDefault();
    !disabled && onClick(e);
  },
});

const ListItem = menuItemContainer(BaseListItem);

export {BaseListItem};
export default ListItem;
