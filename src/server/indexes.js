import _ from 'lodash';
import Cache from './cache';
import { pageCache, postCache } from './cache';

/**
 * Base index class
 *
 * Extends upon Cache to build custom application indexes and save to redis.
 * This class should be extended with it's own custom build method.
 *
 * @extends Cache
 * @param {string} key - The key for this cache resource
 * @param {string} namespace - The namespace to save the resource under
 */
class Index extends Cache {

  /**
   * prevent public access to the save function, use build instead
   * @override
   */
  save() {
    const error = 'An index should not be accessed via it\'s public save method. ' +
                  'Use the build method instead';
    throw new Error(error);
  }

  /**
   * private access to super save function
   * @param {any} index - The index
   * @returns {Promise} - A promise which is resolved when the saving has completed
   */
  _save(index) {
    return super.save(index);
  }

  /**
   * Public method to build the new cache.
   * @abstract
   */
  build() {
    throw new Error('build method must be implemented in subclass');
  }
}

/**
 * Path Index
 *
 * Stores status return codes and redirect paths for paths.
 * @extends Index
 * @param {string} key - The key for this cache resource
 * @param {string} namespace - The namespace to save the resource under
 */
class PathIndex extends Index {

  /**
   * Buides the path cache for all resources.
   * @override
   * @returns {Promise} - A promise which is resolved when the build is complete
   */
  async build() {
    const index = {};
    const pages = await pageCache.get();
    const posts = await postCache.get();

    // create cache for resource types
    _.forEach(pages, (page) => {

      if (!_.includes(index, `${page.path}`)) {
        index[`${page.path}`] = {
          status: 200,
          type: 'page'
        };
      }

    });

    _.forEach(posts, (post) => {

      if (!_.includes(index, `${post.path}`)) {
        index[`${post.path}`] = {
          status: 200,
          type: 'post'
        };
      }

    });

    // return the save promise
    return super._save(index);
  }

}

/*
 * Indexes.
 * These are the instances we should be dealing with when
 * building an index.
 */
const pathIndex = new PathIndex('pathIndex');

export { PathIndex };
export { Index as default, pathIndex };
