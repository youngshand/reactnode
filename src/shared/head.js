// import _ from 'lodash';
//
// /**
//  * Links a `page.template` to a resource name
//  */
// const childResources = {
// 	products: 'products',
// };
//
// /**
//  * Returns a page,
//  */
// function findSeoResource(location, state) {
// 	let seoObject = _.find(_.result(state, 'pages'), p => p.template === '404');
//
//
// 	// remove any trailing slash from the location
// 	if (_.endsWith(location, '/')) location = location.slice(0, location.length - 1);
//
// 	if (location === '') {
// 	seoObject = _.find(state.pages, (p) => p.path === '/');
// 		seoObject.type = 'page';
// 	} else {
// 		_.some(state.pages, (page) => {
// 			let hasFoundSeo = false;
//
// 			if (page.path === '/') {
// 				// ignore the home page
// 			} else if (page.path === location) {
// 				// the user is viewing this page
// 				seoObject = page;
// 				seoObject.type = 'page';
// 				hasFoundSeo = true;
// 			} else if (_.includes(location, page.path)) {
// 				// the user is viewing this page's child type
// 				const slug = _.replace(_.last(_.split(location, page.path)), '/', '');
//
// 				// search the child type of this page for an object with a matching slug in the rest
// 				if (_.includes(childResources, page.template)) {
// 					const children = state[childResources[page.template]];
//
// 					const child = _.find(children, child => child.slug === slug);
// 					if (child) {
// 						 seoObject = child;
// 						 seoObject.type = childResources[page.template];
// 						 hasFoundSeo = true;
// 					}
// 				}
// 			}
//
// 			return hasFoundSeo;
// 		});
// 	}
//
// 	return seoObject;
// }
//
// export default function getHead(pathname, state) {
// 	let seo;
// 	const settings = state.settings;
// 	const seoResource = findSeoResource(pathname, state);
//
// 	if (_.endsWith(pathname, '/') && pathname !== '/') pathname = pathname.slice(0, pathname.length - 1);
//
//
// 	if (_.result(seoResource, 'type') === 'products') {
// 		const title = `${_.result(seoResource, 'title')} - ${settings.site.title}`;
// 		const description = _.result(seoResource, 'description');
// 		const image = _.result(seoResource, 'image');
//
// 		seo = {
// 			title: title,
// 			siteName: _.result(settings, 'seo.siteName'),
// 			type: _.result(settings, 'seo.type'),
// 			fbAdmins: _.result(settings, 'seo.fbAdmins'),
// 			schema: _.result(settings, 'seo.schema'),
// 			GTM: _.result(settings, 'seo.GTM'),
// 			meta: [
// 				{ property: 'og:url', content: `${_.result(settings, 'site.siteUrl')}${pathname}` },
// 				{ property: 'og:title', content: title },
// 				{ name: 'twitter:title', content: title },
// 			]
// 		};
//
// 		if (description) {
// 			seo.meta.push({ name: 'description', content: description });
// 			seo.meta.push({ property: 'og:description', content: description });
// 			seo.meta.push({ name: 'twitter:description', content: description });
// 		}
//
// 		if (image) {
// 			seo.meta.push({ property: 'og:image', content: image });
// 			seo.meta.push({ name: 'twitter:image', content: image });
// 			seo.meta.push({ name: 'twitter:card', content: 'summary_large_image' });
// 		} else {
// 			seo.meta.push({ name: 'twitter:card', content: 'summary' });
// 		}
// 	} else {
// 		// always have the page title preceeding the site tile
// 		const title = _.result(seoResource, 'seo.ogAndMeta.title') !== settings.seo.title
// 							  ? `${_.result(seoResource, 'seo.ogAndMeta.title')} - ${settings.site.title}`
// 								: `${_.result(seoResource, 'title')} - ${settings.site.title}`;
//
// 		// favour the page description and don't fallback
// 		const description = _.result(seoResource, 'seo.ogAndMeta.description') !== settings.seo.description
// 												? _.result(seoResource, 'seo.ogAndMeta.description') : settings.seo.description;
//
// 		// favour the page seo image and fallback to the site seo image
// 		const image = _.result(seoResource, 'seo.ogAndMeta.image.url') || _.result(settings, 'seo.image.url');
//
// 		seo = {
// 			title,
// 			siteName: _.result(seoResource, 'seo.ogAndMeta.siteName'),
// 			type: _.result(seoResource, 'seo.ogAndMeta.type'),
// 			fbAdmins: _.result(seoResource, 'seo.ogAndMeta.fbAdmins'),
// 			schema: _.result(seoResource, 'seo.ogAndMeta.schema'),
// 			GTM: _.result(settings, 'seo.GTM'),
// 			meta: [
// 				{ property: 'og:url', content: `${_.result(settings, 'site.siteUrl')}${pathname}` },
// 			]
// 		};
//
// 		if (title) {
// 			seo.meta.push({ property: 'og:title', content: title })
// 			seo.meta.push({ name: 'twitter:title', content: title })
// 		}
// 		if (description) {
// 			seo.meta.push({ name: 'description', content: description });
// 			seo.meta.push({ property: 'og:description', content: description });
// 			seo.meta.push({ name: 'twitter:description', content: description });
// 		}
// 		if (image) {
// 			seo.meta.push({ property: 'og:image', content: image });
// 			seo.meta.push({ name: 'twitter:image', content: image });
// 			// seo.meta.push({ name: 'twitter:card', content: 'summary_large_image' });
// 			seo.meta.push({ name: 'twitter:card', content: 'summary' });
// 		} else {
// 			seo.meta.push({ name: 'twitter:card', content: 'summary' });
// 		}
//
// 	}
//
// 	return seo;
// }
