import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import { Card, Collapse, Button, Form, FormGroup, Input } from 'reactstrap';
import { cardsSelector } from '../selectors/cards';
import LoadingIndicator from './LoadingIndicator';
import * as CardsActions from '../actions/cards';
import '../style/cards.scss';

@connect(state => ({
    loading: state.cards.isLoading,
    card: cardsSelector(state)[0],
    router: state.routing
}), wrapActionCreators({...CardsActions}))

export default class CardTitle extends Component {
  static propTypes = {
    card: PropTypes.object,
    isLoading: PropTypes.bool
  }

  state={
    isVisible: false,
    form: ''
  }
  componentDidMount() {
    //grab the cardId from current url
    const cardId = this.props.location.pathname.split('/')[2]
    this.props.getCard(cardId);
  }
  toggleFormCollapse(event) {
    this.setState({ isVisible: !this.state.isVisible })
  }
  editDescription(event) {
    this.setState({
      ...this.state,
      form: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateDescription({
      id: this.props.location.pathname.split('/')[2],
      description: this.state.form
    })
    this.setState({
      form: '',
      isVisible: !this.state.isVisible
    })
  }
  renderDescription() {
    const { card } = this.props;
    return (
      <div className='description'>
        <h4 className='card-title'>
          {card.name}
        </h4>

        <div className='title'>
          <h5 className='card-title'> Description:</h5>
          <div onClick={(event) => this.toggleFormCollapse(event)} className='edit'>
              <u>edit description</u>
          </div>
        </div>

        <div className="content">
          {(card.description ?
            <p>
               {card.description}
            </p> : ' '
          )}
        </div>
      </div>
    )
  }
  renderForm() {
    const { isVisible, form } = this.state
    return (
      <Collapse isOpen={isVisible}>
        <Form
          onSubmit={(event) => this.handleSubmit(event)}
          className='indent'
          >
          <FormGroup>
            <Input
              onChange={(event) => this.editDescription(event)}
              value={form}
              type="textarea"
              placeholder="Edit Description..."
            />
            <Button type='submit'>Update</Button>
          </FormGroup>
        </Form>
      </Collapse>
    )
  }
  render() {
    const { card, loading } = this.props;
    return (
      <section>
        {loading &&
          <LoadingIndicator message={'Loading...'} />
        }
        {!loading && card &&
          <Card className="cardpage">
            {this.renderDescription()}
            {this.renderForm()}
          </Card>
        }
      </section>
    )
  }
}