'use strict';

import cx from 'classnames';
import {noop} from 'lodash';
import React from 'react';

import Table from 'bee-table';

import renderContainer from '../containers/renderContainer';


const BaseTableRender = React.createClass({
  displayName: 'BaseTableRender',

  getDefaultProps() {
    return {
      onClick: noop,
    };
  },

  render() {
    
    const {children, tableColumns} = this.props;
    children.forEach(function(item, index) {
      item.key = index + 1 + '';
    });

    return (
      <div className="col-md-12">
        <Table
          columns={tableColumns}
          data={children}
          onRowClick={this._handleClick}
        />
      </div>

    );
  },

  _handleClick(record,index,e) {
    const {disabled, onClick} = this.props;
    console.log(JSON.stringify(record));
    console.log(index);
    e.preventDefault();
    !disabled && onClick(e);
  },


});

const TableRender = renderContainer(BaseTableRender);

export {BaseTableRender};
export default TableRender;
