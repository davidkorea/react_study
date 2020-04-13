
# egg.js 多级路由

目录结构
```
/app
  - router.js        路由唯一入口，需要引入并指定子路由的路径
  
  - /router
     - default.js    子路由指定，某一特定url绑定哪个controller的哪个方法
     - admin.js
  
  - /controller
     - /admin
     - /default
       - home.js
```

# 1. 主路由
- app/router.js
```javascript
module.exports = app => {
  // const { router, controller } = app;
  // router.get('/', controller.home.index);

  require('./router/default')(app)    // 引入子路由路径，并专递参数app
};
```

# 2. 子路由
- app/router/default.js

```javascript
module.exports = app =>  {
    const {router, controller} = app
    router.get('/default/index', controller.default.home.index)  // 绑定具体路由和匹配的控制器函数方法
}
```

# 3. 控制器
- app/controller/default/home.js

```javascript
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body="api test"
  }
}

module.exports = HomeController;
```
<img width="330" src="https://user-images.githubusercontent.com/26485327/79126668-f7aaee00-7dd2-11ea-8626-f54d7418e31e.png">

