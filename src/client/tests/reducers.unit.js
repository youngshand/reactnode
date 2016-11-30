import { assert } from 'chai';
import reducer from '../reducers';
import * as actions from '../actions';

describe('reducers', () => {

  /**
   * Test navigate to reducer
   */
  it('should update location state', () => {
    const location = {'pathname': '/page'};
    const action = {
      type: actions.constants.NAVIGATE_TO,
      location
    };
    assert.deepEqual(reducer({}, action), { location });
  });

  /**
   * Test open menu reducer
   */
  it('should update menu state to open', () => {
    const action = {
      type: actions.constants.OPEN_MENU
    };
    const expectedState = {'menu': {'isOpen': true}};
    assert.deepEqual(reducer({}, action), expectedState);
  });

  /**
   * Test close menu reducer
   */
  it('should update menu state to closed', () => {
    const action = {
      type: actions.constants.CLOSE_MENU
    };
    const expectedState = {'menu': {'isOpen': false}};
    assert.deepEqual(reducer({}, action), expectedState);
  });

  /**
   * Test toggle menu reducer
   */
  it('should update menu state to the opposite', () => {
    const action = {
      type: actions.constants.TOGGLE_MENU
    };
    const openState = {'menu': {'isOpen': true}};
    const expectedClosedState = {'menu': {'isOpen': false}};
    assert.deepEqual(reducer(openState, action), expectedClosedState);
  });

  /**
   * Test activate modal reducer
   */
  it('should update modal state to active', () => {
    const action = {
      type: actions.constants.ACTIVATE_MODAL,
      modalTag: 'terms'
    };
    const expectedState = {'modals': {
      'terms': {'isActive': true}
    }};
    assert.deepEqual(reducer({}, action), expectedState);
  });

  /**
   * Test deactivate modal reducer
   */
  it('should update modal state to inactive', () => {
    const action = {
      type: actions.constants.CLOSE_MODAL,
      modalTag: 'terms'
    };
    const expectedState = {'modals': {
      'terms': {'isActive': false}
    }};
    assert.deepEqual(reducer({}, action), expectedState);
  });

  /**
   * Test toggle modal reducer
   */
  it('should update modal state to the opposite', () => {
    const action = {
      type: actions.constants.TOGGLE_MODAL,
      modalTag: 'terms'
    };
    const activeState = {'modals': {
      'terms': {'isActive': true}
    }};
    const expectedInactiveState = {'modals': {
      'terms': {'isActive': false}
    }};
    assert.deepEqual(reducer(activeState, action), expectedInactiveState);
  });

});
