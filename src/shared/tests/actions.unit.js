import { assert } from 'chai';
import * as actions from '../actions';

describe('actions', () => {

  /**
   * Test recieve settings action
   */
  it('should recieve settings', () => {
    const settings = {'logo':[],'favicon':[],'title':'Title','description':'Description'};
    const expectedAction = {
      type: actions.constants.RECEIVE_SETTINGS,
      settings
    };
    assert.deepEqual(actions.receiveSettings(settings), expectedAction);
  });

  /**
   * Test recieve pages action
   */
  it('should recieve pages', () => {
    const pages = [{'id':22,'title':'Page','slug':'page','path':'\/page','date':'2016-09-12 23:32:11'}];
    const expectedAction = {
      type: actions.constants.RECEIVE_PAGES,
      pages
    };
    assert.deepEqual(actions.receivePages(pages), expectedAction);
  });

  /**
   * Test recieve posts action
   */
  it('should recieve posts', () => {
    const posts = [{'id':22,'title':'Post','slug':'post','path':'\/post','date':'2016-09-15 22:35:19'}];
    const expectedAction = {
      type: actions.constants.RECEIVE_POSTS,
      posts
    };
    assert.deepEqual(actions.receivePosts(posts), expectedAction);
  });

  /**
   * Test open menu action
   */
  it('should open menu', () => {
    const expectedAction = {
      type: actions.constants.OPEN_MENU
    };
    assert.deepEqual(actions.openMenu(), expectedAction);
  });

  /**
   * Test close menu action
   */
  it('should open menu', () => {
    const expectedAction = {
      type: actions.constants.CLOSE_MENU
    };
    assert.deepEqual(actions.closeMenu(), expectedAction);
  });

  /**
   * Test toggle menu action
   */
  it('should toggle menu', () => {
    const expectedAction = {
      type: actions.constants.TOGGLE_MENU
    };
    assert.deepEqual(actions.toggleMenu(), expectedAction);
  });

  /**
   * Test navigate to action
   */
  it('should navigate to', () => {
    const location = {'pathname': '/page'};
    const expectedAction = {
      type: actions.constants.NAVIGATE_TO,
      location
    };
    assert.deepEqual(actions.navigateTo(location), expectedAction);
  });

  /**
   * Test activate modal action
   */
  it('should active a modal', () => {
    const modalTag = 'terms';
    const expectedAction = {
      type: actions.constants.ACTIVATE_MODAL,
      modalTag
    };
    assert.deepEqual(actions.activateModal(modalTag), expectedAction);
  });

  /**
   * Test close modal action
   */
  it('should close a modal', () => {
    const modalTag = 'terms';
    const expectedAction = {
      type: actions.constants.CLOSE_MODAL,
      modalTag
    };
    assert.deepEqual(actions.closeModal(modalTag), expectedAction);
  });

  /**
   * Test toggle modal action
   */
  it('should toggle a modal', () => {
    const modalTag = 'terms';
    const expectedAction = {
      type: actions.constants.TOGGLE_MODAL,
      modalTag
    };
    assert.deepEqual(actions.toggleModal(modalTag), expectedAction);
  });

});
