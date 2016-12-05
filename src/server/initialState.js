// @flow
import { ENV } from '../config/config';

/**
 * initail state defaults build upon the index to make sure non api data
 * has a default configuration.
 */

export default {
  env: ENV,
  menu: {
    isOpen: false
  },
  settings: {
    favicon: false
  },
  modals: {}
};
