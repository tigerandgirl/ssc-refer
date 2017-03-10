'use strict';

import cx from 'classnames';
import {noop} from 'lodash';
import React, {PropTypes} from 'react';

import Table from 'bee-table';

//import renderContainer from '../containers/renderContainer';


const TableRender = React.createClass({
  displayName: 'TableRender',

  propTypes: {
    /**
     * callback sub component onClick event
     */
    onClickItem: PropTypes.func,
  },

  getDefaultProps() {
    return {
      onClick: noop,
      onClickItem: noop,
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
          useFixedHeader={true}
          scroll={{x:true,y:400}}
          emptyText={() => '加载中...'}
          columns={tableColumns}
          data={children}
          onRowClick={this._handleClick}
        />
      </div>

    );
  },

  _handleClick(record,index,e) {
    const {disabled, onClickItem} = this.props;
    e.preventDefault();
    !disabled && onClickItem(record);
  },


});

// const TableRender = renderContainer(BaseTableRender);

// export {BaseTableRender};
export default TableRender;
