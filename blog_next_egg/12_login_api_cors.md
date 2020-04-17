
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

- 由于是POST请求，无法在浏览器直接测试接口



# 3. Backend
- Global API config 
- Login页面

## 3.1 全局统一API配置文件
- 创建`src/Config`目录
- 创建`src/Config/api.js`文件
```javascript
const baseUrl = 'http://127.0.0.1:7001/admin'

const API = {
    login: baseUrl + '/login'

}

export default API
```

## 3.2 Login页面登录逻辑

- 整个登录无需使用form的post方式
    - 输入变更，同步更新username个password两个状态
    - axios发起post请求，传递的数据来自用户名和密码的两个状态的值
    
```javascript
import React, { useState } from 'react'
import '../Static/css/Login.css'
import {Button,Card,Input,Spin,message} from 'antd'
import {UserOutlined,LockOutlined} from '@ant-design/icons'
import API from '../Config/api'
import axios from 'axios'

function Login(props){                              // props用于编程页面跳转

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = ()=>{    
        setIsLoading(true)                           // 点击登录按钮后，先启用登录中状态
        if(!userName){                                  
            message.error('Please input username.')
            setIsLoading(false)
            return false
        }else if(!password){
            message.error('Please input password.')
            setIsLoading(false)
            return false    
        }                              // 没有输入报错提示，无需请求数据库
        
        let data = {                   // 用于POST传递给后台的数据
            'userName': userName,      // 从useState中获取数据             
            'password': password       // Input设置了onChange事件，输入内容改变，赋值状态
        }
        console.log(data);

        axios({
            method: 'post',            // POST请求        
            url: API.login,
            data: data,                // 传递上面的POST参数
            withCredentials: true      // 前后端共享session
        }).then(res=>{
            setIsLoading(false)        // 请求数据成功，关闭登录中状态
            console.log('res: ',res);
                                       // success由中台服务this.ctx.body={'data':'success','openId':openId}设置
            if(res.data.data === 'success'){   
                localStorage.setItem('openId',res.data.openId)
                props.history.push('/index')
                message.success('Login Success, Welcome!')
            }else{
                message.error('Wrong username and password.')
            }
        })

        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }
    
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="System Login" bordered={true} style={{width:'400px'}} className="card">
                    <Input className='input-item'
                        id="username" size="large"
                        placeholder="password"
                        prefix={<UserOutlined/>}
                        onChange={e=>setUserName(e.target.value)}  // 输入变更，同步更新状态
                    ></Input>
                    <Input.Password className='input-item'
                        id="password" size="large"
                        placeholder="username"
                        prefix={<LockOutlined/>}
                        onChange={e=>setPassword(e.target.value)}
                    ></Input.Password>
                    <Button className='btn' type="primary" size="large" onClick={handleLogin}>Login</Button>
                </Card>

            </Spin>
        </div>
    )
}

export default Login
```



- cors
```
Access to XMLHttpRequest at 'http://127.0.0.1:7001/admin/login' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
```















