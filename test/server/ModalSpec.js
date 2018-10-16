import {assert} from 'chai';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Refers from '../../src/refer/Refers.js';

const referConditions = {'refCode': 'user', 'refType': 'table', 'displayFields': ['code', 'name', 'email']};
const referDataUrl = 'http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON';

describe('Refers', () => {
  it('Should be rendered on the server side', () => {

    assert.doesNotThrow(function renderOnServerSide() {
      return ReactDOMServer.renderToString(
        <Refers
          labelKey="name"
          placeholder="请选择..."
          referConditions={referConditions}
          referDataUrl={referDataUrl}
          referType="list"
        />
      );
    });
  });
});
