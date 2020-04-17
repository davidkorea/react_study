
# egg-cors

> Access to XMLHttpRequest at 'http://127.0.0.1:7001/getarticlelist' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.



1. `cnpm install --save egg-cors`
2. `config/plugin.js`
```javascript
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
```

3. `config/config.default.js`
```javascript
config.security = {
  // scrf: { 写错了！！！！
  csrf: {
    enable: false
  },
  domainWhiteList:['*']
};
config.cors = {
  origin: '*',   // 注释掉此字段，则可以允许所有域名进行跨域访问！！！！
  allowMethods: 'POST,GET,PUT,HEAD,UPDATE,DELETE,PATCH,OPTIONS'
};
```
