/**
 * Created by Tiger on 17/2/15.
 */

const treeData = [
  {
    pid: '',
    id: 'virual_root',
    name: '部门',
    code: 'root',
    isLeaf: false
  },
  {
    id: '01E4EFC6-9A47-42DD-91AF-EA42EF9127E7',
    code: '214',
    name: '情人节快乐12341aaa',
    pid: 'virual_root',
    isLeaf: true
  },
  {
    id: '1FDB9132-68BD-4403-BED9-819DD0EDE1E8',
    code: 'xxdebug123',
    name: 'SSC',
    pid: 'virual_root',
    isLeaf: true
  },
  {
    id: '01E4EFC6-9A47-42DD-91AF-EA42EF9127E2',
    code: '214',
    name: 'AAA',
    pid: 'virual_root',
    isLeaf: true
  },
  {
    id: '1FDB9132-68BD-4403-BED9-819DD0EDE1E0',
    code: 'xxdebug123',
    name: 'DDD',
    pid: 'virual_root',
    isLeaf: true
  }
];


const ReferExample = React.createClass({
  getInitialState() {
    return {
    };
  },

  handleChange(value,event) {
    //alert(JSON.stringify(event));
    //alert(JSON.stringify(value));
  },

  render() {
    return (
      <Refer ref="myref" onChange={this.handleChange} sourceData={treeData} defaultData={treeData[0]} />
    );
  }

});

ReactDOM.render(<ReferExample />, mountNode);
