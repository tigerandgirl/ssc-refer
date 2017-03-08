'use strict';

import {pick,filter} from 'lodash';
import React, {PropTypes} from 'react';

import List from './List.react';
import ListItem from './ListItem.react';

import {Breadcrumb} from 'react-bootstrap';

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
    let defaultNav = filter(options,{"isLeaf": "false", pid: ""});
    let defaultContent = filter(options,function (item) {return true});

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
              <Breadcrumb.Item href="javascript:void(0)" onClick={this._handleChangeStatus} >
                {item.name}
              </Breadcrumb.Item>
            );
          })
        }
    </Breadcrumb>;

    return navBar;
  },

  _renderListItem(option,idx) {
    const {
      labelKey,
      renderMenuItemChildren,
    } = this.props;

    const menuItemProps = {
      disabled: option.disabled,
      key: idx,
      option,
      position: idx,
      className: 'col-md-6 openLi',
      labelKey,
    };

    return renderMenuItemChildren ?
      <ListItem {...menuItemProps}>
        {renderMenuItemChildren(option, this.props, idx)}
      </ListItem> :
      <ListItem changeStatus={this._handleChangeStatus} {...menuItemProps}>
        {option}
      </ListItem>;

  },
  _handleChangeStatus(option) {
    this._changeNav(option);
    this._changelist(option);

  },

  _changeNav(option) {
    let navList = this.state.navList;
    navList.push(option);
    this.setState({
      navList: navList
    })
  },

  _changelist(option) {
    const {options} = this.props;
    let currentList = filter(options,function (item) {return item.pid === option.id});
    this.setState({
      contentList: currentList
    })

  },

});

export default ReferList;
