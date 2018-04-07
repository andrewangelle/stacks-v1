import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';
import Drag from './Drag.js'
import '../style/index.scss';

export default class Project extends Component {
  static propTypes = {
    project: PropTypes.object,
    deleteProject: PropTypes.func
  }

  render() {
    const { project, deleteProject, index } = this.props;
    return (
      <Drag dragId={project.id} index={index}>
        <Card className="project--list-item">
          <Link to={`/stacks/${project.id}`}>
            {project.name}
          </Link>
          <i onClick={() => deleteProject(project.id)}>
            X
          </i>
        </Card>
      </Drag>
    );
  }
}
