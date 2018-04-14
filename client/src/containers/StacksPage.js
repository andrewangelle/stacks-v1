import React, { Component } from 'react';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Button, Collapse } from 'reactstrap';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Animate from '../components/Animate';
import Stack from '../components/Stack';
import LoadingIndicator from '../components/LoadingIndicator.js';
import { stacksSelector } from '../selectors/stacks';
import { newId } from '../utils/helpers.js';
import * as StacksActions from '../actions/stacks';
import * as UserActions from '../actions/user';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/stacks.scss';

@connect(state => ({
    user: state.users.currentUser,
    loading: state.stacks.isLoading,
    stacks: stacksSelector(state)
}), wrapActionCreators({
    ...StacksActions,
    ...UserActions,
}))

export default class StacksPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    stacks: PropTypes.array,
    dnd: PropTypes.array,
    match: PropTypes.object,
    addNewStack: PropTypes.func,
    deleteStack: PropTypes.func
  }
  state={
    formVisible: false,
    stackName: ''
  }
  componentDidMount() {
    this.props.getStacks(this.props.match.params.projectId)
  }

  toggleForm(event) {
    this.setState({
      ...this.state,
      formVisible: !this.state.formVisible
    })
  }
  handleStackFormChange(event) {
    this.setState({
      ...this.state,
      stackName: event.target.value
    })
  }
  onSubmitAddNewStack(event) {
    event.preventDefault();

    this.props.addNewStack({
      id: newId(),
      name: this.state.stackName,
      parent: this.props.match.params.projectId,
      author: this.props.user.uid
    });

    this.setState({
      ...this.state,
      stackName: '',
      formVisible: false
    })
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    this.props.dragEnd(result);
  }
  renderHeader() {
    return (
      <div className='section-header'>
        <h5>Stacks</h5>
        <span
          onClick={(event) => this.toggleForm(event)}
          className='add'
          >
          Add Stack
        </span>
      </div>
    )
  }
  renderForm() {
    const { formVisible, stackName } = this.state;
    return (
      <Collapse isOpen={formVisible}>
        <Form onSubmit={(event) => this.onSubmitAddNewStack(event)}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Add A Stack...."
              onChange={(event) => this.handleStackFormChange(event)}
              value={stackName}
            />
            <Button type='stacks-row submit'>Save</Button>
          </FormGroup>
        </Form>
      </Collapse>
    )
  }
  renderStacks() {
    const { stacks } = this.props;
    return (
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            <div className="stacks--inner">
              {stacks.map((stack, index) =>
                <Stack
                  key={stack.id}
                  stack={stack}
                  index={index}
                  {...this.props}
                />
              )}
            </div>
          </div>
        )}
      </Droppable>
    )
  }
  render() {
    const { loading, stacks } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        <Animate type="appear">
          {loading &&
            <LoadingIndicator message={'Loading...'} />
          }
          {!loading && stacks.length > 0 &&
            <div className="stacks--page">
              {this.renderHeader()}
              {this.renderForm()}
              {this.renderStacks()}
            </div>
          }
        </Animate>
      </DragDropContext>
    );
  }
}
