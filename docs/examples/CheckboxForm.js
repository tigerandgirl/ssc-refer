var CheckboxExample = React.createClass({
    getInitialState: function () {
        return {
            componey: ['小米', '华为']
        };
    },

    componentDidMount: function () {
        // Add orange and remove watermelon after 5 seconds
    },

    render: function () {
        // the checkboxes can be arbitrarily deep. They will always be fetched and
        // attached the `name` attribute correctly. `value` is optional
        return (
            <CheckboxGroup
                name="公司"
                value={this.state.componey}
                onChange={this.componeyChanged}>

                <label><Checkbox value="苹果"/> 苹果</label>
                <label><Checkbox value="小米"/> 小米</label>
                <label><Checkbox value="华为"/> 华为</label>
            </CheckboxGroup>
        );
    },
    componeyChanged: function (items) {
        alert(JSON.stringify(items));
        this.setState({
            componey: items
        });
    }
});


ReactDOM.render(<CheckboxExample />, mountNode);
