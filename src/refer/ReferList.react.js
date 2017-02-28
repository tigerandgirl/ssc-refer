'use strict';

import {pick} from 'lodash';
import Highlight from 'react-highlighter';
import React, {PropTypes} from 'react';

import List from './List.react';
import MenuItem from './MenuItem.react';

import getOptionLabel from './utils/getOptionLabel';

const MATCH_CLASS = 'bootstrap-typeahead-highlight';

const ReferList = React.createClass({
  displayName: 'ReferList',

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

    return (
      <List {...menuProps}>
        {this.props.options.map(this._renderMenuItem)}
      </List>
    );
  },

  _renderMenuItem(option, idx) {
    const {
      labelKey,
      newSelectionPrefix,
      renderMenuItemChildren,
      text,
    } = this.props;

    const menuItemProps = {
      disabled: option.disabled,
      key: idx,
      option,
      position: idx,
    };

    if (option.customOption) {
      return (
        <MenuItem {...menuItemProps}>
          {newSelectionPrefix}
          <Highlight matchClass={MATCH_CLASS} search={text}>
            {option[labelKey]}
          </Highlight>
        </MenuItem>
      );
    }

    return renderMenuItemChildren ?
      <MenuItem {...menuItemProps}>
        {renderMenuItemChildren(option, this.props, idx)}
      </MenuItem> :
      <MenuItem {...menuItemProps}>
        <Highlight matchClass={MATCH_CLASS} search={text}>
          {getOptionLabel(option, labelKey)}
        </Highlight>
      </MenuItem>;
  },
});

export default ReferList;
