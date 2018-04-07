import { createSelector } from 'reselect';

const getPosts = state => state.posts.data;
const getFilters = state => state.posts.filters;
const getFilterType = state => state.posts.filters.type;

export const postsSelector = createSelector(
  [ getPosts ],
  posts => {
    const nextState = Object.values(posts).map(post => Object.assign({}, post))
    return nextState
  }
)

export const filterSelector = createSelector(
  [ getPosts, getFilters, getFilterType ],
  (posts, filters, types) => {
    //copy state
    const currentState = Object.values(posts).map(post => Object.assign({}, post));

    //filter props
    const noFilter = (types === 'none');
    const filterByPostId = (types === 'id');
    const filterByUserId = (types === 'userId');
    const sortTitlesAtoZ = (types === 'title' && filters.current === 'A-Z');
    const sortTitlesZtoA = (types === 'title' && filters.current === 'Z-A');
    const sortBodyAtoZ = (types === 'body' && filters.current === 'A-Z');
    const sortBodyZtoA = (types === 'body' && filters.current === 'Z-A');

    if(noFilter) {
      return {
        ...filters,
        data: currentState
      }
    }

    if(filterByPostId) {
      return {
        ...filters,
        data: currentState.filter(post => post.id === filters.current)
      }
    }

    if(filterByUserId) {
      return {
        ...filters,
        data: currentState.filter(post => post.userId === filters.current)
      }
    }

    if(sortTitlesAtoZ) {
      return {
        ...filters,
        data: currentState.sort((a,b) => {
          if(a.title < b.title) return -1;
          if(a.title > b.title) return 1;
          return 0;
        })
      }
    }

    if(sortTitlesZtoA) {
      return {
        ...filters,
        data: currentState.sort((a,b) => {
          if(a.title < b.title) return 1;
          if(a.title > b.title) return -1;
          return 0;
        })
      }
    }

    if(sortBodyAtoZ) {
      return {
        ...filters,
        data: currentState.sort((a,b) => {
          if(a.body < b.body) return -1;
          if(a.body > b.body) return 1;
          return 0;
        })
      }
    }

    if(sortBodyZtoA) {
      return {
        ...filters,
        data: currentState.sort((a,b) => {
          if(a.body < b.body) return 1;
          if(a.body > b.body) return -1;
          return 0;
        })
      }
    }
  }
)