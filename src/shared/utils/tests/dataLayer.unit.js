import { assert } from 'chai';
import { pageView } from '../dataLayer';
require('jsdom-global')();

describe('dataLayer', () => {

  /**
   * Test virtualPageview function
   */
  it('should push a pageView to the dataLayer', () => {
    window.dataLayer = [];

    pageView('http://test.dev/page');
    assert.propertyVal(window.dataLayer[0], 'virtualUrl', 'http://test.dev/page');
  });

});
