
const constants = {
  RECEIVE_POSTs: 'RECEIVE_POSTS',
  RECEIVE_SETTINGS: 'RECEIVE_SETTINGS',
  RECEIVE_PAGES: 'RECEIVE_PAGES',

  OPEN_MENU: 'OPEN_MENU',
  CLOSE_MENU: 'CLOSE_MENU',
  TOGGLE_MENU: 'TOGGLE_MENU'
};


export function receiveSettings(settings) {
  return {
    type: constants.RECEIVE_SETTINGS,
    settings
  };
}

export function receivePages(pages) {
  return {
    type: constants.RECEIVE_PAGES,
    pages
  };
}

export function receivePosts(posts) {
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

export { constants };
