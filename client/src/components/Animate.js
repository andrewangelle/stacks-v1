import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/animations.scss';

export default class Animate extends Component {
  static propTypes = {
    type: PropTypes.oneOf( [ 'appear', 'fade-in' ] )
  }

  render() {
    const { type, children } = this.props;

    return (
      <div className={ `animate--${ type }` }>
        { children }
      </div>
    )
  }
}


