import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import { newId } from '../utils/helpers';
import { Card, Collapse } from 'reactstrap';
import List from './List.js';
import Drop from '../components/Drop.js'
import Drag from '../components/Drag.js';
import '../style/cards.scss';
import CardPageSectionHeader from './CardSectionHeader';
import LoadingIndicator from './LoadingIndicator';
import { listSelector } from '../selectors/lists'
import * as ListsActions from '../actions/lists';
import * as UserActions from '../actions/user';

@connect(state => ({
    isLoading: state.lists.isLoading,
    lists: listSelector(state),
    user: state.users.currentUser
}), wrapActionCreators({
    ...ListsActions,
    ...UserActions
}))

export default class Lists extends Component {
  static propTypes = {
    user: PropTypes.object,
    isLoading: PropTypes.bool,
    lists: PropTypes.array
  }
  state={
    name: '',
    collapse: true,
    formCollapse: false,
  }
  componentDidMount() {
    const parentId = this.props.location.pathname.split('/')[2]
    this.props.getLists(parentId)
  }
  toggleCollapse(event){
    this.setState({ collapse: !this.state.collapse})
  }
  toggleFormCollapse(event) {
    this.setState({ formCollapse: !this.state.formCollapse })
  }
  handleListFormChange(event) {
    this.setState({ name: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addNewList({
      list: {
        id: newId(),
        name: this.state.name,
        parent: this.props.location.pathname.split('/')[2],
        author: this.props.user.uid
      },
      userName: this.props.user.name
    });
    this.setState({
      ...this.state,
      name: ''
    })
  }
  render() {
    const { lists, isLoading } = this.props;

    if(isLoading) {
      return (
        <LoadingIndicator message={'Loading...'} />
      );
    }
    else {
      return(
        <Card className='card-page-section'>
          <CardPageSectionHeader
            headerText={'List'}
            formValue={this.state.name}
            formVisible={this.state.formCollapse}
            toggleForm={this.toggleFormCollapse.bind(this)}
            handleFormChange={this.handleListFormChange.bind(this)}
            handleFormSubmit={this.handleSubmit.bind(this)}
          />

          <Collapse isOpen={this.state.collapse}>
            <Drop>
              {lists.map((list,index) =>
                <Drag key={list.id} dragId={list.id} index={index}>
                  <List
                    list={list}
                    {...this.props}
                  />
                </Drag>
              )}
            </Drop>
          </Collapse>

        </Card>
      );
    }
  }
}


