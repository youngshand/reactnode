// @flow
import { PORT } from '../../config/config';
import request from 'request';

export default function updateAPI(){
  console.log('[Called from server.js] Updating the API')
  request.get(`http://localhost:${PORT}/api/update`, (e, r) => {
    console.log('[API Cache Updater] Request Accepted')
    if(e){
      console.log('[API Cache Updater] ', e);
    }else{
      console.log('[API Cache Updater] ', r.body);
    }
  });
}
