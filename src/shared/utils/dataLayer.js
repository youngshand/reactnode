import has from 'lodash/has';

/**
 * Adds a virtual pageview to the datalayer if it is avalible.
 *
 * @param {string} url The url to record in the datalayer
 */
export function pageView(url) {
  if (has(window, 'dataLayer')) {
    window.dataLayer.push({ 'event': 'virtualPageview', 'virtualUrl': url });
  }
}

