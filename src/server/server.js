import app from './app';
import { PORT, LOCALHOST } from '../config/config';
// import updateAPI from './updateAPI';

app.listen(PORT, () => {
  console.log(`Listening on ${LOCALHOST}`);

  // Fire off an API update on server start
  // updateAPI();
});
