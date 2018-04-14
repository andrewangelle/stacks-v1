import React, { Component } from 'react';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import PropTypes from 'prop-types';
import { newId } from '../utils/helpers.js';
import { Collapse, Form, FormGroup, Input, Button } from 'reactstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import Animate from '../components/Animate'
import Project from '../components/Project.js';
import Drop from '../components/Drop.js';
import { projectsSelector } from '../selectors/projects';
//eslint-disable-next-line
import LoadingIndicator from '../components/LoadingIndicator';
import * as UserActions from '../actions/user';
import * as ProjectsActions from '../actions/projects';
import '../style/index.scss';


@connect((state,props) => ({
  isLoading: state.projects.isLoading,
  user: state.users.currentUser,
  projects: projectsSelector(state)
}), wrapActionCreators({...UserActions,...ProjectsActions}))

export default class HomePage extends Component {
  static propTypes = {
    user: PropTypes.object,
    isLoading: PropTypes.bool,
    projects: PropTypes.array,
    addNewProject: PropTypes.func,
    deleteProject: PropTypes.func
  }
  state={
    projectName: '',
    formCollapse: false
  }
  componentDidMount() {
    this.props.getProjects(this.props.user.uid)
  }
  toggleForm(event) {
    this.setState({ formCollapse: !this.state.formCollapse })
  }
  handleFormChange(event) {
    this.setState({
      ...this.state,
      projectName: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addNewProject({
      id: newId(),
      name: this.state.projectName,
      author: this.props.user.uid
    });
    this.setState({
      ...this.state,
      projectName: '',
      formCollapse: false
    })
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    this.props.dragEnd(result);
  }
  renderHeader(){
    return (
      <div className='section-header'>
        <h5>Projects</h5>
        <span onClick={(event) => this.toggleForm(event)} className='add'>
          Add Project
        </span>
      </div>
    )
  }
  renderForm(){
    return (
      <Collapse isOpen={this.state.formCollapse}>
        <Form
          onSubmit={(event) => this.handleSubmit(event)}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Add A New Project...."
              onChange={(event) => this.handleFormChange(event)}
              value={this.state.projectName}
              />
              <Button type='submit'>Save</Button>
          </FormGroup>
        </Form>
      </Collapse>
    )
  }
  renderProjects(){
    const { projects } = this.props;
    return (
      <Drop>
        {projects.map((project,index) =>
          <Project
            key={project.id}
            project={project}
            index={index}
            {...this.props}
          />
        )}
      </Drop>
    )
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        <Animate type="appear">
          <div className='project--page'>
            {this.renderHeader()}
            {this.renderForm()}
            {this.renderProjects()}
          </div>
        </Animate>
      </DragDropContext>
    );

  }
}