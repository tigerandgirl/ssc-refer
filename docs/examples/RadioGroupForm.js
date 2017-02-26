var RadioGroupExample = React.createClass({
    getInitialState: function () {
            return {selectedValue: '小米'};
    },

    componentDidMount: function () {
        // Add orange and remove watermelon after 5 seconds
    },
    
    handleChange(value) {
        alert(value);
        this.setState({selectedValue: value});
    },

    render: function () {
        // the checkboxes can be arbitrarily deep. They will always be fetched and
        // attached the `name` attribute correctly. `value` is optional
        return (
          <RadioGroup
            name="公司"
            selectedValue={this.state.selectedValue}
            onChange={this.handleChange} >
              <label>
                  <Radio value="苹果" />苹果
              </label>
              <label>
                  <Radio value="小米" />小米
              </label>
              <label>
                  <Radio value="华为" />华为
              </label>
          </RadioGroup>
        );
    }

});


ReactDOM.render(<RadioGroupExample />, mountNode);
