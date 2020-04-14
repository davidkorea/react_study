# egg-mysql

- [[NPM]egg-mysql](https://www.npmjs.com/package/egg-mysql)

# 1. Get started
1. `cnpm install --save egg-mysql`
2. `config/plugin.js`
```jaavascript
exports.mysql = {
  enable:true,
  package: 'egg-mysql',
};
```
3. `config/config.default.js`
```javascript
module.exports = appInfo => {
  const config = exports = {};
  config.keys = appInfo.name + '_1586762318604_8164';
  config.middleware = [];
  const userConfig = {
  };

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };

  config.api = 'http://127.0.0.1:7001/'

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root',
      // database
      database: 'egg-db',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};

```
4. 在数据库中创建blog_content表，并添加一条记录

<img width="760" src="https://user-images.githubusercontent.com/26485327/79130230-32178980-7dd9-11ea-97f3-a21d23128182.png">


5. controller
```javascript
async index() {
    let result = await this.app.mysql.get('blog_content', {})   // 获取mysql的blog_content表中的数据
    this.ctx.body = result
  }
```

<img width="360" src="https://user-images.githubusercontent.com/26485327/79130041-e7960d00-7dd8-11ea-8bd8-04857b26ef9e.png">



# 2. Demo

## 2.1 创建数据库表

#### 1. blog_type
<img width="740"  src="https://user-images.githubusercontent.com/26485327/79175349-0c699f00-7e30-11ea-85da-17928f43259d.png">


#### 2. blog_article
<img width="740"  src="https://user-images.githubusercontent.com/26485327/79175352-0e336280-7e30-11ea-9133-0d72ebd76969.png">




## 2.2 Controller

```javascript
class HomeController extends Controller {
  async index() {
    // let result = await this.app.mysql.get('blog_content', {})
    this.ctx.body = 'hi'
  }

  async getArticleList() {
    let sql = 'SELECT blog_article.type_id as type_id, ' +
              'blog_article.article_title as article_title, ' + 
              'blog_article.article_intro as article_intro, ' + 
              'blog_article.add_time as add_time, ' + 
              'blog_article.view_count as view_count, ' + 
              'blog_type.type_name as type_name ' + 
              'FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.type_id'
    let result = await this.app.mysql.query(sql)
    this.ctx.body = result
  }
}
```


## 2.3 Route


```javascript
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getarticlelist', controller.home.getArticleList);
};
```


<img width="690" src="https://user-images.githubusercontent.com/26485327/79175641-d7aa1780-7e30-11ea-8c83-064aa91bbdbc.png">
