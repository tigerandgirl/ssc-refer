/**
 * Created by Tiger on 17/3/14.
 */

import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import { Button, Form, FormGroup, ControlLabel } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

// 表单(form)控件(control/widget)
import { FormControl, Checkbox } from 'react-bootstrap';

export default class VoucherMoreConditions extends Component {
  static propTypes = {
    fieldsModel: PropTypes.array.isRequired,
    defaultData: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
  }

  state = {
    formData: {...this.props.defaultData},
    fieldsValidationState: {},
  }

  constructor(props) {
    super(props);
  }

  handleChange(fieldId, event, validationState) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;

    const newState = {
      formData: this.state.formData
    };
    newState.formData[fieldId] = value;
    this.setState(newState);

    // undefined/null都不代表失败
    this.setState(update(this.state, {
      fieldsValidationState: {
        [fieldId]: {
          $set: !(validationState === false)
        }
      }
    }));

    if (this.props.onChange) {
      this.props.onChange(fieldId, value, {
        event
      });
    }
  }

  handleSubmit(event) {
    if (this.props.onSubmit) {
      this.props.onSubmit(event, this.state.formData);
    }
  }

  handleReset(event) {
    if (this.props.onReset) {
      this.props.onReset(event);
    }
  }

  calcAllFieldsValidationState(fieldsValidationState) {
    let result = true;
    let fieldId;
    for (fieldId in fieldsValidationState) {
      if (fieldsValidationState.hasOwnProperty(fieldId)) {
        result = fieldsValidationState[fieldId] && result;
      }
    }
    return result;
  }

  render() {
    const { fieldsModel, className } = this.props;
    return (
      <form horizontal className={classNames(className)}>
        
        <FormGroup>
          <Col sm={12} className={'text-center'}>
            <Button bsStyle="info" onClick={this.handleReset.bind(this)} type="reset">
              取消
            </Button>
            <Button bsStyle="info" onClick={this.handleSubmit.bind(this)}
                    type="submit" disabled={!this.calcAllFieldsValidationState(this.state.fieldsValidationState)}
            >完成</Button>
          </Col>
        </FormGroup>
      </form>

    );

  }


}
