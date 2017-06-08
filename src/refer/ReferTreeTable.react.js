'use strict';

import {pick,filter,noop} from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

import TreeTable from './TreeTable.react';
import TreeTableRender from './TreeTableRender.react';

const ReferTreeTable = createReactClass({
  displayName: 'ReferTreeTable',

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
      <TreeTable {...menuProps}>
        {this._renderTable(options)}
      </TreeTable>
    );
  },

  _renderTable(options){
    const { tableColumns } = this.props;


    const tableProps = {
      tableColumns,
    }

    return (
      <TreeTableRender onClickItem={this._handleClickItem} {...tableProps}>
        {options}
      </TreeTableRender>
    );

  },

  _handleClickItem(record) {
    const {onClickItem} = this.props;
    onClickItem(record);
  },


});

export default ReferTreeTable;
