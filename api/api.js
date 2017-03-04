import superagent from 'superagent';

const methods = [
  'get',
  'head',
  'post',
  'put',
  'del',
  'options',
  'patch'
];

class _Api {

  constructor(opts) {

    this.opts = opts || {};

    if (!this.opts.baseURI)
      throw new Error('baseURI option is required');

    methods.forEach(method =>
      this[method] = (path, { params, data, oldData = null } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](this.opts.baseURI + path);

        if (params) {
          request.query(params);
        }

        if (this.opts.headers) {
          request.set(this.opts.headers);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body,text } = {}) => {
          if (err) {
            reject(body || err);
          }else {
            if (body) {
              if (typeof(body)=="string") {
                body = JSON.parse(body)
              }
              var newData = body
              if(oldData == undefined){
                resolve(newData);
              }else{
                resolve({newData: newData, oldData: oldData});
              }
            }else {
              var newData = JSON.parse(text)
              if(oldData == undefined){
                resolve(newData);
              }else{
                resolve({newData: newData, oldData: oldData});
              }
            }
          }
        });
        // err ? reject(body || err) : resolve(body));
      })
    );

  }

}

const Api = _Api;

export default Api;
