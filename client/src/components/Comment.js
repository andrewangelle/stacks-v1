import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import moment from 'moment';
import { Collapse, Button, Form, FormGroup, Input } from 'reactstrap';
import { newId } from '../utils/helpers.js';
import '../style/cards.scss';
import * as CommentsActions from '../actions/comments';

@connect(props => ({
  comment: props.comment,
  match: props.match,
  user: props.user
}), wrapActionCreators({
    ...CommentsActions
}))

export default class Comment extends Component {
  static propTypes = {
    user: PropTypes.object,
    comment: PropTypes.object,
    match: PropTypes.object
  }

  state={
    replyCollapse: false,
    replyForm: '',
    replyVisible: false,
    replyText: 'Show Replies'
  }

  toggleRepliesVisible(event) {
    this.setState({ repliesVisible: !this.state.repliesVisible })
  }

  toggleReplyCollapse(event) {
    this.setState({ replyCollapse: !this.state.replyCollapse });
  }

  handleReplyFormChange(event) {
    this.setState({ replyForm: event.target.value })
  }

  handleReplySubmit(event) {
    event.preventDefault()
    this.props.addNewReply({
      comment: {
        id: newId(),
        data: this.state.replyForm,
        parent: this.props.location.pathname.split('/')[2],
        author: this.props.user.name,
        isReply: true,
        originId: this.props.comment.id,
        created: new Date()
      },
      name: this.props.user.name
    });
    this.setState({ replyForm: '' })
  }

  render() {
    const { comment } = this.props;

    return (
      <section className='thread-parent comment'>

        <div className="inner">
          <div className='author'>
            {comment.author}
          </div>

          <div className='date'>
            <span>{moment(this.props.comment.created).calendar()}</span>
          </div>

          <div className='add-reply'>
            <div onClick={(event) => this.toggleRepliesVisible(event)}>
              Show Replies
            </div>
            <div onClick={(event) => this.toggleReplyCollapse(event)}>
              Reply
            </div>
          </div>

          <div className='text'>
            {comment.data}
          </div>

          <Collapse isOpen={this.state.replyCollapse}>
            <Form
              onSubmit={(event) => this.handleReplySubmit(event)}
              className='indent'
              >
              <FormGroup>
                <Input
                  onChange={(event) => this.handleReplyFormChange(event)}
                  value={this.state.replyForm}
                  type="textarea"
                  placeholder="Add A Reply...."
                />
                <Button type='submit'>Save</Button>
              </FormGroup>
            </Form>
          </Collapse>
        </div>

        <Collapse isOpen={this.state.repliesVisible}>
          <div className='thread-replies'>
            {this.props.children}
          </div>
        </Collapse>

      </section>
    )
  }
}