/**
 * Created by Tiger on 17/2/15.
 */

const defaultData =   [{"id":"0039FB6F-7E72-455D-A7A3-189B6A5698F5","code":"0301","name":"市场部","pid":"22EA0EB9-FABA-4224-B290-5D041A1DF773","isLeaf":"true"}];

const multiple = true;

const referConditions = {'refCode': 'dept','refType': 'table','displayFields': ['code','name','id']};
const referDataUrl = 'http://172.20.4.220/refbase_ctr/queryRefJSON';
// const requestHeader = {'thd_secureKey': 'ssc_fi_dev','thd_tenantId': 'q46yu5wz','thd_usercode': 'wanghuap2','thd_appId': '123',};

const ReferExample = React.createClass({
  getInitialState() {
    return {
      disabled: false,
      dropup: true,
      minLength: 0,
      align: 'justify',
    };
  },

  render() {

    return (
      <div>
        <Refers
          emptyLabel={''}
          labelKey="name"
          onChange={this._handleChange}
          onBlur={this._handleBlur}
          placeholder="请选择..."
          referConditions={referConditions}
          referDataUrl={referDataUrl}
          referType="list"
          selected={defaultData}
          ref={ref => this._listrefers = ref}
          multiple={multiple}
          debugMode={true}
          renderMenuItemChildren={this._renderMenuItemChildren}
        />

      </div>
    );
  },

  _handleChange(selected) {
    console.log('oncliclk' + JSON.stringify(selected));
  },
  _handleBlur(e) {
    // alert(888);
    // console.log('blurblurblur'+e);
    // console.log(JSON.stringify(this._myrefers.getInstance().getInputTextValue())); //获取输入框里当前输入的值
    // console.log(JSON.stringify(this._myrefers.getInstance().clear()); //清除
    // console.log(JSON.stringify(this._myrefers.getInstance().getData())); //获取当前选中项
    // console.log(JSON.stringify(this._myrefers.getInstance().hideRefers)); //显示参照
    // this._listrefers.getInstance().hideRefers();

  },
  _renderMenuItemChildren(option, props, index) {
    return [
      <strong key="name">{option.name}</strong>,
      <div key="code">
        Code: {option.code}
      </div>,
    ];
  }



});

ReactDOM.render(<ReferExample />, mountNode);

