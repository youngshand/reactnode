import uuid from 'node-uuid';
import superagent from 'superagent';
import Cache from './cache';

import { HOST } from './config'

class DebugCache extends Cache {

	async save(title, message) {
		const id = uuid.v1();
		const link = `${HOST}/debug/${id}`;
		const cache = await super.get() || {};

		cache[id] = {
			title,
			message
		};

		superagent.post('https://hooks.slack.com/services/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')
			.send({ text: `${title} <${link}>}` })
			.end((err) => console.error('ERR', err));

		return super.save(cache);
	}

}

export default new DebugCache('debug');
