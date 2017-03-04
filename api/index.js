import Api from './api';

export function requestUrl() {
  // 实际环境打开
  return "10.3.14.239";
}

let request = {
  baseURI: 'http://' + requestUrl(),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://' + requestUrl(),
  }
}

const api = new Api(request)

export default api
