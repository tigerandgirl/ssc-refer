'use strict';

import {pick} from 'lodash';
import Highlight from 'react-highlighter';
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

import Content from './Content';

import getOptionLabel from './utils/getOptionLabel';

const MATCH_CLASS = 'bootstrap-typeahead-highlight';

const ReferContent = createReactClass({
  displayName: 'ReferContent',

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
  },

  getDefaultProps() {
    return {
      newSelectionPrefix: 'New selection: ',
    };
  },

  render() {
    const contentProps = pick(this.props, [
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
      <Content {...contentProps}>
        <h>this is a content</h>
      </Content>
    );
  }
});

export default ReferContent;
