

# 重新构建前端页面（菜单导航Header + 类别页面ListPage） 
# Frontend + Middle API

博客的架构为
- 菜单分类：Home，Video，Life
- 首页Home，显示所有博客
- Video：从所有博客中，选择类别为Vedio的显示
- Life：仅显示文章类别为lift的博客

因此，每个菜单页面都需要使用ListPage页面，只是请求传入的数据不同，也不需要每个菜单页面单独创建页面（video.js, lift.js），使用统一页面即可

另外，菜单导航按钮需要在数据库中取出，以方便添加和更改，而不是写死在页面，需要在创建一个数据库table `blog_menu`

# 1. [Middle] Database & API design

1. 创建出菜单类别表
2. 创建根据文章类别查询的API接口，`getMenuList`, `getBlogByTypeId`

## 1.1 创建`blog_menu`表

|field|type|note|
|-|-|-|
|id|int|PK, ↑|
|menu_name|varchar|`Video`,`Life` 对应文章类别|
|menu_id|int|`1`,`2`，用于页面跳转传递参数|
|menu_icon|varchar|菜单导航按钮图标，无法使用|

## 1.2 `getMenuList` API
### Controller
- `app/controller/default/home.js`

```javascript
async getMenuList(){
  let result = await this.app.mysql.select('blog_menu') // 使用select将全部数据返回为一个json对象
  this.ctx.body = {data: result}
}
```

### Route
- `app/route/default.js`

```javascript
module.exports = app => {
  const { router, controller } = app;
  router.get('/default', controller.default.home.index);
  router.get('/default/getbloglist', controller.default.home.getBlogList);
  router.get('/default/getblogdetailbyid/:id', controller.default.home.getBlogDetailById);
  
  router.get('/default/getmenulist', controller.default.home.getMenuList);
};
```


### 测试API
- `http://127.0.0.1:7001/default/getmenulist`
  - 返回为一个对象，通过`对象.data`的方式，将全部数据的数据取出，用于循环渲染页面
<img width="367"  src="https://user-images.githubusercontent.com/26485327/79405488-1b368a00-7fc7-11ea-9d5a-967e467b8c86.png">


## 1.3 `getBlogByTypeId` API

### Controller

- `app/controller/default/home.js`

```javascript
async getBlogByTypeId(){
  let id = this.ctx.params.id       // 获取url中的动态参数.../id/1
  
  let sql = "SELECT blog_article.id as id, " +
            "blog_article.article_title as article_title, " +
            "blog_article.article_intro as article_intro, " +
            "blog_article.article_content as article_content, " +
            "FROM_UNIXTIME(blog_article.add_time, '%Y-%m-%d %H:%i:%s') as add_time, " +
            "blog_article.view_count as view_count, " +
            "blog_type.type_name as type_name " +
            "FROM blog_article LEFT JOIN blog_type ON blog_article.article_type_id = blog_type.type_id " +
            "WHERE blog_article.article_type_id = " + id    // 根据文章类别检索
            
  let result = await this.app.mysql.query(sql)
  this.ctx.body = {data:result};
}
```

### Route

- `app/route/default.js`

```diff
  module.exports = app => {
    const { router, controller } = app;
    router.get('/default', controller.default.home.index);
    router.get('/default/getbloglist', controller.default.home.getBlogList);
    router.get('/default/getblogdetailbyid/:id', controller.default.home.getBlogDetailById);
    router.get('/default/getmenulist', controller.default.home.getMenuList);
+   router.get('/default/getblogbytypeid/:id', controller.default.home.getBlogByTypeId);
  };
```

### 测试接口

- `http://127.0.0.1:7001/default/getblogbytypeid/1`
<img width="1429"  src="https://user-images.githubusercontent.com/26485327/79404516-77e47580-7fc4-11ea-8fe6-a63453f28e96.png">

- `http://127.0.0.1:7001/default/getblogbytypeid/2`

<img width="1429" src="https://user-images.githubusercontent.com/26485327/79404531-83d03780-7fc4-11ea-924c-0ec2b2e30195.png">



# 2. [Frontend] 菜单导航 + 类别页面

**请求数据的两种方式** [Next.js getInitialProps VS useEffect #4](https://github.com/davidkorea/react_study/issues/4)
##### 1. next.js `getInitialProps`，用于页面加载时，因此对于url变化后进入一个新的页面，请求数据需要使用getInitialProps
- getInitialProps可以获取前一个页面传递来的路由参数
```
Detail.getInitialProps = async(context)=>{
  let id = context.query.id
  return {data:'hello'}
}
```
- getInitialProps的return对象可以直接作为props传入页面函数使用

##### 2. react `useEffect`，用于组件加载时，而页面上局部组件加载时请求数据，使用useEffect

## 2.1 `Header`组件数据库动态获取菜单类别

- 对于Header组件请求数据库，需要使用react hooks中的useEffect
- 使用`getMenuList` API

```javascript
import{ Menu } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react'

const [menuList, setMenuList] = useState([])

useEffect(()=>{
    const fetchData = async ()=>{ 
        // useEffect中不能直接使用await axios进行请求，需要外层先有一个async函数包裹        
        const response = await axios(API.getMenuList)
        const data = await response.data
        // console.log(data.data);
        setMenuList(data.data)
    }
    fetchData()   // 调用该异步函数
},[])

<Menu mode="horizontal">
    <Menu.Item className='item' key="home">    // 首页按钮单独拿出来，不需要查询数据库
        <Link href="/">
            <a> <HomeOutlined />Home</a>
        </Link>
    </Menu.Item>
    
    {
      menuList.map((v,i)=>{
          return (
              <Menu.Item className='item' key={v.menu_name}>
                  <Link  href={{pathname:'list',query:{type:v.menu_id}}}>
                      <a>{v.menu_name}</a>    // 跳转到list页面，携带参数type(菜单d)
                  </Link>
              </Menu.Item>
          )
      })
    }
</Menu>
```

- Video菜单按钮对应 `http://localhost:3000/list?type=1`
- Life菜单按钮对应  `http://localhost:3000/list?type=2`



## 2.2 根据菜单按钮传递的参数，到list页面请求该参数

- 对于页面的数据请求，使用getInitialProps
- 使用`getBlogByTypeId` API

```javascript

const ListPage = (propsData) => {

  const blogList = propsData.data   // 使用变量，而不是用useState接收也可以
  // const [blogList, setBlogList] = useState(propsData.data);

  return (
    <List 
      header={<div>Latest blogs</div>}
      itemLayout="vertical"
      dataSource={blogList}
      renderItem={item=>(
        <List.Item>
        
          <div className="item-title">    // 用于文章详情页面的跳转
            <Link href={{pathname:'detail',query:{id:item.id}}}>
              <a>{item.article_title}</a>
            </Link>
          </div>
          
          <div className="item-icons">
            <span className='icon'><CalendarOutlined /> {item.add_time}</span>
            <span className='icon'><FolderOutlined /> {item.type_name}</span>
            <span className='icon'><FireOutlined/> {item.view_count} views</span>
          </div>
          
          <div className="item-content">{item.article_intro}</div>
          
        </List.Item>
      )}
    />
  ）
}

ListPage.getInitialProps = async(context)=>{  // 从之前页面获取上下文
  let typeId = context.query.type
  let response = await axios(API.getBlogByTypeId + typeId)
  let data = await response.data  
  return data
}

export default ListPage
```

## 2.3 测试页面

- `http://localhost:3000/list?type=1`

<img width="985" src="https://user-images.githubusercontent.com/26485327/79406872-b8df8880-7fca-11ea-9991-bd662c2a5ac2.png">

- `http://localhost:3000/list?type=2`

<img width="985" src="https://user-images.githubusercontent.com/26485327/79406662-44a4e500-7fca-11ea-8875-97990ec9f40f.png">







