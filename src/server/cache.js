import _ from 'lodash';
import redis from 'redis';
import { REDIS_KEY } from './config';

/**
 * Cache
 *
 * Provides access to saving data to and retrieving data from the redis cache.
 * An optional namespace can be provided but this is more for testing reasons.
 *
 * @param {string} key - The key for this cache resource
 * @param {string} namespace - The namespace to save the resource under
 *                             defaults to the config's REDIS_KEY
 */
class Cache {

  constructor(key, namespace = REDIS_KEY) {
    this.key = key;
    this.namespace = namespace;
  }

  /**
   * Saves data to the cache.
   * @param {any} data - Data of any type which is json serilizable
   * @returns {Promise} - A promise which is resolved when the saving has completed
   */
  save(data) {
    const client = redis.createClient();

    return new Promise((resolve) => {
      client.hset(this.namespace, this.key, JSON.stringify(data), () => {
        client.quit();
        resolve();
      });
    });
  }

  /**
   * Removes any existing cache under the namespace and key.
   */
  destroy() {
    const client = redis.createClient();
    client.hdel(this.namespace, this.key, () => client.quit());
  }

  /**
   * Returns the cached data.
   * @returns {Promise} - A promise which is resolved when the data is retrived
   *                      data will be present in the resolve arguments.
   */
  get() {
    const client = redis.createClient();

    return new Promise((resolve, reject) => {
      client.hget(this.namespace, this.key, (err, data) => {
        client.quit();

        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  /**
   * Convenience function for cached objects and arrays.
   * Attempts to find an item within the cached resource.
   *
   * @returns {any|undefined} - Returns the object if found or returns undefined
   */
  async find(key, val) {
    try {
      const data = await this.get();
      return _.find(data, (d) => _.result(d, key) === val);
    } catch (e) {
      throw e;
    }
  }
}

/*
 * Resource cache.
 * These are the instances we should be dealing with when
 * caching application data.
 */
const settingsCache = new Cache('settings');
const pageCache = new Cache('page');
const postCache = new Cache('post');

export {
  Cache as default,
  settingsCache,
  pageCache,
  postCache
};
