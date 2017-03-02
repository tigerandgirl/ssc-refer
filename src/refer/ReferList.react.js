'use strict';

import {pick,filter} from 'lodash';
import React, {PropTypes} from 'react';

import List from './List.react';

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
        {this._renderListContent(this.state.contentList)}
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

});

export default ReferList;
