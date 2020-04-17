
# 路由守卫Egg middleware


1. `app/middleware`
2. `app/middleware/adminAuth.js`

```javascript
module.exports = options => {
    return async function adminAuth (ctx, next){
        console.log(ctx.session.openId);
        if(ctx.session.openId){  // 由openId表示已经登录
            await next()
        }else{
            ctx.body={data:'no login'}
        }
    }
}
```

3. `config/config.defaault.js`, credentials=true
```javascript
  config.cors = {
    credentials: true,  // 允许cokkie跨域, session时cookie的一种！！！！！
    allowMethods: 'POST,GET,PUT,HEAD,UPDATE,DELETE,PATCH,OPTIONS'
  };
```


4. 配置路由 `app/route/admin.js`
```diff
  module.exports = app => {
    const { router, controller } = app;
+   var adminAuth = app.middleware.adminAuth()
    router.get('/admin', controller.admin.main.Index);
    router.post('/admin/login', controller.admin.main.Login);
  };
```












