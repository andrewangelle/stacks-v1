import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import wrapActionCreators from '../utils/wrapActionCreators';
import { newId } from '../utils/helpers.js';
import { Input } from 'reactstrap';
import { cardsSelector } from '../selectors/cards';
import Drag from './Drag.js';
import * as CardsActions from '../actions/cards';
import * as UserActions from '../actions/user';
import '../style/stacks.scss';

@connect(state => ({
    user: state.users.currentUser,
    cards: cardsSelector(state),
    isLoading: state.cards.isLoading
}), wrapActionCreators({
    ...CardsActions,
    ...UserActions,
}))

export default class Stack extends Component {
  static propTypes = {
    user: PropTypes.object,
    cards: PropTypes.array,
    isLoading: PropTypes.bool,
    addNewCard: PropTypes.func,
    deleteCard: PropTypes.func,
    deleteStack: PropTypes.func
  }
  state={
    cardName: '',
  }
  componentDidMount() {
    this.props.getCards(this.props.stack.id);
  }
  handleCardFormChange(event) {
    this.setState({
      ...this.state,
      cardName: event.target.value
    })
  }
  onSubmitAddNewCard(event) {
    event.preventDefault()
    this.props.addNewCard({
      id: newId(),
      name: this.state.cardName,
      parent: this.props.stack.id,
      author: this.props.user.uid
    });
    this.setState({ cardName: '' })
  }
  renderHeader() {
    const { stack, deleteStack } = this.props;
    return (
      <header>
        <h4>{stack.name || ''}</h4>
        <span
          className='delete-stack'
          onClick={ () => deleteStack(this.props.stack.id) }
          >
          delete
        </span>
      </header>
    )
  }
  renderAddNewCardInput() {
    const { cardName } = this.state;
    return (
      <li>
        <form onSubmit={ (event) => this.onSubmitAddNewCard(event)}>
          <Input
            className='add-card-form'
            placeholder="Add a card..."
            onChange={ (event) => this.handleCardFormChange(event) }
            value={cardName}
          />
        </form>
      </li>
    )
  }
  renderCards() {
    const { cards, deleteCard } = this.props;
    return (
      <ul>
        {cards ? cards
          .filter(card => card.parent === this.props.stack.id)
          .map(card =>
            <li key={card.id}>
              <Link to={`/card/${card.id}`}> {card.name} </Link>
              <i onClick={() => deleteCard(card.id)} className='delete'> X </i>
            </li>
          ) : null
        }
        {this.renderAddNewCardInput()}
      </ul>
    )
  }
  render() {
    const { stack, index } = this.props;
    return (
      <Drag dragId={stack.id} index={index}>
        <div className='stack'>
          {this.renderHeader()}
          {this.renderCards()}
          <footer></footer>
        </div>
      </Drag>
    )
  }
}