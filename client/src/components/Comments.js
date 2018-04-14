import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import { newId } from '../utils/helpers.js';
import moment from 'moment';
import { Card, Collapse } from 'reactstrap';
import LoadingIndicator from './LoadingIndicator';
import CardPageSectionHeader from './CardSectionHeader';
import { commentsSelector } from '../selectors/comments';
import * as CommentsActions from '../actions/comments';
import '../style/cards.scss';

@connect((state,props) => ({
    loading: state.comments.isLoading,
    comments: commentsSelector(state),
    user: props.user
}), wrapActionCreators(CommentsActions))

export default class Comments extends Component {
  static propTypes = {
    user: PropTypes.object,
    cardId: PropTypes.string,
    match: PropTypes.object
  }
  state={
    form: '',
    collapse: true,
    formCollapse: false,
    replyCollapse: false
  }
  componentDidMount() {
    const parentId = this.props.match.params.cardId
    this.props.getComments(parentId)
  }
  toggleCollapse(event) {
    this.setState({ collapse: !this.state.collapse })
  }
  toggleFormCollapse(event) {
    this.setState({ formCollapse: !this.state.formCollapse })
  }
  handleCommentFormChange(event) {
    this.setState({ form: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()

    const options = {
      id: newId(),
      data: this.state.form,
      parent: this.props.location.pathname.split('/')[2],
      author: this.props.user.name,
      created: new Date(),
      isreply: false
    };

    this.props.addNewComment({
      comment: {...options},
      name: this.props.user.name
    })

    this.setState({
      ...this.state,
      form: ''
    })
  }
  renderComments() {
    const { comments } = this.props;

    const displayComments = comments.map(comment =>
      <section className='thread-parent comment' key={comment.id}>
        <div className="inner">
          <div className='author'>
            {comment.author}
          </div>
          <div className='date'>
            <span>{moment(comment.created).calendar()}</span>
          </div>
          <div className='text'>
            {comment.data}
          </div>
        </div>
      </section>
    )

    return (displayComments)

  }
  render() {
    const { comments, loading } = this.props;
    return (
      <Card className='card-page-section'>
        <CardPageSectionHeader
          headerText={'Comment'}
          handleFormChange={this.handleCommentFormChange.bind(this)}
          handleFormSubmit={this.handleSubmit.bind(this)}
          toggleForm={this.toggleFormCollapse.bind(this)}
          formValue={this.state.form}
          formVisible={this.state.formCollapse}
        />
        {loading &&
          <LoadingIndicator message={'Loading...'} />
        }
        {!loading && comments.length > 0 &&
          <Collapse isOpen={this.state.collapse}>
            {this.renderComments()}
          </Collapse>
        }
      </Card>
    )
  }
}

