'use strict';

import cx from 'classnames';
import {find, isEqual, noop, throttle, forEach, isArray, remove as _remove} from 'lodash';
import onClickOutside from 'react-onclickoutside';
import React, {PropTypes} from 'react';
import {Popover, OverlayTrigger} from 'react-bootstrap';

import ClearButton from './ClearButton.react';
import Loader from './Loader.react';
import Overlay from './Overlay.react';
import TokenizerInput from './TokenizerInput.react';
import TypeaheadInput from './TypeaheadInput.react';
import TypeaheadMenu from './TypeaheadMenu.react';

import ReferList from './ReferList.react';
import ReferTable from './ReferTable.react';
import ReferTreeTable from './ReferTreeTable.react';

import addCustomOption from './utils/addCustomOption';
import defaultFilterBy from './utils/defaultFilterBy';
import getHintText from './utils/getHintText';
import getInputText from './utils/getInputText';
import getOptionLabel from './utils/getOptionLabel';
import getTruncatedOptions from './utils/getTruncatedOptions';
import warn from './utils/warn';

import request from 'superagent';

import {DOWN, ESC, RETURN, TAB, UP} from './utils/keyCode';



/**
 * Refer
 */
const Refers = React.createClass({
  displayName: 'Refers',

  propTypes: {
    /**
     * Allows the creation of new selections on the fly. Note that any new items
     * will be added to the list of selections, but not the list of original
     * options unless handled as such by `Typeahead`'s parent.
     */
    allowNew: PropTypes.bool,
    /**
     * Autofocus the input when the component initially mounts.
     */
    autoFocus: PropTypes.bool,
    /**
     * Whether to render the menu inline or attach to `document.body`.
     */
    bodyContainer: PropTypes.bool,
    /**
     * Whether or not filtering should be case-sensitive.
     */
    caseSensitive: PropTypes.bool,
    /**
     * Displays a button to clear the input when there are selections.
     */
    clearButton: PropTypes.bool,
    /**
     * Specify any pre-selected options. Use only if you want the component to
     * be uncontrolled.
     */
    defaultSelected: PropTypes.array,
    /**
     * Specify whether the menu should appear above the input.
     */
    dropup: PropTypes.bool,
    /**
     * Either an array of fields in `option` to search, or a custom filtering
     * callback.
     */
    filterBy: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string.isRequired),
      PropTypes.func,
    ]),
    /**
     * Whether the filter should ignore accents and other diacritical marks.
     */
    ignoreDiacritics: PropTypes.bool,
    /**
     * Indicate whether an asynchromous data fetch is happening.
     */
    /**
     * Indicate whether an asynchromous data fetch is happening.
     */
    isLoading: PropTypes.bool,
    /**
     * Specify the option key to use for display or a function returning the
     * display string. By default, the selector will use the `label` key.
     */
    labelKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    /**
     * Maximum number of results to display by default. Mostly done for
     * performance reasons so as not to render too many DOM nodes in the case of
     * large data sets.
     */
    maxResults: PropTypes.number,
    /**
     * Number of input characters that must be entered before showing results.
     */
    minLength: PropTypes.number,
    /**
     * Whether or not multiple selections are allowed.
     */
    multiple: PropTypes.bool,
    /**
     * Callback fired when the input is blurred. Receives an event.
     */
    onBlur: PropTypes.func,
    /**
     * Callback fired whenever items are added or removed. Receives an array of
     * the selected options.
     */
    onChange: PropTypes.func,
    /**
     * Callback fired when the input is focused. Receives an event.
     */
    onFocus: PropTypes.func,
    /**
     * Callback for handling changes to the user-input text.
     */
    onInputChange: PropTypes.func,
    /**
     * Give user the ability to display additional results if the number of
     * results exceeds `maxResults`.
     */
    paginate: PropTypes.bool,
    /**
     * Callback for custom menu rendering.
     */
    renderMenu: PropTypes.func,
    /**
     * The selected option(s) displayed in the input. Use this prop if you want
     * to control the component via its parent.
     */
    selected: PropTypes.array,
    /**
     * set refer data url ,for example `http://YOURHOST/queryRefJSON`
     */
    referDataUrl: PropTypes.string.isRequired,
    /**
     * set refOptions ,for example `{"refCode":"dept","refType":"tree","rootName":"部门"}`
     */
    referConditions: PropTypes.object.isRequired,
    /**
     * Is debug mode.
     */
    requestHeader: PropTypes.object,
    /**
     * set refer type, for example: list, cascader, table, treetable, default type is list.
     */
    referType: PropTypes.string.isRequired,
    /**
     * set custom columns for table display, for example `[{"field":"name", "label":"名称"},{"field":"code","label":"编码"},{"field":"addr","label":"地址"}]`
     */
    tableColumns: PropTypes.array,
    /**
     * Is debug mode.
     */
    debugMode: PropTypes.bool,

  },

  getDefaultProps() {
    return {
      allowNew: false,
      autoFocus: false,
      bodyContainer: false,
      caseSensitive: false,
      clearButton: false,
      defaultSelected: [],
      dropup: false,
      filterBy: [],
      ignoreDiacritics: true,
      isLoading: false,
      labelKey: 'label',
      maxResults: 100,
      minLength: 0,
      multiple: false,
      onBlur: noop,
      onChange: noop,
      onFocus: noop,
      onInputChange: noop,
      paginate: true,
      selected: [],
      referDataUrl: "http://10.3.14.239/ficloud/refbase_ctr/queryRefJSON",
      referConditions: {},
      requestHeader: {},
      referType: 'list',
      debugMode:false,
    };
  },

  childContextTypes: {
    activeIndex: PropTypes.number.isRequired,
    onActiveItemChange: PropTypes.func.isRequired,
    onInitialItemChange: PropTypes.func.isRequired,
    onMenuItemClick: PropTypes.func.isRequired,
  },

  getChildContext() {
    return {
      activeIndex: this.state.activeIndex,
      onActiveItemChange: this._handleActiveItemChange,
      onInitialItemChange: this._handleInitialItemChange,
      onMenuItemClick: this._handleAddOption,
    };
  },

  getInitialState() {
    const {defaultSelected, maxResults} = this.props;

    let selected = this.props.selected.slice();
    if (defaultSelected && defaultSelected.length) {
      selected = defaultSelected;
    }

    return {
      activeIndex: -1,
      activeItem: null,
      initialItem: null,
      selected,
      showMenu: false,
      shownResults: maxResults,
      text: '',
      isAbove: true,
      responseData: [],
      styleStatus: {position: 'relative'},
    };
  },

  componentWillMount() {
    const {
      allowNew,
      labelKey,
    } = this.props;

    warn(
      !(typeof labelKey === 'function' && allowNew),
      '`labelKey` must be a string if creating new options is allowed.'
    );
  },

  componentDidMount() {
    this.props.autoFocus && this.focus();
  },

  componentWillReceiveProps(nextProps) {
    const {multiple, selected} = nextProps;
    if (!isEqual(selected, this.props.selected)) {
      // If new selections are passed in via props, treat the component as a
      // controlled input.
      this.setState({selected});
    }

    if (multiple !== this.props.multiple) {
      this.setState({text: ''});
    }
  },

  render() {
    const {allowNew, className, dropup, labelKey, paginate} = this.props;
    const {shownResults, text} = this.state;


    // First filter the results by the input string.
    let results = this._getFilteredResults();


    // This must come before we truncate.
    const shouldPaginate = paginate && results.length > shownResults;

    // Truncate if necessary.
    if (shouldPaginate) {
      results = getTruncatedOptions(results, shownResults);
    }

    // Add the custom option.
    if (allowNew) {
      results = addCustomOption(results, text, labelKey);
    }

    return (
      <div
        className={cx('bootstrap-typeahead', 'open', {
          'dropup': dropup,
        }, className)}
        style={this.state.styleStatus}>
        {this._renderInput(results)}
        {this._renderAux()}
        {this._renderMenu(results, shouldPaginate)}
      </div>
    );
  },
  
  _getFilteredResults() {
    const {
      caseSensitive,
      filterBy,
      ignoreDiacritics,
      labelKey,
      minLength,
      multiple,
    } = this.props;
    const {selected, text} = this.state;

    if (text.length < minLength) {
      return [];
    }

    const callback = Array.isArray(filterBy) ?
      option => defaultFilterBy(
        option,
        text,
        labelKey,
        multiple && !!find(selected, o => isEqual(o, option)),
        {caseSensitive, ignoreDiacritics, fields: filterBy}
      ) :
      option => filterBy(option, text);

    return this.state.responseData.filter(callback);
  },

  getFilteredSelected(responseData,selectedData) {
    let result;
    result = responseData.filter(function(item){
      let tempFlag = false;
      selectedData.map((obj) => {
        if(isEqual(item,obj)) tempFlag = true;
      })
      return !tempFlag;
    })
    return result;
  },

  _loadData() {
    const {referDataUrl,referConditions,requestHeader,debugMode,selected} = this.props;
    let _this = this;

    request.post(referDataUrl)
      .set(requestHeader)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(referConditions))
      .end(function (err,res) {
        if(err || !res.ok) {
          if(debugMode) console.log('network error!' + err)

        } else {
          let data = JSON.parse(res.text);
          if(data['success']===undefined) {
            if(debugMode) console.log('response data format is error,for example: no success key');
            return false;
          }

          if(!data['success']) {
            if(debugMode) console.log('response data success is false' + data['message']);
          } else {
            if(isArray(data.data) && data.data.length>0) {
              
              _this.setState({responseData: _this.getFilteredSelected(data.data,selected)});
            } else {
              if(debugMode) console.log('Message:' + 'Data format error, maybe no data !');
            }
          }

        }

      });
  },

  blur() {
    this.refs.input.blur();
    this._hideDropdown();
  },

  /**
   * Public method to allow external clearing of the input. Clears both text
   * and selection(s).
   */
  clear() {
    const {activeIndex, activeItem, showMenu} = this.getInitialState();
    const selected = [];
    const text = '';

    this.setState({
      activeIndex,
      activeItem,
      selected,
      showMenu,
      text,
    });

    this.props.onChange(selected);
    this.props.onInputChange(text);
  },

  focus() {
    this.refs.input.focus();
  },

  getData() {
    return this.state.selected;
  },

  getInputTextValue() {
    const {
      bsSize,
      disabled,
      labelKey,
      minLength,
      multiple,
      name,
      placeholder,
      renderToken,
    } = this.props;

    const {activeIndex, activeItem, initialItem, selected, text} = this.state;
    return getInputText({activeItem, labelKey, multiple, selected, text});
  },

  hideRefers() {
    this.setState({
      styleStatus: {display: 'none'}
    })
  },

  showRefers() {
    this.setState({
      styleStatus: {position: 'relative'}
    })
  },

  _renderInput(results) {
    const {
      bsSize,
      disabled,
      labelKey,
      minLength,
      multiple,
      name,
      placeholder,
      renderToken,
    } = this.props;
    const {activeIndex, activeItem, initialItem, selected, text} = this.state;
    const Input = multiple ? TokenizerInput : TypeaheadInput;
    const inputProps = {bsSize, disabled, name, placeholder, renderToken};

    return (
      <div className="input-group">
          <Input
            {...inputProps}
            activeIndex={activeIndex}
            activeItem={activeItem}
            hasAux={!!this._renderAux()}
            hintText={getHintText({
              activeItem,
              initialItem,
              labelKey,
              minLength,
              selected,
              text,
            })}
            initialItem={initialItem}
            labelKey={labelKey}
            onAdd={this._handleAddOption}
            onBlur={this._handleBlur}
            onChange={this._handleTextChange}
            onFocus={this._handleFocus}
            onKeyDown={e => this._handleKeydown(results, e)}
            onRemove={this._handleRemoveOption}
            options={results}
            ref="input"
            selected={selected.slice()}
            value={getInputText({activeItem, labelKey, multiple, selected, text})}
          />
        <span className="input-group-addon cursor-style" onClick={this._handleFocus}>
          <span className="glyphicon glyphicon-search" ></span>
        </span>
      </div>
    );
  },


  _renderMenu(results, shouldPaginate) {
    const {
      align,
      bodyContainer,
      dropup,
      emptyLabel,
      labelKey,
      maxHeight,
      minLength,
      newSelectionPrefix,
      paginationText,
      renderMenu,
      renderMenuItemChildren,
      referType,
      tableColumns,
    } = this.props;

    const {showMenu, text} = this.state;

    const menuProps = {
      align,
      dropup,
      emptyLabel,
      labelKey,
      maxHeight,
      newSelectionPrefix,
      paginationText,
      onPaginate: this._handlePagination,
      paginate: shouldPaginate,
      text,
      tableColumns,
    };

    const list = renderMenu ?
      renderMenu(results, menuProps) :
      <TypeaheadMenu
        {...menuProps}
        options={results}
        renderMenuItemChildren={renderMenuItemChildren}
      />;

    let typeObj = noop;
    switch (referType) {
      case  'list':
        typeObj= list;
        break;
      case 'cascader':
        const cascader = renderMenu ?
          renderMenu(results, menuProps) :
          <ReferList
            {...menuProps}
            options={results}
            renderMenuItemChildren={renderMenuItemChildren}
          />;
        typeObj= cascader;
        break;
      case  'table':
        const table = renderMenu ?
          renderMenu(results, menuProps) :
          <ReferTable
            {...menuProps}
            options={results}
            onClickItem={this._handleAddOption}
          />;
        typeObj= table;
        break;
      case 'treetable':
        const treetable = renderMenu ?
          renderMenu(results, menuProps) :
          <ReferTreeTable
            {...menuProps}
            options={results}
            onClickItem={this._handleAddOption}
          />;
        typeObj= treetable;
        break;
      default:
        typeObj= list;
    }

    return (
      <Overlay
        container={bodyContainer ? document.body : this}
        show={showMenu && text.length >= minLength}
        target={() => this.refs.input}>
        {typeObj}
      </Overlay>
    );
  },

  _renderAux() {
    const {bsSize, clearButton, disabled, isLoading} = this.props;

    if (isLoading) {
      return <Loader bsSize={bsSize} />;
    }

    if (clearButton && !disabled && this.state.selected.length) {
      return (
        <ClearButton
          bsSize={bsSize}
          className="bootstrap-typeahead-clear-button"
          onClick={this.clear}
        />
      );
    }
  },

  _handleActiveItemChange(activeItem) {
    this.setState({activeItem});
  },

  _handleBlur(e) {
    // Note: Don't hide the menu here, since that interferes with other actions
    // like making a selection by clicking on a menu item.
    if(this.props.onBlur) {
      this.props.onBlur(e);
    }

  },

  _handleFocus(e) {
    this.props.onFocus(e);
    const{multiple} = this.props;
    if(!multiple) {
      // this.clear();
    }
    this._loadData();
    this.setState({showMenu: true});
  },

  _handleInitialItemChange(initialItem) {
    const currentItem = this.state.initialItem;

    if (!currentItem) {
      this.setState({initialItem});
      return;
    }

    const {labelKey} = this.props;

    // Don't update the initial item if it hasn't changed. For custom items,
    // compare the `labelKey` values since a unique id is generated each time,
    // causing the comparison to always return false otherwise.
    if (
      isEqual(initialItem, currentItem) ||
      (initialItem.customOption &&
      initialItem[labelKey] === currentItem[labelKey])
    ) {
      return;
    }

    this.setState({initialItem});
  },

  _handleTextChange(text) {
    const {activeIndex, activeItem} = this.getInitialState();
    this.setState({
      activeIndex,
      activeItem,
      showMenu: true,
      text,
    });

    this.props.onInputChange(text);
  },

  _handleChange(text, e) {
    this._handleTextChange(text);
    this.props.onChange(e);
  },

  _handleKeydown(options, e) {
    const {activeItem, showMenu} = this.state;

    switch (e.keyCode) {
      case UP:
      case DOWN:
        // Don't cycle through the options if the menu is hidden.
        if (!showMenu) {
          return;
        }

        let {activeIndex} = this.state;

        // Prevents input cursor from going to the beginning when pressing up.
        e.preventDefault();

        // Increment or decrement index based on user keystroke.
        activeIndex += e.keyCode === UP ? -1 : 1;

        // If we've reached the end, go back to the beginning or vice-versa.
        if (activeIndex === options.length) {
          activeIndex = -1;
        } else if (activeIndex === -2) {
          activeIndex = options.length - 1;
        }

        const newState = {activeIndex};
        if (activeIndex === -1) {
          // Reset the active item if there is no active index.
          newState.activeItem = null;
        }

        this.setState(newState);
        break;
      case ESC:
      case TAB:
        // Prevent closing dialogs.
        e.keyCode === ESC && e.preventDefault();

        this._hideDropdown();
        break;
      case RETURN:
        // Prevent submitting forms.
        e.preventDefault();

        if (showMenu) {
          activeItem && this._handleAddOption(activeItem);
        }
        break;
    }
  },

  _handleAddOption(selectedOption) {
    const {multiple, labelKey, onChange, onInputChange} = this.props;

    let selected;
    let text;

    if (multiple) {
      // If multiple selections are allowed, add the new selection to the
      // existing selections.
      selected = this.state.selected.concat(selectedOption);
      text = '';
    } else {
      // If only a single selection is allowed, replace the existing selection
      // with the new one.
      selected = [selectedOption];
      text = getOptionLabel(selectedOption, labelKey);
    }

    this.setState({
      initialItem: selectedOption,
      selected,
      text,
    });
    this._hideDropdown();
    onChange(selected);
    onInputChange(text);
  },

  _handlePagination(e) {
    let shownResults = this.state.shownResults + this.props.maxResults;

    // Keep the input focused when paginating.
    this.focus();

    this.setState({shownResults});
  },

  _handleRemoveOption(removedOption) {
    let selected = this.state.selected.slice();
    selected = selected.filter(option => !isEqual(option, removedOption));

    // Make sure the input stays focused after the item is removed.
    this.focus();

    this.setState({selected});
    this._hideDropdown();

    this.props.onChange(selected);
  },

  /**
   * From `onClickOutside` HOC.
   */
  handleClickOutside(e) {
    this.state.showMenu && this._hideDropdown();
  },

  _hideDropdown() {
    const {
      activeIndex,
      activeItem,
      showMenu,
      shownResults,
    } = this.getInitialState();

    this.setState({
      activeIndex,
      activeItem,
      showMenu,
      shownResults,
    });
  },
});

export default onClickOutside(Refers);
