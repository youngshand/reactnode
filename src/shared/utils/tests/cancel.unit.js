import { cancelablePromise } from '../cancel';
import { assert } from 'chai';

describe('cancelablePromise', () => {

  it('should resolve a given promise', (done) => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        assert.ok(true);
        resolve();
      }, 50);
    });

    // call the done method when the promise is complete
    cancelablePromise(promise).promise.then(done);
  });

  it('should not run a canceled promise', (done) => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 300);
      });

      const cp = cancelablePromise(promise)

      // the then call back should not be called
      cp.promise.then(() => {
        done(new Error('The promise\'s then method should not be reached when cancelled'));
      });

      // the catch should be called but it should have the isCanceled property set to true
      cp.promise.catch((err) => {
        if (err.isCanceled) {
          done();
        } else {
          done(new Error(err));
        }
      });

      // cancel the promise before the child promise succeeds
      // setTimeout(() => cp.cancel(), 30);
  });

});
