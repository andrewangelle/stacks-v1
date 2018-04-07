import { handleActions } from 'redux-actions';
import {
    getCardsRequest,
    getCardsSuccess,
    getCardsFailure,
    addNewCardSuccess,
    addNewCardFailure,
    deleteCardSuccess,
    deleteCardFailure,
    getCardRequest,
    getCardSuccess,
    getCardFailure,
    updateCardSuccess,
    updateCardFailure
}  from '../actions/cards.js';

const initialState = {
    isLoading: true,
    error: null,
    data: {},
};

export default handleActions({
    [getCardsRequest]: state => ({
        ...state,
        isLoading:true
    }),
    [getCardsSuccess]: (state,action) => ({
        ...state,
        isLoading: false,
        data: {
            ...state.data,
            ...action.payload || {}
        }
    }),
    [getCardsFailure]: (state,action) => ({
        ...state,
        error: action.payload
    }),
    [addNewCardSuccess]: (state,action) => ({
      ...state,
      isLoading: false,
      data: {
        ...state.data,
        [action.payload.id]: {
            id: action.payload.id,
            name: action.payload.name,
            parent: action.payload.parent,
            author: action.payload.author
        }
      }
    }),
    [addNewCardFailure]: (state,action) => ({
        ...state,
        error: action.payload
    }),
    [deleteCardSuccess]: (state, action) => ({
        ...state,
        isLoading: false,
        data: Object.values(state.data)
            .map(card => Object.assign({}, card))
            .filter(card => card.id !== action.payload)
    }),
    [deleteCardFailure]: (state,action) => ({
        ...state,
        error: action.payload
    }),
    [getCardRequest]: (state,action) => ({
        ...state,
        isLoading: true
    }),
    [getCardSuccess]: (state,action) => ({
        ...state,
        isLoading: false,
        data: {...action.payload}
    }),
    [getCardFailure]: (state,action) => ({
        ...state,
        error: action.payload
    }),
    [updateCardSuccess]: (state,action) => ({
        ...state,
        data: {
            ...state.data,
            [action.payload.id]: {
                ...state.data[action.payload.id],
                description: action.payload.description
            }
        }
    }),
    [updateCardFailure]: (state, action) => ({
        ...state,
        error: action.payload
    })

}, initialState);
