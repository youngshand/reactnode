import _ from 'lodash';

const MATCH_TYPES = {
  EXACT: 'EXACT',
  PARTIAL: 'PARTIAL'
};

/**
 * Returns a segment of the larger string which the query occurs within.
 * @param {string} str - The string to trim
 * @param {string} key - The key to look for when trimming
 * @param {number} padding - How much surrounding characters to include
 */
function trim(str, key, padding) {
  // padding is an optional param
  padding = _.isNumber(padding) && padding > 0 ? padding : 2;

  let start;
  let end;

  if (!(str.indexOf(key) - padding < 0)) {
    start = str.indexOf(key) - padding;
  } else {
    start = 0;
  }

  if (!(str.indexOf(key) + key.length + padding < str.length)) {
    end = str.indexOf(key) + key.length + padding;
  } else {
    end = str.length;
  }

  return str.slice(start, end);
}

/**
 * Attempts to find a value in a string or number.
 * @param {any} item - The item to look in
 * @param {string} queryString - The query string
 */
function findValue(item, queryString) {
  if (item === queryString) {
    return {
      type: MATCH_TYPES.EXACT,
      snip: queryString
    };
  }
  if (_.isString(item) && _.includes(item.toLowerCase(), queryString.toLowerCase())) {
    return {
      type: MATCH_TYPES.PARTIAL,
      snip: trim(item, queryString)
    };
  }

  return false;
}

/**
 * Recursively deep searches for value matches in an object or array and returns
 * an array of match objects like so:
 *
 * // for the query `brown` in `how now brown cow`
 *
 * ```
 * {
 *   path: 'path.to[4].a',
 *   snipt: 'ow brown co',
 *   type: 'PARTIAL'
 * }
 *
 * @param {any} obj - The object to look for a match or perform a search on
 * @param {string} query - The query string
 * @param {number} depth - The limit for how many recursions deep the search can
 *                        go when looking for a match
 *
 * @return {array}        An array of matches
 */
function search(obj, queryString, depth = 3, path = '') {
  const results = [];

  if (_.isArray(obj) || _.isPlainObject(obj)) {
    _.forEach(obj, (o, identity) => {
      // construct the path to this object
      const p = path + (
        _.isArray(obj) ? `[${identity}]` : `.${identity}`
      );

      if (_.isArray(o) || _.isPlainObject(o)) {
        // search deeper into the object
        const res = search(o, queryString, depth - 1, p);

        if (!_.isEmpty(res)) {
          results.push(...res);
        }
      } else {
        const res = findValue(o, queryString);
        if (res !== false) {
          results.push({
            path: p,
            ...res
          });
        }
      }
    });
  }

  return results;
}

/**
 * Queries a list of any object for matching values.
 * @param {array} dataList - An array of values
 * @param {string} queryString - The string to find occurances of
 * @param {number} depth - How deep into objects and arrays to look
 */
export default function (dataList, queryString, depth = 3) {
  const matches = [];
  _.forEach(dataList, (d) => {
    const results = search(d, queryString, depth);

    if (!_.isEmpty(results)) {
      matches.push({
        object: d,
        results
      });
    }
  });

  return matches;
}
