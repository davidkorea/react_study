
# API service mysql

# 1. db design

#### table `blog_type`
|field|type|note|
|-|-|-|
|id|int|PK, ↑|
|type_name|char|`video`,`life`|
|type_id|int|`1`,`2`|



#### table `blog_article`

|field|type|note|
|-|-|-|
|id|int|PK, ↑|
|article_title|char||
|article_intro|text||
|article_content|text||
|article_type_id|int|同上表`type_id`，用于LEFT JOIN|
|add_time|int|`unix timestamp`|
|view_count|int||


-----

# 2. API实现

## 2.1 获取文章列表API

- `http://127.0.0.1:7001/default/getbloglist`

#### controller

- app/controlller/default/home.js
```javascript
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "api test"
  }

  async getBlogList() {
    let sql = "SELECT blog_article.id as id, " +
              "blog_article.article_title as article_title, " +
              "blog_article.article_intro as article_intro, " +
              "FROM_UNIXTIME(blog_article.add_time, '%Y-%m-%d %H:%i:%s') as add_time, " +
              "blog_article.view_count as view_count, " +
              "blog_type.type_name as type_name " +
              "FROM blog_article LEFT JOIN blog_type ON blog_article.article_type_id = blog_type.type_id"
    let result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result};
  }
}

module.exports = HomeController;
```

#### route
- app/route/default.js

```javascript
'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/default', controller.default.home.index);
  router.get('/default/getbloglist', controller.default.home.getBlogList);
};
```

<img width="931"  src="https://user-images.githubusercontent.com/26485327/79300993-ea991680-7f1a-11ea-8e88-ef0e2bea580f.png">



## 2.2 获取文章详情API

- `http://127.0.0.1:7001/default/getblogdetailbyid`


#### controller
- app/controlller/default/home.js

```javascript
async getBlogDetailById() {
  let id = this.ctx.params.id       // 从url中获取文章id
  let sql = "SELECT blog_article.id as id, " +
            "blog_article.article_title as article_title, " +
            "blog_article.article_intro as article_intro, " +
            "blog_article.article_content as article_content, " +
            "FROM_UNIXTIME(blog_article.add_time, '%Y-%m-%d %H:%i:%s') as add_time, " +
            "blog_article.view_count as view_count, " +
            "blog_type.type_name as type_name " +
            "FROM blog_article LEFT JOIN blog_type ON blog_article.article_type_id = blog_type.type_id " +
            "WHERE blog_article.id = " + id    // 通过文章id获取记录

  let result = await this.app.mysql.query(sql)
  this.ctx.body = {data:result};
}
```


#### route
- app/route/default.js
```javascript
module.exports = app => {
  const { router, controller } = app;
  router.get('/default', controller.default.home.index);
  router.get('/default/getbloglist', controller.default.home.getBlogList);
  router.get('/default/getblogdetailbyid/:id', controller.default.home.getBlogDetailById);
};
```

<img width="1253"  src="https://user-images.githubusercontent.com/26485327/79302795-eb807700-7f1f-11ea-9fd7-52552951be72.png">




























