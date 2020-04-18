
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




## 1.3 点击菜单按钮，跳转页面

- 只有上面配置好路由，才能正确跳转并显示页面，否则url会变化，但是页面为空白
  - 因为上面设置路由的作用，就在在页面的某块区域，加载某个组件，不设置，就不知道加载哪个页面，所以空白！！！！！

- 由于使用antd组件，所有菜单按钮单击实现需要按照其文档操作
  - Menu -> SubMenu -> MenuItem，只有Menu可以绑定onClick事件
  - 该事件会自动返回一个参数，包含
    ```
    {key: "add1", keyPath: Array(1), item: MenuItem, domEvent: Class}
        domEvent: Class {dispatchConfig: null, _targetInst: null, _dispatchListeners: null, _dispatchInstances: null, …}
        item: MenuItem {props: {…}, context: {…}, refs: {…}, updater: {…}, onKeyDown: ƒ, …}
        key: "add1"            // 重要！！！
        keyPath: ["add1"]
        __proto__: Object
    ```
  - 因为具体的菜单按钮都在MenuItem中，而`key`就是MenuItem中定义的key，用于确认当前点击了哪个菜单按钮



<img width="1202" src="https://user-images.githubusercontent.com/26485327/79627882-b28a1180-816e-11ea-8ebc-ac93a63f1e1b.png">
<img width="1198" src="https://user-images.githubusercontent.com/26485327/79627881-b027b780-816e-11ea-95ec-c5a8153fcfaf.png">


```javascript
const [breadcrumb, setBreadcrumb] = useState('Dashboard');  // 用于变更面包屑导航显示
const handleMenuClick = e => {
  console.log(e);
  if(e.key == 'add1' || e.key == 'add2'){
    props.history.push('/index/add')
    setBreadcrumb('Add Article')
  }else if(e.key == 'list'){
    props.history.push('/index/list')
    setBreadcrumb('Article List')
  }else if(e.key == 'dashboard'){
    props.history.push('/index/dashboard')
    setBreadcrumb('Dashboard')
  }else if(e.key == 'comment'){
    props.history.push('/index/comment')
    setBreadcrumb('User Comments')
  }
}
    
<Menu theme="dark" defaultSelectedKeys={['add1']} mode="inline"
    onClick={handleMenuClick}
>
    <Menu.Item key="dashboard">
      <PieChartOutlined />
      <span>Dashboard</span>
    </Menu.Item>

    <Menu.Item key="add1">
      <FileAddOutlined />
      <span>Add Article</span>
    </Menu.Item>

    <SubMenu
        key="sub1"
        title={
          <span>
            <OrderedListOutlined />
            <span>Manage Article</span>
          </span>
        }
    >
        <Menu.Item key="add2">Add</Menu.Item>
        <Menu.Item key="list">List</Menu.Item>
    </SubMenu>

    <Menu.Item key="comment">
      <CommentOutlined />
      <span>Comments</span>
    </Menu.Item>
</Menu>

<Breadcrumb style={{ margin: '16px 0' }}>
  <Breadcrumb.Item>Console</Breadcrumb.Item>
  <Breadcrumb.Item>{ breadcrumb }</Breadcrumb.Item>
</Breadcrumb>
```


























