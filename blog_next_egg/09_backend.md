

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


# 2. Route

#### 1. 创建目录`src/Pages/`
#### 2. 创建文件`src/Pages/Main.js`，用于方式主路由
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














