/**
 * Created by Tiger on 17/2/15.
 */



const referConditions = {"refCode":"dept","refType":"tree","rootName":"部门"};
const referDataUrl = "http://10.3.14.239/ficloud/refbase_ctr/queryRefJSON";

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
          onChange={this._handleChange}
          onBlur={this._handleBlur}
          placeholder="请选择..."
          referConditions={referConditions}
          referDataUrl={referDataUrl}
          referType="list"
        />

      </div>
    );
  },

  _handleChange(selected) {
    // console.log(JSON.stringify(selected));
  },
  _handleBlur(e) {
    // console.log('blurblurblur'+JSON.stringify(e));
  },

});

ReactDOM.render(<ReferTreeExample />, mountNode);

