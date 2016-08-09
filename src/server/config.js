export const ENV = process.env.NODE_ENV || 'local';
export const SERVER_RENDERING = true;

export const API_HOSTS = {
	local: 'http://gta-api.dev',
	staging: 'http://gta-api.beingbui.lt',
	production: 'http://gta-api.beingbui.lt'
};

export const REAL_API_HOST = API_HOSTS[ENV];
export const REAL_API_PATHNAME_PREFIX = '/wp-json/gta/';

export const DEV_PORT = process.env.DEV_PORT || 8080;
export const PORT = process.env.PORT || 3001;
export const LOCALHOST = `http://localhost:${PORT}`;

// TODO: Use api to determin live host in v2
export const LIVE_HOST = 'http://gta-api.beingbui.lt';
export const STAGING_HOST = 'http://gta-api.beingbui.lt';
export const HOST = ENV === 'production' ? LIVE_HOST : ENV === 'staging' ? STAGING_HOST : LOCALHOST;

export const DEFAULT_SOURCE_API = 'real';
export const REAL_API = `${LOCALHOST}/api/real`;
export const DUMMY_API = `${LOCALHOST}/api/dummy`;
export const CACHE_API = `${LOCALHOST}/api/cache`;

export const REDIS_KEY = 'GTA';
