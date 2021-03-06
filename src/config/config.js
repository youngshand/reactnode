export const ENV = process.env.NODE_ENV || 'local';
export const SERVER_RENDERING = true;

export const DEV_PORT = process.env.DEV_PORT || 8080;
export const PORT = process.env.PORT || 3001;
export const LOCALHOST = `http://localhost:${PORT}`;

// TODO: Use api to determin live host in v2
export const LIVE_HOST = 'http://gta-api.beingbui.lt';
export const STAGING_HOST = 'http://gta-api.beingbui.lt';
export const HOST = ENV === 'production' ? LIVE_HOST : ENV === 'staging' ? STAGING_HOST : LOCALHOST;

export const DB_NAME = 'vogels_census';
