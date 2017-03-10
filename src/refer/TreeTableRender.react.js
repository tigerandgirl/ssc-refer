'use strict';

import cx from 'classnames';
import {noop} from 'lodash';
import React, {PropTypes} from 'react';

import TreeTable from 'bee-table';


const TreeTableRender = React.createClass({
  displayName: 'TreeTableRender',

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
        <TreeTable
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


export default TreeTableRender;
