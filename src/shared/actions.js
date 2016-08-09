
const constants = {
  RECEIVE_POSTs: 'RECEIVE_POSTS',
  RECEIVE_SETTINGS: 'RECEIVE_SETTINGS',
  RECEIVE_PAGES: 'RECEIVE_PAGES'
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

export { constants };
