
# 用户登录API

Middle
1. 数据库`admin_user`表
2. egg接口controller：`admin/main.js -> login()`
3. egg路由router：`admin/login`
4. cors，设置允许跨多个域

Backend
1. login page login logic


# 1. Middle
## 1.1 Database

- `admin_user` table

|field|type|note|
|-|-|-|
|id|int|PK, ↑|
|user_name|varchar||
|password|varchar||


## 1.2 API

- `http://127.0.0.1:7001/admin/login`

### Controller

- /controller/admin/main.js

```javascript
'use strict'

const Controller = require('egg').Controller

class MainController extends Controller{    // 命名MainController和文件名保持一致
    async Index(){
        this.ctx.body ='admin api'
    }

    async Login(){
        console.log(this.ctx.request.body);
        
        // POST 传值
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        
        const sql = " SELECT user_name FROM admin_user WHERE user_name = '"+userName +"' AND password = '"+password+"'"
        const result = await this.app.mysql.query(sql)  // !!!!!!!await 否则一定查询失败!!!!!!!!!
        
        if(result.length>0){  // 长度>0，查询到匹配记录，result:[ RowDataPacket { user_name: 'admin' } ]
            let openId = new Date().getTime()
            this.ctx.session.openId = {'openId':openId}
            this.ctx.body={'data':'success','openId':openId}
        }else{
            this.ctx.body={'data':'fail'}
        }

    }
}

module.exports = MainController
```

1. POST方式接收参数需要使用`this.ctx.request.body.参数名`
2. sql语句拼接，注意使用单引号和双引号配合，将变量转化为使用引号包裹的样式`SELECT user_name from admin_user WHERE user_name='admin' AND password='11111'`
3. 执行sql查询后的结果要使用await来接收，否则即使输入用户名和密码正确，也无法成功登录


###  Router

- 子路由配置文件 `app/route/admin.js` -> **!!! POST !!!**

```javascript
'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/admin/login', controller.admin.main.Login);  // 使用POST
};
```

- 主路由入口 `app/router.js`

```javascript
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index); 
  require('./route/default')(app)
  require('./route/admin')(app)      // 新增
};
```



# 3. Backend Login page

- cors
```
Access to XMLHttpRequest at 'http://127.0.0.1:7001/admin/login' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
```















