import Index from './indexes';
import { ENV } from './config';
import { settingsCache, pageCache, postCache } from './cache';
import { pathIndex } from './indexes';

/**
 * initail state defaults build upon the index to make sure non api data
 * has a default configuration.
 */
const initailStateDefaults = {
  env: ENV
};


/**
 * Stores the initial state of the redux store.
 * @extends Index
 * @param {string} key - The key for this cache resource
 * @param {string} namespace - The namespace to save the resource under
 */
class InitialStateIndex extends Index {

  async get() {
    return new Promise(async (resolve, reject) => {
      try {
        const initialState = initailStateDefaults;
        // add resource cache
        initialState.settings = await settingsCache.get() || {};
        initialState.pages = await pageCache.get() || [];
        initialState.posts = await postCache.get() || [];
        initialState.paths = await pathIndex.get() || [];

        resolve(initialState);
      } catch (e) {
        reject(e);
      }
    });
  }

  async build() {
    return super._save(this.initialState);
  }

}

export default InitialStateIndex;
