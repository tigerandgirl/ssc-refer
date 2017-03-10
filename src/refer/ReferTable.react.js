'use strict';

import {pick,filter,noop} from 'lodash';
import React, {PropTypes} from 'react';

import Table from './Table.react';
import TableRender from './TableRender.react';

const ReferTable = React.createClass({
  displayName: 'ReferTable',

  /**
   * In addition to the propTypes below, the following props are automatically
   * passed down by `Typeahead`:
   *
   *  - labelKey
   *  - onPaginate
   *  - options
   *  - paginate
   *  - text
   */
  propTypes: {
    /**
     * Provides the ability to specify a prefix before the user-entered text to
     * indicate that the selection will be new. No-op unless `allowNew={true}`.
     */
    newSelectionPrefix: PropTypes.string,
    /**
     * Provides a hook for customized rendering of menu item contents.
     */
    onClickItem: PropTypes.func,
  },

  getDefaultProps() {
    return {
      newSelectionPrefix: 'New selection: ',
      onClickItem: noop,
    };
  },


  render() {
    const menuProps = pick(this.props, [
      'align',
      'className',
      'dropup',
      'emptyLabel',
      'maxHeight',
      'onPaginate',
      'paginate',
      'paginationText',
      'style',
    ]);

    const {options} =  this.props;

    return (
      <Table {...menuProps}>
        {this._renderTable(options)}
      </Table>
    );
  },

  _renderTable(options){
    const { tableColumns } = this.props;


    const tableProps = {
      tableColumns,
    }

    return (
      <TableRender onClickItem={this._handleClickItem} {...tableProps}>
        {options}
      </TableRender>
    );

  },

  _handleClickItem(record) {
    const {onClickItem} = this.props;
    onClickItem(record);
  },


});

export default ReferTable;
