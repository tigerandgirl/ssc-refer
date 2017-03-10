/* eslint no-path-concat: 0, no-var: 0, key-spacing: 0 */

export default {
  ReferList:                    require('fs').readFileSync(__dirname + '/../examples/ReferList.js', 'utf8'),
  ReferTable:                    require('fs').readFileSync(__dirname + '/../examples/ReferTable.js', 'utf8'),
  ReferTreeTable:                    require('fs').readFileSync(__dirname + '/../examples/ReferTreeTable.js', 'utf8'),
};
