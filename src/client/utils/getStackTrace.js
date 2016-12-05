// @flow
export default function getStackTrace() {
  let obj = {};
  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack;
}
