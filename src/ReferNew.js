import React, { Component } from 'react';
import { FormGroup, InputGroup, FormControl, Glyphicon, Popover, OverlayTrigger } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import fetch from 'isomorphic-fetch';

/**
 * TreeRefer组件
 *
 * Options: https://datatables.net/reference/option/
 *
 * http://adazzle.github.io/react-data-grid
 *
 */

class ReferNew extends Component {

  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
  }

  render() {
    const popoverFocus = (
      <Popover id="popover-trigger-focus" title="Popover bottom">
        <strong>refer container refer containerrefer containerrefer containerrefer containerrefer containerrefer container</strong> Check this info.
      </Popover>
    );
    return (
       <div>
          <FormGroup>
            <OverlayTrigger trigger="focus" placement="bottom" overlay={popoverFocus}>
              <InputGroup>
                <FormControl type="text" />
                <InputGroup.Addon>
                  <Glyphicon glyph="search" />
                </InputGroup.Addon>
              </InputGroup>
            </OverlayTrigger>
          </FormGroup>

          <AsyncTypeahead
            labelKey="login"
            onSearch={this._handleSearch}
            options={this.state.options}
            placeholder="Search for a Github user..."
            renderMenuItemChildren={(option) => (
              <div>
                <img
                  src={option.avatar_url}
                  style={{
                    height: '24px',
                    marginRight: '10px',
                    width: '24px',
                      }}
                />
                <span>{option.login}</span>
              </div>
            )}
          />
       </div>
    );
  }
  _handleSearch = (query) =>{
    if (!query) {
      return;
    }

    fetch(`https://api.github.com/search/users?q=${query}`)
      .then(resp => resp.json())
      .then(json => this.setState({options: json.items}));
  }
}

export default ReferNew;
