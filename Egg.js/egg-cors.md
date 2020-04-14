
# egg-cors


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
  scrf: {
    enable: false
  },
  domainWhiteList:['*']
};
config.cors = {
  origin: '*',
  allowMethods: 'GET,PUT,HEAD,UPDATE,DELETE,PATCH,OPTIONS'
}
```
