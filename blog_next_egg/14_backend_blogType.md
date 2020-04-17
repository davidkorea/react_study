
# 博客分类 + 路由守卫

当用户未登录时，无法调用获取博客分类的api请求后端服务器


1. Middle， API
2. backend， addArticle page


# 1. Middle - API

## 1.1 无路由鉴权
#### Controller

- `controller/admin/main.js`
```javascript
async getBlogType(){
    let type = await this.app.mysql.select('blog_type')
    this.ctx.body = {data:type}
}
```
#### Route
- `app/route/admin.js`
```diff
  module.exports = app => {
    const { router, controller } = app;
    var adminAuth = app.middleware.adminAuth()
    router.get('/admin', controller.admin.main.Index);
    router.post('/admin/login', controller.admin.main.Login);
+   router.get('/admin/getblogtype', controller.admin.main.getBlogType)
  };
```
<img width="378"  src="https://user-images.githubusercontent.com/26485327/79539909-cde71500-80b9-11ea-9c0c-cd07af597840.png">

## 1.2 路由鉴权

### Controller

- `controller/admin/main.js`


### Route
- `app/route/admin.js`








