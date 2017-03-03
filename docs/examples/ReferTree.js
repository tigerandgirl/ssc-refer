/**
 * Created by Tiger on 17/2/15.
 */



const refConditions = {"refCode":"dept","refType":"tree","rootName":"部门"};

const ReferTreeExample = React.createClass({
  getInitialState() {
    return {
      disabled: false,
      dropup: true,
      minLength: 0,
      align: 'justify',
    };
  },

  render() {
    const {emptyLabel} = this.state;

    return (
      <div>
        <Refers
          {...this.state}
          emptyLabel={emptyLabel ? '' : undefined}
          labelKey="name"
          multiple
          onChange={this._handleChange}
          placeholder="请选择..."
          refConditions={refConditions}
        />

      </div>
    );
  },

  _handleChange(selected) {
    alert(JSON.stringify(selected));
  },

});

ReactDOM.render(<ReferTreeExample />, mountNode);

