/**
 * Created by Tiger on 17/2/15.
 */

const defaultData =   [{
  "id": "02EDD0F9-F384-43BF-9398-5E5781DAC5D0",
  "code": "0502",
  "name": "三车间",
  "pid": "",
  "isLeaf": "true"
}];

const multiple = false;

const referConditions = {"refCode":"user","refType":"table","displayFields":["code","name","email"]};
const referDataUrl = "http://20.1.75.51:8080/ficloud/refbase_ctr/queryRefJSON";
const requestHeader = {"thd_secureKey":"ssc_fi_dev","thd_tenantId":"q46yu5wz","thd_usercode":"wanghuap2","thd_appId":"123",};

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
    const {emptyLabel} = this.state;

    return (
      <div>
        <Refers
          {...this.state}
          emptyLabel={''}
          labelKey="name"
          onChange={this._handleChange}
          onBlur={this._handleBlur}
          placeholder="请选择..."
          referConditions={referConditions}
          referDataUrl={referDataUrl}
          requestHeader={requestHeader}
          referType="list"
          defaultSelected={defaultData}
          ref={ref => this._myrefers = ref}
          multiple={multiple}
          debugMode={false}
        />

      </div>
    );
  },

  _handleChange(selected) {
   // console.log('oncliclk'+JSON.stringify(selected));
  },
  _handleBlur(e) {
    // console.log('blurblurblur'+e);
    // console.log(JSON.stringify(this._myrefers.getInstance().getInputTextValue())); //获取输入框里当前输入的值
    // console.log(JSON.stringify(this._myrefers.getInstance().clear()); //清除
    // console.log(JSON.stringify(this._myrefers.getInstance().getData())); //获取当前选中项
    // console.log(JSON.stringify(this._myrefers.getInstance().hideRefers)); //隐藏参照
    // console.log(JSON.stringify(this._myrefers.getInstance().hideRefers)); //显示参照

  },
  


});

ReactDOM.render(<ReferExample />, mountNode);

