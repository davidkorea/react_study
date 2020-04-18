
# AriticleList文章列表页

Backend
1. 新建页面`src/Pages/AriticleList.js`
2. AdminIndex添加该页面路由，对应按钮点击事件->页面跳转

Middle
1. API


# 1. Backend
## 1.1 创建AriticleList页面
```javascript
// src/Pages/ArticleList.js

import React from 'react';

function ArticleList(){
    return (
        <div className="articlelist">articlelist</div>
    )
}
export default ArticleList
```

## 1.2 路由设置
1. `Main.js`总路由设置
2. `AdminIndex.js`子路由设置

### `Main.js`总路由设置
```diff
function Main(){
    return (
        <div className="main">
            <Router>
            <Route path="/" exact component={Login}></Route>
            <Route path="/login" exact component={Login}></Route>
-           <Route path="/index" exact component={AdminIndex}></Route> 
+           <Route path="/index" component={AdminIndex}></Route>
            </Router>
        </div>
    )
}
```
- 去掉`/index`页面的精确匹配，否则该页面下的子路由无法实现！！！！！

### `AdminIndex.js`子路由设置

```diff
 <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
    <div>
      <Route path="/index" exact component={AddArticle}></Route>
+     <Route path="/index/add" exact component={AddArticle}></Route>
+     <Route path="/index/list" exact component={ArticleList}></Route>
    </div>
  </div>
```
- 直接访问`http://localhost:3001/index`和`http://localhost:3001/index/add`都指向添加文章页面
- `ArticleList`页面对应url `http://localhost:3001/index/list`

































