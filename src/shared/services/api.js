/**
 * Examples for posting newsletters and contact forms
 */

/**

Api.post('/api/contact', {
  name: 'Frontend Test',
  email: 'matthew.quinn@youngshand.com',
  phone: '1234567890',
  message: 'Testing Testing, 1, 2, 3...'
});


Api.post('/api/newsletter', {
  name: 'Frontend Test',
  email: 'matthew.quinn@youngshand.com',
});

*/

import request from 'superagent';
let Promise = require('es6-promise').Promise;

/**
* Wrapper for calling a API
*/
var Api = {
  get: function (url) {
    return new Promise(function (resolve, reject) {
      request
        .get(url)
        .end(function (err, res) {
          if (res.status === 404) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  }
};

export default Api;
