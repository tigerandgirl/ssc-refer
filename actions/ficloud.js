import api from '../api';

export function getData(postData) {
  return {
    type: 'GETDATA',
    payload: {
      promise: api.post('/ficloud/refbase_ctr/queryRefJSON', {
        data: postData
      })
    }
  }
}
