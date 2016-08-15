import _ from 'lodash';
import request from 'request';
import { DEFAULT_SOURCE_API, LOCALHOST } from '../config';
import { settingsCache, pageCache, postCache } from '../cache';
import debugCache from '../debug';
import { sitesConfigIndex, pathIndex } from '../indexes';

const resources = {
  settings: {
    slug: 'settings',
    cache: settingsCache,
    dummy: false
  },
  pages: {
    slug: 'pages',
    cache: pageCache,
    dummy: false
  },
  posts: {
    slug: 'posts',
    cache: postCache,
    dummy: false
  }
};

/**
 * Checks that the url response of an endpoint has valid json
 */
function testEndpoint(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, response, data) => {
      if (err) {
        debugCache.save(`Failed to make api update request to <${url}>`, JSON.stringify(err));
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          debugCache.save(`Failed parse json from <${url}>`, JSON.stringify(e));
          reject(e);
        }
      }
    });
  });
}

/**
 * Saves the url response to a resources cache
 */
function updator(url, resource) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, response, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          data = JSON.parse(data);

          if (_.includes(_.result(data, 'data.status'), 404)) {
            if (resource.fallback) {
              resource.cache.save(resource.fallback);
              resolve();
            } else {
              resolve();
            }
          } else {
            resource.cache.save(data);
            resolve();
          }
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}

class ApiUpdaterController {

  /**
   * Updates the entire application cache and rebuilds indexes
   */
  static async update(req, res) {
    let error;

    if (!error) {
      try {
        await Promise.all(_.map(resources, async (resource) => {
          // while the live api is a work in progress we will support sourcing
          // from the dummy api
          const url = `${LOCALHOST}/api/${DEFAULT_SOURCE_API}/${resource.slug}`;

          return testEndpoint(url, resource);
        }));
      } catch (e) {
        // an error occured when parsing the endpoint json.
        // skip updating the cache
        debugCache.save('Failed parse json', JSON.stringify(e), e);

        error = e;
      }
    }

    if (!error) {
      try {

        // update cache, nothing should fail now that we have pre-tested the json responses
        await Promise.all(_.map(resources, async (resource) => {
          // while the live api is a work in progress we will support sourcing
          // from the dummy api
          const url = `${LOCALHOST}/api/${DEFAULT_SOURCE_API}/${resource.slug}`;

          // returns when the cache has updated for this resource
          return updator(url, resource);
        }));
      } catch (e) {
        error = e;
      }
    }

    if (error) {
      res.status(500).send(error.toString());
    } else {
      // update the indexes
      try {
        await pathIndex.build();

        res.status(200).send(`Cache updated using the ${DEFAULT_SOURCE_API} api.`);
      } catch (e) { console.trace(e); }
    }
  }

  /**
   * Updates an individual resource and related indexes
   */
  static updateResource(req, res) {
    res.sendStatus(200);
  }

  /**
   * Route for pushing new site configs to.
   */
  static async updateSitesConfig(req, res) {
    const siteConfig = req.body.config;

    try {
      await sitesConfigIndex.build(siteConfig);
      res.status(200).send();
    } catch (e) {
      console.trace(e);
      res.status(400).send(e.toString());
    }
  }

}

export default ApiUpdaterController;
