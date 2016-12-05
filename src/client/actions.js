// @flow
const constants = {
  RECEIVE_POSTS: 'RECEIVE_POSTS',
  RECEIVE_SETTINGS: 'RECEIVE_SETTINGS',
  RECEIVE_PAGES: 'RECEIVE_PAGES',

  OPEN_MENU: 'OPEN_MENU',
  CLOSE_MENU: 'CLOSE_MENU',
  TOGGLE_MENU: 'TOGGLE_MENU',

  NAVIGATE_TO: 'NAVIGATE_TO',

  ACTIVATE_MODAL: 'ACTIVATE_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  TOGGLE_MODAL: 'TOGGLE_MODAL'
};


export function receiveSettings(settings:Object) {
  return {
    type: constants.RECEIVE_SETTINGS,
    settings
  };
}

export function receivePages(pages:Object) {
  return {
    type: constants.RECEIVE_PAGES,
    pages
  };
}

export function receivePosts(posts:Object) {
  return {
    type: constants.RECEIVE_POSTS,
    posts
  };
}

export function openMenu() {
  return {
    type: constants.OPEN_MENU
  };
}

export function closeMenu() {
  return {
    type: constants.CLOSE_MENU
  };
}

export function toggleMenu() {
  return {
    type: constants.TOGGLE_MENU
  };
}

export function navigateTo(location:Object) {
  return {
    type: constants.NAVIGATE_TO,
    location
  };
}

export function activateModal(modalTag:string) {
  return {
    type: constants.ACTIVATE_MODAL,
    modalTag
  };
}

export function closeModal(modalTag:string){
  return {
    type: constants.CLOSE_MODAL,
    modalTag
  };
}

export function toggleModal(modalTag:string) {
  return {
    type: constants.TOGGLE_MODAL,
    modalTag
  };
}

export { constants };
