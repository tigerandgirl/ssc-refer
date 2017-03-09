'use strict';

import cx from 'classnames';
import {noop} from 'lodash';
import React from 'react';

import Table from 'bee-table';

//import renderContainer from '../containers/renderContainer';


const TableRender = React.createClass({
  displayName: 'TableRender',

  getDefaultProps() {
    return {
      onClick: noop,
    };
  },

  render() {
    
    const {active, children, className, disabled,labelKey, tableColumns} = this.props;
    children.forEach(function(item, index) {
      item.key = index + 1 + '';
    });

    return (
      <div className="col-md-12">
        <Table
          columns={tableColumns}
          data={children}
        />
      </div>

    );
  },

  _handleClick(e) {
    const {disabled, onClick} = this.props;

    e.preventDefault();
    !disabled && onClick(e);
  },


});

//const TableRender = renderContainer(BaseTableRender);

//export {BaseTableRender};
export default TableRender;
