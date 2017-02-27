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
      <p>使用<code>sourceData</code>参数可以往参照中传入数据。</p>
      <ReactPlayground codeText={Samples.ReferTree} />

      <h3><Anchor id="refer-props">属性</Anchor></h3>
      <PropTable component="Refers"/>
    </div>
  );
}
