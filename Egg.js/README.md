
# Egg.js based on koa


## 1. get started
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


## 2. 目录介绍

```
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js               路由
│   ├── controller              MVC->Controller
│   |   └── home.js
│   ├── service (可选)           MVC->Model
│   |   └── user.js
│   ├── middleware (可选)
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)
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
