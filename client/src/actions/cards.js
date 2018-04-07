import { createAction } from 'redux-actions';
import * as cardsApi from '../middleware/cards';

export const getCardsRequest = createAction('GET_CARDS_REQUEST');
export const getCardsSuccess = createAction('GET_CARDS_SUCCESS');
export const getCardsFailure = createAction('GET_CARDS_FAILURE');
export const addNewCardRequest = createAction('ADD_NEW_CARD_REQUEST');
export const addNewCardSuccess = createAction('ADD_NEW_CARD_SUCCESS');
export const addNewCardFailure = createAction('ADD_NEW_CARD_FAILURE');
export const deleteCardRequest = createAction('DELETE_CARD_REQUEST');
export const deleteCardSuccess = createAction('DELETE_CARD_SUCCESS');
export const deleteCardFailure = createAction('DELETE_CARD_FAILURE');
export const getCardRequest = createAction('GET_CARD_REQUEST');
export const getCardSuccess = createAction('GET_CARD_SUCCESS');
export const getCardFailure = createAction('GET_CARD_FAILURE');
export const updateCardSuccess = createAction('UPDATE_CARD_SUCCESS');
export const updateCardFailure = createAction('UPDATE_CARD_FAILURE');

export function getCards(data) {
    return async dispatch => {
        dispatch(getCardsRequest());
        try {
            const updatedData = await cardsApi.fetchCardsData(data);
            dispatch(getCardsSuccess(updatedData));
        }
        catch(e) {
            dispatch(getCardsFailure())
        }
    }
}

export function getCard(id) {
    return async dispatch => {
        dispatch(getCardRequest());
        try {
            const updatedData = await cardsApi.fetchCard(id);
            dispatch(getCardSuccess(updatedData));
        }
        catch(e) {
            dispatch(getCardFailure(e.message))
        }
    }
}

export function addNewCard(data) {
    return async dispatch => {
        dispatch(addNewCardSuccess(data));
        try {
            await cardsApi.postCard(data);
        }
        catch(e) {
            dispatch(addNewCardFailure(e.message));
        }
    }
}

export function deleteCard(data) {
    return async dispatch => {
        dispatch(deleteCardSuccess(data));
        try {
            await cardsApi.deleteCard(data);
        }
        catch(e) {
            dispatch(deleteCardFailure(e.message));
        }
    }
}

export function updateDescription(data) {
    return async dispatch => {
        dispatch(updateCardSuccess(data))
        try {
            await cardsApi.updateCard(data)
        }
        catch(e) {
            dispatch(updateCardFailure(e.message))
        }
    }
}
