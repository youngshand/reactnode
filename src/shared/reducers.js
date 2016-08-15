import { constants } from './actions';
import set from 'lodash/set';
import merge from 'lodash/merge';


/**
 * Reducer function responds to application events
 * and updates the application state.
 *
 * Redux always expects to have a new state object returned.
 * The Object.assign function can ensure this happens but not with nested objects.
 * If you need to update nested properties Lodash's merge can be used
 * in combination with set to trigger redux updates on a nested object.
 *
 * For more information:
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * https://lodash.com/docs#set
 * https://lodash.com/docs#merge
 */
export default function reducer(state, action) {
  switch (action.type) {
    case constants.OPEN_MENU:
      return merge({}, set(state, 'menu.isOpen', true));
    case constants.CLOSE_MENU:
      return merge({}, set(state, 'menu.isOpen', false));
    case constants.TOGGLE_MENU:
      return merge({}, set(state, 'menu.isOpen', !state.menu.isOpen));
    case constants.NAVIGATE_TO:
      return Object.assign({}, set(state, 'location', action.location));
    default:
      return state;
  }
}
