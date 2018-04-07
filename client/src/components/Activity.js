import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import LoadingIndicator from './LoadingIndicator';
import moment from 'moment';
import wrapActionCreators from '../utils/wrapActionCreators';
import * as ActivityActions from '../actions/activity.js';
import { activitySelector } from '../selectors/activity'
import '../style/cards.scss';

@connect(state => ({
  isLoading: state.activity.isLoading,
  activity: activitySelector(state)
}), wrapActionCreators(ActivityActions))

export default class Activity extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    activity: PropTypes.array
  }
  componentDidMount() {
    const parentId = this.props.location.pathname.split('/')[2]
    this.props.getActivity(parentId)
  }
  render(){
    const { activity, isLoading } = this.props;
    return (
      <Card className='card-page-section'>
        <Card className="section-header">
          <h5>Activity:</h5>
        </Card>
        {isLoading &&
          <LoadingIndicator message={'Loading...'} />
        }
        {!isLoading && activity.length > 0 &&
          <Card>
            {activity.map(entry =>
              <div key={entry.id} className="activity entry">
                {entry.message} on {moment(entry.created).format("MMM Do YY")}
              </div>
            )}
          </Card>
        }
      </Card>
    )
  }
}
