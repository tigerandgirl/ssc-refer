'use strict';

import cx from 'classnames';
import {noop} from 'lodash';
import React from 'react';

import renderContainer from '../containers/renderContainer';

const BaseTableRender = React.createClass({
  displayName: 'BaseTableRender',

  getDefaultProps() {
    return {
      onClick: noop,
    };
  },

  render() {
    const {active, children, className, disabled,labelKey} = this.props;


    return (
      <div>
        <h1>this is a tablefsfsfsdfsddsf refer</h1>
      </div>
    );
  },

  _handleClick(e) {
    const {disabled, onClick} = this.props;

    e.preventDefault();
    !disabled && onClick(e);
  },


});

const TableRender = renderContainer(BaseTableRender);

export {BaseTableRender};
export default TableRender;
