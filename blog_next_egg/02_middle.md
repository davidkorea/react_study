

# Middle - API Service - Egg.js


# 1 Egg.js Get Started

1. `mkdir middle && cd middle`
2. `egg-init api-service-1`, simple
3. `cd api-service-1`
4. `cnpm install`
5. `npm run dev`, `http://127.0.0.1:7001/`

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


























