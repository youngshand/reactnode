import { constants } from './actions';

/**
 * Reducer function responds to application events
 * the state object is an instance of Immutable JS
 * see: https://facebook.github.io/immutable-js/
 */
function reducer(state, action) {
  switch (action.type) {
    case constants.OPEN_MENU:
      return state.setIn(['menu', 'isOpen'], true);
    case constants.CLOSE_MENU:
      return state.setIn(['menu', 'isOpen'], false);
    case constants.TOGGLE_MENU:
      return state.setIn(['menu', 'isOpen'], !state.get('menu').get('isOpen'));
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
