import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../style/index.scss';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import * as UserActions from '../actions/user';
import Animate from '../components/Animate';
import LoadingIndicator from '../components/LoadingIndicator';
import LoginPage from './LoginPage';
import routes from '../config/routes';
import '../style/index.scss';

@connect((state,props) => ({
  user: state.users.currentUser,
  userLoading: state.users.isLoading,
  isLoggedIn: state.users.isLoggedIn
}), wrapActionCreators(UserActions))

export default class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    userLoading: PropTypes.bool,
    isLoggedIn: PropTypes.bool
  }
  componentDidMount() {
    this.props.checkUserStatus()
  }
  render() {
    const { user, userLoading, isLoggedIn } = this.props;
    return (
      <Animate type="appear">
        <Header
          user={user}
          {...this.props}
        />

        {userLoading &&
          <LoadingIndicator message={'Loading...'} />
        }

        {(!userLoading && !isLoggedIn) &&
          <LoginPage {...this.props} />
        }

        {isLoggedIn &&
          <Animate type="appear">
            {routes}
          </Animate>
        }
      </Animate>
    );
  }
}