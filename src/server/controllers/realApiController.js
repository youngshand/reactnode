/**
 * The dummy api
 * This api can be used to develop with when the live api is not accessible.
 * See this google doc for the api specs
 * https://docs.google.com/document/d/1GvmZ-mPAHX8T1GbstOLtPLRj6DQzt3RQZsmIwKKC0kI/edit
 */
import request from 'request';
import debugCache from '../debug';
import { REAL_API_HOST, REAL_API_PATHNAME_PREFIX } from '../config';

/**
 * Resource configs for retrieving data from the real api.
 * Each resource requires a full url to retrieve the resource from.
 */
const resources = {
  settings: {
    url: `${REAL_API_HOST}${REAL_API_PATHNAME_PREFIX}settings`
  },
  statusCodes: {
    url: `${REAL_API_HOST}${REAL_API_PATHNAME_PREFIX}status-codes`
  },
  pages: {
    url: `${REAL_API_HOST}${REAL_API_PATHNAME_PREFIX}pages`
  },
  posts: {
    url: `${REAL_API_HOST}${REAL_API_PATHNAME_PREFIX}posts`
  },
  configs: {
    url: `${REAL_API_HOST}${REAL_API_PATHNAME_PREFIX}configs`
  }
};

function getResource(resource) {
  return new Promise((resolve, reject) => {
    request.get(resource.url, (err, res, data) => {
      if (err) {
        debugCache.save(`Failed to read <${resource.url}>`, JSON.stringify(err));
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          debugCache.save(`Failed parse json from <${resource.url}>`, JSON.stringify(e));
          reject(e);
        }
      }
    });
  });
}

class RealApiController {

  static async settings(req, res) {
    res.json(await getResource(resources.settings));
  }

  static async statusCodes(req, res) {
    res.json(await getResource(resources.statusCodes));
  }

  static async pages(req, res) {
    res.json(await getResource(resources.pages));
  }

  static async posts(req, res) {
    res.json(await getResource(resources.posts));
  }

  static async config(req, res) {
    res.json(await getResource(resources.config));
  }
}

export default RealApiController;
