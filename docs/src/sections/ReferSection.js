import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ReferSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="refer">Refer组件（参照组件）</Anchor> <small><code>&lt;Refer&gt;</code></small>
      </h2>

      <h3><Anchor id="refer-basic">简单参照</Anchor></h3>
      <p>使用<code>sourceData</code>参数可以往参照中传入数据。传入的数据格式参考 => <a href="http://git.yonyou.com/sscplatform/fc_doc/blob/master/RefBase" target="_blank">数据格式</a></p>
      <p>假设调用的Refer组件中定义了ref名称为 myref，可以使用如<code>{`this.refs.myref.getData()`}</code>取到当前参照选中的值</p>
      <p>导入方法：<code>{`import { Refer } from 'ssc-comp'`}</code></p>
      <ReactPlayground codeText={Samples.ReferBasic} />

      <h3><Anchor id="refer-props">属性</Anchor></h3>
      <PropTable component="Refer"/>
    </div>
  );
}
