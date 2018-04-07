import React, { Component } from 'react';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import PropTypes from 'prop-types';
import { Card, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as UserActions from '../actions/user';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/index.scss';

@connect(state => ({
    user: state.users.currentUser,
    exists: state.signup.data.exists,
    checkSuccessful: state.signup.checkSuccessful
}), wrapActionCreators({
    ...UserActions,
}))

export default class LoginPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    exists: PropTypes.bool,
    checkSuccessful: PropTypes.bool
  }

  state={
    signUpVisible: false,
    form: {
      name: null,
      email: null
    }
  }

  toggleVisibility(event) {
    this.setState({
      signUpVisible: true
    })
  }

  handleFormChange(event) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.checkAccountAvailability(this.state.form.email)
  }

  render() {
    const { signUpVisible } = this.state;

    return (
      <div>

        {!signUpVisible &&
          <div style={{textAlign: 'center'}}>
            <div
              style={{cursor: 'pointer'}}
              onClick={() => this.props.loginUserWithGmail()}>
              Log in
            </div>
              or<br />
            <div
              style={{cursor: 'pointer'}}
              onClick={(event) => this.toggleVisibility()}
              >
              Create an account
            </div>
          </div>
        }

        {signUpVisible &&
          <div className='signup'>
            <Form
              className='indent'
              onSubmit={(event) => this.handleSubmit(event)}
              >

              <FormGroup>
                <Label for="name">Username</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="choose a user name..."
                  onChange={(event) => this.handleFormChange(event)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="enter a valid gmail account"
                  onChange={(event) => this.handleFormChange(event)}
                />
              </FormGroup>

              <Card>
                <Button onClick={() => this.props.createAccount()}>
                  Create Account
                </Button>
              </Card>

            </Form>
          </div>
        }
      </div>
    );
  }
}
