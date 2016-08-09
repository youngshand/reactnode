import debugCache from '../debug';

export default async (req, res) => {
	const debug = await debugCache.get();

	const title = debug[req.params.id].title;
	const message = debug[req.params.id].message;
	const timestamp = debug[req.params.id].timestamp;

	res.status(200).render('debug', {
		title, message, timestamp
	});
};
