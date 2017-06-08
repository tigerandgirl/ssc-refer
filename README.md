# SSC-Refer2 [![Travis][build-badge]][build] [![AppVeyor][appveyor-badge]][appveyor] [![npm][npm-badge]][npm] [![Codecov][codecov-badge]][codecov]

SSC 3.0 Refer2组件


## 使用

```bash
npm install ssc-refer2 --save
```

```jsx
import { Refers } from 'ssc-refer2';
...

handleChange(selected) {
 console.log('oncliclk'+JSON.stringify(selected));
}

handleBlur(e) {
  // alert(888);
  // console.log('blurblurblur'+e);
  // console.log(JSON.stringify(this._myrefers.getInstance().getInputTextValue())); //获取输入框里当前输入的值
  // console.log(JSON.stringify(this._myrefers.getInstance().clear()); //清除
  // console.log(JSON.stringify(this._myrefers.getInstance().getData())); //获取当前选中项
  // console.log(JSON.stringify(this._myrefers.getInstance().hideRefers)); //显示参照
  // this._listrefers.getInstance().hideRefers();

}

renderMenuItemChildren(option, props, index) {
  return [
    <strong key="name">{option.name}</strong>,
    <div key="code">
      Code: {option.code}
    </div>,
  ];
}

render() {
  const defaultData =   [];
  const referConditions = {"refCode":"dept","refType":"table","displayFields":["code","name","email"]};
  const referDataUrl = "http://127.0.0.1:3009/refbase_ctr/queryRefJSON";

  return (
    <Refers
      emptyLabel=""
      labelKey="name"
      onChange={this.handleChange}
      onBlur={this.handleBlur}
      placeholder="请选择..."
      referConditions={referConditions}
      referDataUrl={referDataUrl}
      referType="list"
      defaultSelected={defaultData}
      ref={(ref) => { this.listrefers = ref; }}
      multiple
      debugMode
      renderMenuItemChildren={this.renderMenuItemChildren}
    />
  );
}
```

## 文档

[API文档][documentation]中带有示例代码，并且可以在线编辑并运行代码。

[documentation]: https://ssc-refer2.github.io
[contributing]: CONTRIBUTING.md

[build-badge]: https://travis-ci.org/yyssc/ssc-refer2.svg?branch=master
[build]: https://travis-ci.org/yyssc/ssc-refer2

[npm-badge]: https://badge.fury.io/js/ssc-refer2.svg
[npm]: http://badge.fury.io/js/ssc-refer2

[codecov-badge]: https://img.shields.io/codecov/c/github/yyssc/ssc-refer2/master.svg
[codecov]: https://codecov.io/gh/yyssc/ssc-refer2

[appveyor-badge]: https://img.shields.io/appveyor/ci/yyssc/ssc-refer2/master.svg
[appveyor]: https://ci.appveyor.com/project/yyssc/ssc-refer2
