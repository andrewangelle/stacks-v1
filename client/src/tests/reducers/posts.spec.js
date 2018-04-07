import posts from '../../reducers/posts';
import {
  getTableDataRequest,
  getTableDataSuccess,
  getTableDataFailure,
} from '../../actions/posts';

describe('Posts reducers', () => {
  it('should handle initial state', () => {
    expect(posts(undefined, {}))
    .toEqual({
      loading: null,
      error: null,
      data: {},
      filters: {
        current: 'none',
        type: 'none',
        data: []
      }
    })
  });

  it('should handle get table data request', () => {
    expect(posts(undefined, {type: getTableDataRequest}))
    .toEqual({
      loading: true,
      error: null,
      data: {},
      filters: {
        current: 'none',
        type: 'none',
        data: []
      }
    })
  });

  it('should handle get table data success', () => {
    expect(posts(undefined, {
      type: getTableDataSuccess,
      payload: [{
        id: 0
      }]
    }))
    .toEqual({
      loading: false,
      error: null,
      data: {
        "0": {id: 0}
      },
      filters: {
        current: 'none',
        type: 'none',
        data: []
      }
    })
  })

  it('should handle get table data failure', () => {
    expect(posts(undefined, {
      type: getTableDataFailure,
      payload: 'there was an error'
    }))
    .toEqual({
      loading: false,
      error: 'there was an error',
      data: {},
      filters: {
        current: 'none',
        type: 'none',
        data: []
      }
    })
  })
});