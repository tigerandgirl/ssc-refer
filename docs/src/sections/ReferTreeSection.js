import React from 'react';

import PropTable from '../PropTable';
import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ReferTreeSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="refertree">参照组件（树形参照组件）</Anchor> <small><code>&lt;ReferTree&gt;</code></small>
      </h2>

      <h3><Anchor id="refer-new">树形参照组件</Anchor></h3>
      <p>使用<code>referDataUrl</code>设置数据源地地。</p>
      <p>使用<code>referConditions</code>设置数据请求的参数,详见属性说明</p>
      <p>需要引用本模块样式，如<code>import from  'ssc-refer/css/referStyle.css';</code></p>

      <ReactPlayground codeText={Samples.ReferTree} />

      <h3><Anchor id="refer-props">属性</Anchor></h3>
      <PropTable component="Refers"/>
    </div>
  );
}
