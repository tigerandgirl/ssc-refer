/**
 * Created by Tiger on 17/2/22.
 */
import {debounce} from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_DELAY_MS = 200;

/**
 * HoC that encapsulates common behavior and functionality for doing
 * asynchronous searches, including:
 *
 *  - Debouncing user input
 *  - Query caching (optional)
 *  - Search prompt and empty results behaviors
 */
const referContainer = Refers => {
  let _cache = {};

  return React.createClass({
    propTypes: {
      /**
       * Delay, in milliseconds, before performing search.
       */
      delay: PropTypes.number,
      /**
       * Callback to perform when the search is executed.
       */
      onSearch: PropTypes.func.isRequired,
      /**
       * Options to be passed to the typeahead. Will typically be the query
       * results, but can also be initial default options.
       */
      options: PropTypes.array,
      /**
       * Text displayed in the menu when there is no user input.
       */
      promptText: PropTypes.string,
      /**
       * Text displayed in the menu while the request is pending.
       */
      searchText: PropTypes.string,
      /**
       * Whether or not the component should cache query results.
       */
      useCache: PropTypes.bool,
    },

    getDefaultProps() {
      return {
        delay: DEFAULT_DELAY_MS,
        minLength: 2,
        options: [],
        promptText: 'Type to search...',
        searchText: 'Searching...',
        useCache: true,
      };
    },

    getInitialState() {
      return {
        hasSelection: false,
        query: '',
        requestPending: false,
      };
    },

    componentWillMount() {
      this._handleSearchDebounced = debounce(
        this._handleSearch,
        this.props.delay
      );
    },

    componentWillReceiveProps(nextProps) {
      const {options, useCache} = nextProps;
      const {query, requestPending} = this.state;

      if (!requestPending) {
        return;
      }

      if (useCache) {
        _cache[query] = options;
      }

      this.setState({requestPending: false});
    },

    componentWillUnmount() {
      _cache = {};
    },

    render() {
      const {useCache, ...props} = this.props;
      const cachedQuery = _cache[this.state.query];

      return (
        <Refers
          {...props}
          emptyLabel={this._getEmptyLabel()}
          isLoading={this.state.requestPending}
          onChange={this._handleChange}
          onInputChange={this._handleInputChange}
          options={useCache && cachedQuery ? cachedQuery : this.props.options}
          ref={instance => this._instance = instance}
        />
      );
    },

    /**
     * Make the component instance available.
     */
    getInstance() {
      return this._instance.getInstance();
    },

    _getEmptyLabel() {
      const {emptyLabel, promptText, searchText, useCache} = this.props;
      const {hasSelection, query, requestPending} = this.state;

      if (!query.length || hasSelection) {
        return promptText;
      }

      if (requestPending || (useCache && !_cache[query])) {
        return searchText;
      }

      return emptyLabel;
    },

    _handleChange(selected) {
      this.props.onChange && this.props.onChange(selected);
      this.setState({hasSelection: !!selected.length});
    },

    _handleInputChange(query) {
      this.props.onInputChange && this.props.onInputChange(query);
      this._handleSearchDebounced(query);
    },

    _handleSearch(initialQuery) {
      const {caseSensitive, minLength, onSearch, useCache} = this.props;

      let query = initialQuery.trim();
      if (!caseSensitive) {
        query = query.toLowerCase();
      }

      this.setState({query});

      if (!query || (minLength && query.length < minLength)) {
        return;
      }

      // Use cached results, if available.
      if (useCache && _cache[query]) {
        return;
      }

      // Only perform a search on user input, not selection.
      if (this.state.hasSelection) {
        return;
      }

      // Perform the async search.
      this.setState({requestPending: true}, () => onSearch(query));
    },
  });
};

export default referContainer;
