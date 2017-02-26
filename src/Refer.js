import { FormGroup, FormControl } from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';

/**
 * Refer组件
 */

class Refer extends Component {
  static propTypes = {
    /**
     * 传入参照组件数据
     */
    sourceData: PropTypes.array.isRequired,
    /**
     * 参照中默认显示的数据
     */
    defaultData: PropTypes.object.isRequired,
    /**
     * Callback fired whenever items are added or removed. Receives an array of
     * the selected options.
     */
    onChange: PropTypes.func,
  };

  state = {
    selectedData: this.props.defaultData || null
  };

  constructor(props) {
    super(props);
  }

  onSearch(/* value */) {
    // console.log('onclick');
  }


  onSelect() {
    // use onChange instead
    // console.log(arguments);
  }

  getData() {
    return this.state.selectedData;
  }

  // simple form control包括：select
  handleSimpleFormCtrlChange(event) {
    const target = event.target;
    // const name = target.name;
    let tempState = this.props.sourceData.find(item => item.id === target.value);

    this.setState({selectedData: tempState});
    this.props.onChange(tempState);
  }

  render() {
    const { sourceData } = this.props;

    let formCtrl = (
        <FormControl componentClass="select" placeholder={'请选择'}
                     value={this.state.selectedData.id || null}
                     onChange={this.handleSimpleFormCtrlChange.bind(this)}

        >
          {sourceData.map((opt, index) => <option key={index} value={opt.id}>{opt.name}</option>)}
        </FormControl>
    );

    return (
        <FormGroup controlId="referGroup">
          {formCtrl}
        </FormGroup>
    );
  }
}

export default Refer;
