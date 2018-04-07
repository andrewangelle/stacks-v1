import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/index.scss';

export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object
  }
  state={
    collapse: false
  }
  logout(event) {
    event.preventDefault()
    window.location = '/'
    this.props.logoutUserWithGmail()
    this.toggleMenu(event)
  }
  render() {
    const { user } = this.props;

    return (
      <div className="header">
        <h2>stacks</h2>
        <nav>
          <span>
            <Link to='/'>Home</Link>
          </span>

          {user &&
            <span onClick={(event) => this.logout(event)}>
              Logout
            </span>
          }

          {!user &&
            <span onClick={() => this.props.loginUserWithGmail()}>
              Login
            </span>
          }
        </nav>
      </div>
    );
  }
}