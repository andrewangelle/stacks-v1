import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as PostsActions from '../../actions/posts';
import LocalStorageMock from '../helpers/LocalStorageMock';
import { mockResponse } from '../helpers/mockResponse';

const mockStore = configureStore([thunk]);

describe('Shows actions', () => {
  it('calls request and success actions if fetch response was successful', () => {
    const store = mockStore({
      posts: {
        data: {}
      }
    });

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(
        mockResponse(200, null,
          JSON.stringify({
            payload: []
          })
        )
      )
    );

    global.localStorage = new LocalStorageMock();

    return store.dispatch(PostsActions.getTableData())
      .then(() => {
        const expectedActions = store.getActions();

        expect(expectedActions[0]).toEqual({
          type: PostsActions.getTableDataRequest.toString()
        });
        expect(expectedActions[1]).toEqual({
          type: PostsActions.getTableDataSuccess.toString(),
          payload: []
        });
      });

  })
})