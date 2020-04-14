
# [综合] next前端请求egg接口，获取mysql数据并展示

1. egg，请求接口设计，mysql数据查询
2. next，请求egg的api获取数据并展示


- 博客场景，首页请求api，显示博客的简介列表，点击每篇博客的标题，跳转至详情页面
- 详情界面根据首页传递来的博客id，再根据具体博客id其请求对应id的博客全部内容

# 1. Egg数据接口设计，查询数据库
1. 博客列表请求api，`getArticleList`
2. 博客内容详情api，`getArticleById`

## 1.1 Route
```javascript
module.exports = app => {
  const { router, controller } = app;
  router.get('/getarticlelist', controller.home.getArticleList);
  router.get('/getcontentbyid/:id', controller.home.getArticleById);   // url中必须指定博客id
};
```

## 1.2 Controller
1. getArticleList API
<img width="570" src="https://user-images.githubusercontent.com/26485327/79191755-eb1da880-7e59-11ea-83b2-0ed905a9756a.png">

2. getArticleById API

<img width="570" src="https://user-images.githubusercontent.com/26485327/79191965-62533c80-7e5a-11ea-934c-371bfafd6fb9.png">


```javascript
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getArticleList() {
    let sql = 'SELECT blog_article.id as id, ' +
              'blog_article.article_title as article_title, ' + 
              'blog_article.article_intro as article_intro, ' + 
              "FROM_UNIXTIME(blog_article.add_time, '%Y-%m-%d %H:%i:%s') as add_time, " + 
              'blog_article.view_count as view_count, ' + 
              'blog_type.type_name as type_name ' +            // FROM之前的语句不加逗号
              'FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.type_id'
              
    let result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }

 async getArticleById(){
   let id = this.ctx.params.id    // 首先获得列表页面传递来的具体某一博客的id

   let sql = 'SELECT blog_article.id as id, ' +
              'blog_article.article_title as article_title, ' + 
              'blog_article.article_intro as article_intro, ' + 
              "FROM_UNIXTIME(blog_article.add_time, '%Y-%m-%d %H:%i:%s') as add_time, " + 
              'blog_article.view_count as view_count, ' + 
              'blog_type.type_name as type_name, ' + 

              'blog_article.article_content as article_content ' + 
              'FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.type_id ' +
              `WHERE blog_article.id=${id}`      // WHERE语句指定id进行查询
              
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
 }
}

module.exports = HomeController;
```











# 2. Next前端，路由传值与请求
## 2.1 路由传值

## 2.2 发起请求






