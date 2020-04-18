

# 列表页面修改文章

1. 创建中台API，`getArticleById`
2. 单击事件，跳转到`/index/add/:id`页面
3. `AdminIndex.js`页面添加新路由`<Route path="/index/add/:id" exact component={AddArticle}></Route> {/* 该路由用于列表中的文章修改 */}`，之前的路由只能由于新建文章，因为无法添加id进行传参！！
4. `AddArticle.js`页面使用useEffect更具传递过来的路由参数id，请求数据库，获得该id对应的文章
5. 将获得的文章显示在对应区域，input区域需要使用`value`进行显示！！


# 1. API
