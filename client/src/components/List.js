import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import { newId } from '../utils/helpers.js';
import { Card, Collapse, Form, FormGroup, Input } from 'reactstrap';
import LoadingIndicator from './LoadingIndicator';
import '../style/cards.scss';
import { listItemSelector } from '../selectors/listItems';
import * as ListItemsActions from '../actions/listItems.js';

@connect((state,props) => ({
    isLoading: state.listItems.isLoading,
    listItems: listItemSelector(state),
    user: props.user
}), wrapActionCreators({
    ...ListItemsActions
}))

export default class List extends Component {
  static propTypes = {
    user: PropTypes.object,
    isLoading: PropTypes.bool,
    list: PropTypes.object,
    listItems: PropTypes.array,
    addNewListItem: PropTypes.func,
    updateListItem:PropTypes.func
  }
  state={
    name: '',
    collapse: false
  }
  componentDidMount(){
    this.props.getListItems(this.props.list.id)
  }
  toggleCheckList(){
    this.setState({ collapse: !this.state.collapse})
  }
  handleFormChange(event) {
    this.setState({ name: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault();

    this.props.addNewListItem({
      id: newId(),
      data: this.state.name,
      completed: 'false',
      parent: this.props.list.id,
      author: this.props.user.name
    });

    this.setState({ name: '' });
  }
  renderHeader() {
    const { list, deleteList } = this.props;
    return (
      <div className='list-header'>
        <div onClick={(event) => this.toggleCheckList()}>
          <h5>{list.name}</h5>
        </div>
        <div
          onClick={() => deleteList(list.id)}
          className="delete-list"
          >
          X
        </div>
      </div>
    )
  }
  renderForm() {
    const { name } = this.state;
    return (
      <Card className="add-item">
        <Form onSubmit={(event) => this.handleSubmit(event)}>
          <FormGroup>
            <Input
              onChange={(event) => this.handleFormChange(event)}
              placeholder="add an item..."
              value={name}
            />
          </FormGroup>
        </Form>
      </Card>
    )
  }
  renderItems() {
    const { listItems, list, updateListItem } = this.props;
    const items = listItems.filter(item => item.parent === list.id);

    const Item = ({ item }) => item.completed ? (
      <Input onChange={() => updateListItem(item.id)} type="checkbox" checked/>
      ) : (
      <Input onChange={() => updateListItem(item.id)} type="checkbox" />
      )
    ;
    const ItemData = ({ item }) => item.completed ? (
      <del className='font-weight-light font-italic'>{item.data}</del>
      ) : (
      <div>{item.data}</div>
      )
    ;
    const display = items.map(item =>
      <div key={item.id} className="checkbox-item">
        <Item item={item} />
        <ItemData item={item} />
      </div>
    );

    return (display)
  }
  render() {
    const { listItems, isLoading } = this.props;
    return(
      <Card className="list">
        {this.renderHeader()}

        {isLoading &&
          <LoadingIndicator message={'Loading...'} />
        }

        {!isLoading && listItems &&
          <Collapse
            isOpen={this.state.collapse}
            className='list-contents'
            >
            {this.renderForm()}
            {this.renderItems()}
          </Collapse>
        }
      </Card>
    )
  }
}