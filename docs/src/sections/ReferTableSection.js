import React from 'react';

import PropTable from '../PropTable';
import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ReferTableSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="refertable">参照组件（表格参照组件）</Anchor> <small><code>&lt;ReferTable&gt;</code></small>
      </h2>

      <h3><Anchor id="refer-table">表格参照组件</Anchor></h3>
      <p>使用<code>referDataUrl</code>设置数据源地地。</p>
      <p>使用<code>referConditions</code>设置数据请求的参数,详见属性说明</p>
      <p>使用<code>defaultSelected</code>设置默认值，值为一个json数组，当是单选时只有一个item,设置为多选时为多个</p>
      <p>需要引用本模块样式，如<code>import 'ssc-refer/css/referStyle.css';</code></p>

      <ReactPlayground codeText={Samples.ReferTable} />

    </div>
  );
}
