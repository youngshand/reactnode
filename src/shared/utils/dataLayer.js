import _ from 'lodash';

export function pageView(url) {
  if (_.has(window, 'dataLayer')) {
    window.dataLayer.push({'event':'virtualPageview', 'virtualUrl': url});
  }
}

export function buyNow() {
	if (_.has(window, 'dataLayer')) {
		window.dataLayer.push({ event: 'buy-now' });
	}
}

export function contactComplete() {
	if (_.has(window, 'dataLayer')) {
		window.dataLayer.push({ event: 'contact-complete' });
	}
}
