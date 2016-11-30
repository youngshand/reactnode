import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from '../config/webpack.config.dev';

const DEV_PORT = process.env.DEV_PORT || 8080;

var server = new WebpackDevServer(webpack(config), {
  // webpack-dev-server options
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true }
});

server.listen(DEV_PORT, 'localhost', function() {
  console.log('WEBPACK SERVER RUNNING', `localhost:${DEV_PORT}`);
});
