import Api from './api';

export function requestUrl() {
  // 实际环境打开
  return '172.20.4.220';
}

let request = {
  baseURI: 'http://' + requestUrl(),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://' + requestUrl(),
  }
};

const api = new Api(request);

export default api;
