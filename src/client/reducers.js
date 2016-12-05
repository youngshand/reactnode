// @flow
import { constants } from './actions';
import set from 'lodash/set';
import result from 'lodash/result';
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
export default function reducer(state: Object, action: Object) {
  switch (action.type) {
    /**
     * Location
     */
    case constants.NAVIGATE_TO:
      return Object.assign({}, set(state, 'location', action.location));

    /**
     * Menu
     */
    case constants.OPEN_MENU:
      return merge({}, set(state, 'menu.isOpen', true));
    case constants.CLOSE_MENU:
      return merge({}, set(state, 'menu.isOpen', false));
    case constants.TOGGLE_MENU:
      return merge({}, set(state, 'menu.isOpen', !state.menu.isOpen));

    /**
     * Modals
     */
    case constants.ACTIVATE_MODAL:
      return merge({}, set(state, `modals[${action.modalTag}].isActive`, true));
    case constants.CLOSE_MODAL:
      return merge({}, set(state, `modals[${action.modalTag}].isActive`, false));

    // eslint-disable-next-line no-case-declarations
    case constants.TOGGLE_MODAL:
      const isActive = !result(state, `modals[${action.modalTag}].isActive`, false);
      return merge({}, set(state, `modals.[${action.modalTag}].isActive`, isActive));

    default:
      return state;
  }
}
