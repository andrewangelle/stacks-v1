import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import { reorderResults } from '../utils/helpers.js';
import { DragDropContext } from 'react-beautiful-dnd';
import CardTitle from '../components/CardTitle'
import Comments from '../components/Comments.js';
import Lists from '../components/Lists.js';
import Activity from '../components/Activity.js';
import Animate from '../components/Animate';
import '../style/cards.scss';
import { listSelector } from '../selectors/lists'
import * as ListsActions from '../actions/lists';
import * as UserActions from '../actions/user';

@connect(state => ({
    user: state.users.currentUser,
    lists: listSelector(state)
}), wrapActionCreators({
    ...ListsActions,
    ...UserActions
}))

export default class CardPage extends Component {
  static propTypes = {
    match: PropTypes.object,
    lists: PropTypes.array,
    user: PropTypes.object
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorder = reorderResults(
      this.props.lists,
      result.source.index,
      result.destination.index
    );

    this.props.dragEnd(reorder);
  }

  render() {
    const { user } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        <div className='cardpage container'>
          <Animate type="appear">
            <CardTitle {...this.props} />
            <Lists user={user} {...this.props}/>
            <Comments user={user} {...this.props}/>
            <Activity {...this.props} />
          </Animate>
        </div>
      </DragDropContext>
    )
  }
}
