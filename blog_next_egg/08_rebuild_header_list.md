

# 重新构建前端页面（菜单导航Header + 类别页面ListPage） 
# Frontend + Middle API

博客的架构为
- 菜单分类：Home，Video，Life
- 首页Home，显示所有博客
- Video：从所有博客中，选择类别为Vedio的显示
- Life：仅显示文章类别为lift的博客

因此，每个菜单页面都需要使用ListPage页面，只是请求传入的数据不同，也不需要每个菜单页面单独创建页面（video.js, lift.js），使用统一页面即可

另外，菜单导航按钮需要在数据库中取出，以方便添加和更改，而不是写死在页面，需要在创建一个数据库table `blog_menu`

# 1. [Middle] Database & API design

1. 创建出菜单类别表
2. 创建根据文章类别查询的API接口

## 1.1 创建`blog_menu`表

|field|type|note|
|-|-|-|
|id|int|PK, ↑|
|menu_name|varchar|`Video`,`Life` 对应文章类别|
|menu_id|int|`1`,`2`，用于数据库搜索|
|menu_icon|varchar|菜单导航按钮图标，无法使用|
|menu_path|int|`video`,`life`|


## 1.2 `getBlogByTypeId`API

### Controller

- `app/controller/default/home.js`

```javascript
async getBlogByTypeId(){
  let id = this.ctx.params.id       // 获取url中的动态参数.../id/1
  
  let sql = "SELECT blog_article.id as id, " +
            "blog_article.article_title as article_title, " +
            "blog_article.article_intro as article_intro, " +
            "blog_article.article_content as article_content, " +
            "FROM_UNIXTIME(blog_article.add_time, '%Y-%m-%d %H:%i:%s') as add_time, " +
            "blog_article.view_count as view_count, " +
            "blog_type.type_name as type_name " +
            "FROM blog_article LEFT JOIN blog_type ON blog_article.article_type_id = blog_type.type_id " +
            "WHERE blog_article.article_type_id = " + id    // 根据文章类别检索
            
  let result = await this.app.mysql.query(sql)
  this.ctx.body = {data:result};
}
```

### Route

- `app/route/default.js`

```diff
  module.exports = app => {
    const { router, controller } = app;
    router.get('/default', controller.default.home.index);
    router.get('/default/getbloglist', controller.default.home.getBlogList);
    router.get('/default/getblogdetailbyid/:id', controller.default.home.getBlogDetailById);
    router.get('/default/getmenulist', controller.default.home.getMenuList);
+   router.get('/default/getblogbytypeid/:id', controller.default.home.getBlogByTypeId);
  };
```

### 测试接口

- `http://127.0.0.1:7001/default/getblogbytypeid/1`
<img width="1429"  src="https://user-images.githubusercontent.com/26485327/79404516-77e47580-7fc4-11ea-8fe6-a63453f28e96.png">

- `http://127.0.0.1:7001/default/getblogbytypeid/2`

<img width="1429" src="https://user-images.githubusercontent.com/26485327/79404531-83d03780-7fc4-11ea-924c-0ec2b2e30195.png">



# 2. [Frontend] 菜单导航 + 类别页面



