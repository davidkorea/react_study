
# Egg.js

- VSCode egg 插件 [eggjs](https://marketplace.visualstudio.com/items?itemName=atian25.eggjs)

# 1. get started
- [Egg 官方文档](https://eggjs.org/zh-cn/intro/quickstart.html)

Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。Koa 是一个非常优秀的框架，然而对于企业级应用来说，它还比较基础。而 Egg 选择了 Koa 作为其基础框架，在它的模型基础上，进一步对它进行了一些增强


1. 安装脚手架`sudo cnpm install egg-init -g`
2. `mkdir egg_study &&  cd egg_study`
3. `egg-init egg_test_1` --simple
4. `cd egg_test_1`,`cnpm install`
  ```
  yong@MacBookPro egg_test_1 % ls
  README.md	appveyor.yml	node_modules	test
  app		config		package.json
   ```
5. `npm run dev` -> http://127.0.0.1:7001


# 2. 目录介绍

```
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js               路由，通过路由中的配置找对对应控制器，再执行控制器中的函数方法
│   ├── controller              MVC->Controller
│   |   └── home.js
│   ├── service (可选)           MVC->Model 查询数据库，请求接口数据
│   |   └── user.js
│   ├── middleware (可选)
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)            静态资源css，img
│   |   └── reset.css
│   ├── view (可选)              MVC->View
│   |   └── home.tpl
│   └── extend (可选)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

- router
```javascript
// app/router.js

'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/list', controller.home.list);

};
```
- controller
```javascript
// app/controller/home.js

'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async index() {
    this.ctx.body = 'list page';
    // koa中直接使用ctx.body='list page'， egg进行了再次包装，需要调用this
  }
}

module.exports = HomeController;
```
- 该控制器的文件名称home.js 需要和内部命名  HomeController 一一对应
  - 控制器admin.js需要使用AdminControllerAdmin来命名




# 3. 路由传值

### 3.1 URL GET？传值 `this.ctx.query`
```javascript
// app/controller/home.js

'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async list() {
    let query = this.ctx.query   // 获取url传递的参数
    this.ctx.body = 'list page' + JSON.stringify(query);
  }
}

module.exports = HomeController;
```
- `http://127.0.0.1:7001/list?id=123&name=hi`
```
list page{"id":"123","name":"hi"}
```

### 3.2 动态传值 `this.ctx.params`

- router
```javascript
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/list', controller.home.list);
  router.get('/news/:id', controller.home.news);
};
```


- controller

```javascript
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async list() {
    let query = this.ctx.query
    this.ctx.body = 'list page' + JSON.stringify(query);
  }

  async news() {
    let params = this.ctx.params    // 获取动态路由传递参数
    this.ctx.body = 'news page' + JSON.stringify(params);
  }
}

module.exports = HomeController;
```
- `http://127.0.0.1:7001/news/123`
```
news page{"id":"123"}
```



# 4. 模板引擎 egg-view-ejs `await this.ctx.render`

- [egg view plugin for ejs](https://github.com/eggjs/egg-view-ejs)

- `cnpm install --save egg-view-ejs`

- usage
```diff
// {app_root}/config/plugin.js

- module.exports = {
-   // had enabled by egg
-   // static: {
-   //   enable: true,
-   // }
- };

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};
```
```diff
// {app_root}/config/config.default.js


module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586762318604_8164';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


+ config.view = {
+   mapping: {
+     '.html': 'ejs',    // 将view文件夹下面的.html文件使用ejs模板引擎解析
+   },                  
+ };

  return {
    ...config,
    ...userConfig,
  };
};

```


1. 创建`app/view`文件夹
2. 创建`app/view/news.html`
3. 更改controller中的home.news方法，使其使用模板渲染news.html，注意使用**！！！await！！！**，否则404 Not Found错误
```javascript
async news() {
    // let params = this.ctx.params
    // this.ctx.body = 'news page' + JSON.stringify(params);
    await this.ctx.render('news')   // 一定是 await！！！！！！！！！
  }
```
<img width="300"  src="https://user-images.githubusercontent.com/26485327/79106392-fe227100-7da4-11ea-9b95-73e6f0147587.png">


4. 传递参数
```javascript
async news() {
    let params = JSON.stringify(this.ctx.params)
    // this.ctx.body = 'news page' + JSON.stringify(params);
    let list = [111,222,333]
    await this.ctx.render('news', {
      params:params,
      list
    })
  }
```
```html
<body>
    <div>This is News Page
        <%=params%>
    </div>
    <ul>
        <% for(var i=0; i<list.length; i++){ %>
            <li>
                <%=list[i]%>
            </li>
        <% } %>
    </ul>
</body>
```

<img width="300"  src="https://user-images.githubusercontent.com/26485327/79107006-2fe80780-7da6-11ea-97ae-01f0b3d8ea35.png">





# 4. 静态资源

1. images
- 在public文件夹下面 创建images文件夹，放入图片文件，并在html中 引入
```html
<img src="/public/images/1.jpg" alt="">
```

2. css
- 在public文件夹下面 创建css文件夹，在创建style.css文件，并在html中 引入
```
// style.css

div {
    color: red
}
```
```html
<head>
    <link rel="stylesheet" href="/public/css/style.css">
</head>
```

<img width="400"  src="https://user-images.githubusercontent.com/26485327/79107631-50fd2800-7da7-11ea-846e-b43312fbb6c9.png">

