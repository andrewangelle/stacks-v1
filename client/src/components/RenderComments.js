import React, { Component } from 'react';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import * as CommentsActions from '../actions/comments';
import * as UserActions from '../actions/user'
import Comment from './Comment.js';
import '../style/cards.scss';

@connect(props => ({
    comments: props.comments,
    user: props.user
}), wrapActionCreators({
    ...CommentsActions,
    ...UserActions
}))

export default class RenderComments extends Component {
  render() {
    const { comments, match } = this.props;

    const DisplayComments = ({ comments }) =>
      <div className="threads-container">
        {comments.map(comment =>
          <RenderCommentsRecursively
            comment={comment}
            key={comment.id}
          />
        )}
      </div>
    ;

    const RenderCommentsRecursively = ({ comment }) => {
      //eslint-disable-next-line
      comment.replies.length > 1 ? (
        <RenderCommentsAndReplies comment={comment} />
        ) : (
        <Comment
          comment={comment}
          match={match}
          {...this.props}
        />
      )
    };

    const RenderCommentsAndReplies = ({ comment, match }) => (
      <Comment
        key={comment.id}
        comment={comment}
        match={match}
        {...this.props}
        >
        {comment.replies.map(reply =>
          <RenderCommentsRecursively
            comment={reply}
            key={reply.id}
          />
        )}
      </Comment>
    );

    return (
      <div className="threads-container">
        <DisplayComments
          comment={comments}
          {...this.props}
        />
      </div>
    )
  }
}