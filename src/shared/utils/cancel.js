/**
 * For more information see:
 * https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
 *
 * Helper to prevent state errors when running setState asyncronosly on components.
 * The normal use case is to pass in a new Promise and store the returned cancel function in
 * the component's state. Attach `then` and `catch` callbacks
 * to the returned promise. The returned promise and cancel function are both properties of
 * a returned object.
 *
 * Example use case:
 *
 * ```
 * const cancelableMessage = cancelablePromise(new Promise((resolve) => {
 *  setTimeout(() => {
 *    resolve();
 *  }, 10000);
 * }));
 *
 * cancelableMessage.promise.then(() => {
 *  this.setState({ msg: 'You stuck around' })
 * });
 *
 * // make the cancel function avaliable in the state
 * this.setState({ cancel: cancelableMessage.cancel });
 *
 * // to cancel when unmounting add this to your componentWillUnmount()
 * if (this.state.cancel) this.state.cancel();
 * ```
 * @returns {object} An object containing the cancelable promise and cancel function.
 * @returns {Promise} obj.promise The cancelable promise object
 * @returns {function} obj.cancel The function to call when canceling the promise
 */
export function cancelablePromise(promise) {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    // check if cancel has been called before calling the cancelable promise
    promise.then((val) =>
      hasCanceled ? reject({ isCanceled: true }) : resolve(val)
    );
    promise.catch((error) =>
      hasCanceled ? reject({ isCanceled: true }) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    }
  };
}

/**
 * Makeing requests on the frontend is a common way to cause set state errors on unmounted components.
 * The cancelable request function takes a superagent request as an argument and adds it's own
 * on end() callback. A cancelable promise is returned.
 *
 * @param {superagent} request A superagent request object
 * @returns {object} An object containing the cancelable promise and cancel function.
 * @returns {Promise} obj.promise The cancelable promise object
 * @returns {function} obj.cancel The function to call when canceling the promise
 */
export function cancelableRequest(request) {
  return cancelablePromise(new Promise((resolve, reject) => {
    request.end((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }));
}
