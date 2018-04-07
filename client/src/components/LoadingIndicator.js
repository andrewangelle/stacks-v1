import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/loading-indicator.scss';

export default class LoadingIndicator extends Component {
  static propTypes = {
    message: PropTypes.string,
    styles: PropTypes.object
  }

  render() {
    const { message } = this.props;

    return (
      <div>
        <div className='loading-indicator'></div>

        <div className='loading-message'>
          {message}
        </div>
      </div>
    );
  }
}
