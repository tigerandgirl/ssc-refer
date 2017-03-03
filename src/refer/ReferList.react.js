'use strict';

import {pick,filter} from 'lodash';
import Highlight from 'react-highlighter';
import React, {PropTypes} from 'react';

import List from './List.react';
import ListItem from './ListItem.react';

import getOptionLabel from './utils/getOptionLabel';

import {Breadcrumb} from 'react-bootstrap';

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

  getInitialState() {
    const {options} = this.props;
    let defaultNav = filter(options,{"pid": ""});
    let defaultContent = filter(options,function (item) {return item.pid === defaultNav[0].id});

    return {
      navList: defaultNav,
      contentList: defaultContent,
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
        {this._renderNavBar(this.state.navList)}
        {this.state.contentList.map(this._renderListItem)}
      </List>
    );
  },

  _renderNavBar(dataList) {
    const navBar =
      <Breadcrumb>
        {
          dataList.map((item) => {
            return(
              <Breadcrumb.Item href="#">
                {item.name}
              </Breadcrumb.Item>
            );
          })
        }
    </Breadcrumb>;

    return navBar;
  },

  _renderListContent(dataList) {

    return (
        <div>
          <ul className="refer_list ul-list2">
            {
              dataList.map((item) => {
                return(
                  <li className="col-md-6 openLi">
                    <span className="hoverBackground">{item.name}</span>
                  </li>
                );
              })
            }
          </ul>
        </div>

    );
  },

  _renderListItem(option,idx) {
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
      className: 'col-md-6 openLi',
    };

    if (option.customOption) {
      return (
        <ListItem {...menuItemProps}>
          {newSelectionPrefix}
          <Highlight matchClass={MATCH_CLASS} search={text}>
            {option[labelKey]}
          </Highlight>
        </ListItem>
      );
    }

    return renderMenuItemChildren ?
      <ListItem {...menuItemProps}>
        {renderMenuItemChildren(option, this.props, idx)}
      </ListItem> :
      <ListItem {...menuItemProps}>
        <Highlight matchClass={MATCH_CLASS} search={text}>
          {getOptionLabel(option, labelKey)}
        </Highlight>
      </ListItem>;

  },

});

export default ReferList;
