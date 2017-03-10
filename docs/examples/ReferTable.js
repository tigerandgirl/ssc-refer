/**
 * Created by Tiger on 17/2/15.
 */

const defaultData =   [{
  "id": "02EDD0F9-F384-43BF-9398-5E5781DAC5D0",
  "code": "0502",
  "name": "作老师",
  "pid": "",
  "isLeaf": "true"
}];

const multiple = true;

const columns = [
  { title: '名称', dataIndex: 'name', key: 'name', width: 100 },
  { title: '编码', dataIndex: 'code', key: 'code', width: 100 },
  { title: '邮箱', dataIndex: 'email', key: 'email', width: 200 },
]

const referConditions = {"refCode":"user","refType":"table","rootName":"部门","displayFields":["code","name","email"]};
const referDataUrl = "http://10.3.14.239/ficloud/refbase_ctr/queryRefJSON";

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
          emptyLabel={emptyLabel ? '' : undefined}
          labelKey="name"
          onChange={this._handleChange}
          onBlur={this._handleBlur}
          placeholder="请选择..."
          referConditions={referConditions}
          referDataUrl={referDataUrl}
          referType="table"
          defaultSelected={defaultData}
          ref={ref => this._myrefers = ref}
          multiple={multiple}
          tableColumns={columns}
        />

      </div>
    );
  },

  _handleChange(selected) {
    // console.log('oncliclk'+JSON.stringify(selected));
    // console.log('oncliclk'+JSON.stringify(e));
  },
  _handleBlur(e) {
    // console.log('blurblurblur'+e);
    //console.log(JSON.stringify(this._myrefers.getInstance().hideRefers()));
    
  },
  


});

ReactDOM.render(<ReferExample />, mountNode);

