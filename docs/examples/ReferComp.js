/**
 * Created by Tiger on 17/2/15.
 */

const ReferCompExample = React.createClass({
  getInitialState() {
    return {
      options: []
    };
  },

  _handleSearch(query){
    if (!query) {
      return;
    }

    fetch(`https://api.github.com/search/users?q=${query}`)
      .then(resp => resp.json())
      .then(json => this.setState({options: json.items}));
  },

  render() {
    return (
      <ReferComp
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
    );
  }

});

ReactDOM.render(<ReferCompExample />, mountNode);

