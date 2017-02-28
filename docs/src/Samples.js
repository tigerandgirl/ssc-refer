/* eslint no-path-concat: 0, no-var: 0, key-spacing: 0 */

export default {
  ReferBasic:                    require('fs').readFileSync(__dirname + '/../examples/ReferBasic.js', 'utf8'),
  ReferComp:                    require('fs').readFileSync(__dirname + '/../examples/ReferComp.js', 'utf8'),
  ReferTree:                    require('fs').readFileSync(__dirname + '/../examples/ReferTree.js', 'utf8'),
};
