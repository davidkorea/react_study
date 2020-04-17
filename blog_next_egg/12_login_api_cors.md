
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


### Egg Router

1. `app/route/admin` -> **!!! POST !!!**
2. `app/router.js`



# 3. Backend Login page

- cors
```
Access to XMLHttpRequest at 'http://127.0.0.1:7001/admin/login' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
```















