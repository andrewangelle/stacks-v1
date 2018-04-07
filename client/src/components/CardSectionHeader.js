import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, FormGroup, Input, Button, Collapse } from 'reactstrap';

export default class CardPageSectionHeader extends Component {
  static propTypes = {
    headerText: PropTypes.string.isRequired,
    formValue: PropTypes.string.isRequired,
    formVisible: PropTypes.bool.isRequired,
    handleFormChange: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired
  }

  state={
    formCollapse: true,
    contentVisible: true,
    formValue: ''
  }
  toggleForm() {
    this.setState({
      formCollapse: !this.state.formCollapse
    })
  }
  toggleContent() {
    this.setState({
      contentVisible: !this.state.contentVisible
    })
  }
  render() {
    const { headerText, handleFormSubmit, formValue, handleFormChange, formVisible, toggleForm } = this.props;
    return (
      <Card className='cardpage section-header'>
        <span style={{cursor: 'pointer'}}>
          <h5>{`${headerText}s:`}</h5>
        </span>
        <span
          onClick={() => toggleForm()}
          className='lists--add'
          >
          {`Add ${headerText}`}
        </span>

        <Collapse isOpen={formVisible}>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              handleFormSubmit(event);
              toggleForm();
            }}>
            <FormGroup>
              <Input
                onChange={(event) => handleFormChange(event)}
                type="text" placeholder="Add A List...."
                value={formValue}
              />
              <Button type='submit'>Save</Button>
            </FormGroup>
          </Form>
        </Collapse>
      </Card>
    )
  }
}