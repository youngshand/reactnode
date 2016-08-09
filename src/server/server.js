import app from './app';
import { PORT, LOCALHOST, ENV } from './config';
import browserSync from 'browser-sync';
import updateAPI from './updateAPI';

browserSync.use({
    plugin: function () { /* noop */},
    hooks: {
        'client:js': require('fs').readFileSync(__dirname + '/reloader.js', 'utf-8')
    }
});

app.listen(PORT, () => {

  // Load up browserSync if we're on a local dev environment
  if (ENV === 'local') {
    browserSync({
      proxy: 'localhost:' + PORT,
      files: {
        match: ['public/**/*.{js,css}']
      },
      open: false
    });
  }

  console.log(`Listening on ${LOCALHOST}`);

  // Fire off an API update on server start
  updateAPI();

});
