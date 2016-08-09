import { constants } from './actions';

/**
 * Reducer function responds to application events
 * the state object is an instance of Immutable JS
 * see: https://facebook.github.io/immutable-js/
 */
function reducer(state, action) {
  switch (action.type) {
    case constants.SET_PREV_PAGE:
      return state.mergeDeep({
        prevPage: {
          url: action.url,
          query: action.query
        }
      });
    default:
      return state;
  }
}

export default reducer;
