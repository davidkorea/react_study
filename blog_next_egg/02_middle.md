

# Middle - API Service - Egg.js
- get started
- api deploy
- mysql plugin

# 1 Egg.js Get Started

1. `mkdir middle && cd middle`
2. `egg-init api-service-1`, simple
3. `cd api-service-1`
4. `cnpm install`
5. `npm run dev`, `http://127.0.0.1:7001/`

-----

# 2. RESTful API

- frontend default api
- backend admin api

## 2.1 Route
```
/app
  route.js         // 路由入口文件，引入下面的子路由配置文件

  /Route
     default.js    // frontend api route
     admin.js      // backend api route
```
## 2.2 Controller
```
/app
  /controller
     /defaualt     // frontend controller
        home.js
     /admin        // backend controller
        home.js
```

## 2.3 API实现
#### 1. Route
- app/router.js
```javascript
module.exports = app => {
  const { router, controller } = app;       // 无需默认路径时，可删除此2行
  router.get('/', controller.home.index);   // 默认路径依然可以访问，删除也可以
  
  require('./route/default')(app)           // 引入子路由文件 
};
```
- app/route/default.js
```javascript
module.exports = app => {
  const { router, controller } = app;
  router.get('/default', controller.default.home.index);   // 设置api url为hostname:7001/default
};
```
#### 2. Controller
- app/controller/default/home.js
```javascript
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "api test"
  }
}

module.exports = HomeController;
```

<img width="245"  src="https://user-images.githubusercontent.com/26485327/79297640-4fe80a00-7f11-11ea-9c79-8c96a8aa3081.png">
<img width="292"  src="https://user-images.githubusercontent.com/26485327/79297644-52e2fa80-7f11-11ea-8dc9-4618c65bc78b.png">


-----


# 3. `egg-mysql` plugin
## 3.1 配置egg-mysql插件
1. `cnpm install --save egg-mysql`
2. `config/plugin.js`
```javascript
'use strict';

exports.mysql = {
  enable: true,
  package: 'egg-mysql'
}
```
 
3. `config/config.fefault.js`

```javascript
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586922076183_5926';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // database configuration
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'egg-db',    
    },
    app: true,
    agent: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};
```

## 3.2 测试数据库查询
- app/controller/home.js
```javascript
class HomeController extends Controller {
  async index() {
    let result = await this.app.mysql.get("blog_type",{})
    this.ctx.body = 'hi, egg ' + JSON.stringify(result);
  }
}
```

















