
# AriticleList文章列表页

Backend
1. 新建页面`src/Pages/AriticleList.js`
2. AdminIndex添加该页面路由，对应按钮点击事件->页面跳转
3. AriticleList静态页面

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



<img width="1124" src="https://user-images.githubusercontent.com/26485327/79627934-1ad8f300-816f-11ea-8e75-58eae849dfdd.png">
<img width="1126" src="https://user-images.githubusercontent.com/26485327/79627938-1ca2b680-816f-11ea-936e-b75beb0e5e44.png">


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



# 2. AriticleList静态页面

- 使用antd table组件

```javascript
import { Table, Tag } from 'antd';

function ArticleList(){
    const columns = [
        {
          title: 'Title',
          dataIndex: 'article_title',
          key: 'article_title',             // key要和数据库中表的字段名一致！！！
          render: text => <a>{text}</a>,
        },
        {
          title: 'Date',
          dataIndex: 'add_time',
          key: 'add_time',                  // key要和数据库中表的字段名一致！！！
        },
        {
            title: 'View',
            dataIndex: 'view_count',
            key: 'view_count',
          },
        {
          title: 'Type',
          key: 'type_name',
          dataIndex: 'type_name',
          render: x => {    // x 就是传递进来的类别名称，不同类别显示颜色不同
              if(x){
                let color = x=='Video'?'geekblue' : 'green'
                return (
                  <Tag color={color} key={x}> {x} </Tag>
                );
              }
          }
        },
        {
          title: 'Action',      // 这里的数据不是来自数据库，而是在下面render中手动设置
          key: 'action',
          render: (record) => { // record就是当前记录本身，包含所有数据库返回字段!!!!!!!
              return(           // 用于删除时,传递当前文章Id ！！！！！！！！ 
                <span>
                <a style={{ marginRight: 16 }}><EditOutlined /></a>
                <a style={{ color:'tomato' }}><DeleteOutlined /></a>
                </span>
              );
            },
        },
      ];

    const [blogList, setBlogList] = useState([
        {
            id: 7
            add_time: "2020-04-22 00:00:00"
            article_title: "Save & Publish 提交信息"
            type_name: "Video"
            view_count: 0
        }
    ]);


    return (
        <div classtitle="articlelist">
            <Table pagination={{pageSize:10}} columns={columns} dataSource={blogList} />
        </div>
    )
}
```
<img width="1163"  src="https://user-images.githubusercontent.com/26485327/79630635-9c3b8000-8185-11ea-917b-3bb2b2641552.png">


# 3. Middle API

### Controller

- `app/controller/admin/main.js`
```javascript
async getArticleList(){
    let sql = "SELECT blog_article.id as id, " +
          "blog_article.article_title as article_title, " +
       // "blog_article.article_intro as article_intro, " +
          "FROM_UNIXTIME(blog_article.add_time, '%Y-%m-%d %H:%i:%s') as add_time, " +
          "blog_article.view_count as view_count, " +
          "blog_type.type_name as type_name " +
          "FROM blog_article LEFT JOIN blog_type ON blog_article.article_type_id = blog_type.type_id " +
          "ORDER BY blog_article.add_time DESC"   // 按照时间排序后，返回
          
    let result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result};
}
```

### Router

```diff
module.exports = app => {
  const { router, controller } = app;
  var adminAuth = app.middleware.adminAuth()
  router.get('/admin', controller.admin.main.Index);
  router.post('/admin/login', controller.admin.main.Login);
  router.get('/admin/getblogtype', adminAuth, controller.admin.main.getBlogType);
  router.post('/admin/addarticle',adminAuth, controller.admin.main.AddArticle);
  router.post('/admin/updatearticle',adminAuth, controller.admin.main.updateArticle);
+ router.get('/admin/getarticlelist', adminAuth, controller.admin.main.getArticleList);
};
```

### Test API

- `http://127.0.0.1:7001/admin/getarticlelist`

<img width="400" src="https://user-images.githubusercontent.com/26485327/79630718-487d6680-8186-11ea-8351-01ffbf9dbfa7.png">



# 4. 页面动态获取数据库信息

上面静态页面的前提下，增加下面请求数据的方法

```javascript
import axios from 'axios'
import API from '../Config/api'

    const [blogList, setBlogList] = useState([]);

    useEffect(()=>{
        getArticleList()
    },[])

    const getArticleList = () => {
        axios({
            method: 'get',
            url: API.getArticleList,
            withCredentials: true
        }).then(res=>{
            // console.log(res.data.data);
            setBlogList(res.data.data)
        })
    }
```

<img width="1167" src="https://user-images.githubusercontent.com/26485327/79630892-af4f4f80-8187-11ea-8c32-066e2cde86a0.png">





