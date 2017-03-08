'use strict';

import cx from 'classnames';
import {noop} from 'lodash';
import React from 'react';

import getOptionLabel from './utils/getOptionLabel';

import menuItemContainer from '../containers/menuItemContainer';

const BaseTableItem = React.createClass({
  displayName: 'BaseTableItem',

  getDefaultProps() {
    return {
      onClick: noop,
    };
  },

  render() {
    const {active, children, className, disabled,labelKey} = this.props;
    const label = getOptionLabel(children,labelKey);
    let item;

    if(children.isLeaf === 'true') {
      item = (
        <li className={cx({
        'active': active,
        'disabled': disabled,
      }, className)}>
          <span className="hoverBackground" onClick={this._handleIsLeaf}>{label}</span>
        </li>
      )

    } else {
      item = (
        <li className={cx({
        'active': active,
        'disabled': disabled,
      }, className)}>
          <span className="hoverBackground" onClick={this._handleIsLeaf}>{label}</span> <span className="glyphicon glyphicon-menu-right"></span>
        </li>
      )
    }

    return (
      <div>
        {item}
      </div>
    );
  },

  _handleClick(e) {
    const {disabled, onClick} = this.props;

    e.preventDefault();
    !disabled && onClick(e);
  },

  _handleIsLeaf(e) {
    const {children, changeStatus} = this.props;
    if(children.isLeaf=='false') {
      e.preventDefault();
      this.props.changeStatus(children);
    } else {
      this._handleClick(e);
    }

  },

});

const TableItem = menuItemContainer(BaseTableItem);

export {BaseTableItem};
export default TableItem;
