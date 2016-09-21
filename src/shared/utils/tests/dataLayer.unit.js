import { assert } from 'chai';
import { jsdom } from 'jsdom';
import { pageView } from '../dataLayer';

describe('dataLayer', () => {

  /**
   * Test virtualPageview function
   */
  it('should push a pageView to the dataLayer', () => {
    global.document = jsdom('');
    global.window = document.defaultView;
    global.window.dataLayer = [];

    pageView('http://test.dev/page');
    assert.propertyVal(window.dataLayer[0], 'virtualUrl', 'http://test.dev/page');
  });

});
