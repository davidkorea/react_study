

# 后台管理系统


# 1. Get Started

#### 1. `create-react-app admin1`, 只留下`index.js`和`App.js`, 删除其他文件

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

```javascript
// App.js
import React from 'react'

function App() {
  return (
    <div className="App"> hi </div>
  );
}
export default App;
```

#### 2. `cnpm install --save react-router-dom`

#### 3. `cnpm install --save antd`
```javascript
import {Button} from 'antd'
import 'antd/dist/antd.css'

function App() {
  return (
    <div className="App">
      <Button type="primary" size="large">Click</Button>
    </div>
  );
}
export default App;
```

#### 4. `cnpm install --save @ant-design/icons`，安装antd图标库


# 2. Route

#### 1. 创建目录`src/Pages/`
#### 2. 创建文件`src/Pages/Main.js`，用于配置主路由
```javascript
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './Login'

function Main(){
    return (
        <div className="main">
            <Router>
                <Route path="/login" exact component={Login}></Route>
            </Router>
        </div>
    )
}

export default Main
```
#### 3. 创建文件`src/Pages/Login.js`，使用主路由配置该页面，使得该页面可以正常访问

```javascript
import React from 'react';

function Login(){
    return (
        <div className="login">login</div>
    )
}

export default Login
```

#### 4. 更改`index.js`绑定主页面
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import Main from './Pages/Main'

ReactDOM.render(<Main />, document.getElementById('root'));
```

#### 5. 访问`http://localhost:3001/login`，页面路由配置成功




# 3. Login静态页面

```javascript
import React, { useState } from 'react'
import '../Static/css/Login.css'
import {Button,Card,Input,Spin} from 'antd'
import {UserOutlined,LockOutlined} from '@ant-design/icons'

function Login(){

    const [userName, setUserName] = useState('')
    const [paassword, setPaassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleLogin = ()=>{
        setIsLoading(true)
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
                        onChange={e=>setUserName(e.target.value)}
                    ></Input>
                    <Input.Password className='input-item'
                        id="password" size="large"
                        placeholder="username"
                        prefix={<LockOutlined/>}
                        onChange={e=>setPaassword(e.target.value)}
                    ></Input.Password>
                    <Button className='btn' type="primary" size="large" onClick={handleLogin}>Login</Button>
                </Card>

            </Spin>
        </div>
    )
}

export default Login
```
```css
body {
    background-color: aliceblue;
}

.login-div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}

.card {
    box-shadow: 3px 3px 5px lightgray;
}

.input-item {
    margin-top: 10px;
}

.btn {
    margin-top: 20px;
    width: 100%;
}
```

<img width="460" src="https://user-images.githubusercontent.com/26485327/79421920-6ca63f80-7fee-11ea-9ec9-c43a1edddb42.png">


<img width="460" src="https://user-images.githubusercontent.com/26485327/79422277-2dc4b980-7fef-11ea-8e37-16f0937572c3.png">




