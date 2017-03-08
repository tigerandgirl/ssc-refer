'use strict';

import {pick,filter} from 'lodash';
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
    renderMenuItemChildren: PropTypes.func,
  },

  getDefaultProps() {
    return {
      newSelectionPrefix: 'New selection: ',
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
    return (
      <TableRender>
        {options}
      </TableRender>
    );

  },


});

export default ReferTable;
