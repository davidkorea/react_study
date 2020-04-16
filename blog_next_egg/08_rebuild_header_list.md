

# 重新构建前端页面（菜单导航Header + 菜单页面ListPage） 
# Frontend + Middle API

博客的架构为
- 菜单分类：Home，Video，Life
- 首页Home，显示所有博客
- Video：从所有博客中，选择类别为Vedio的显示
- Life：仅显示文章类别为lift的博客

因此，每个菜单页面都需要使用ListPage页面，只是请求传入的数据不同，也不需要每个菜单页面单独创建页面（video.js, lift.js），使用统一页面即可

另外，菜单导航按钮需要在数据库中取出，以方便添加和更改，而不是写死在页面，需要在创建一个数据库table `blog_menu`

# 1. Database & API design

1. 创建出菜单类别表
2. 创建根据文章类别查询的API接口

## 1.1 创建`blog_menu`表

|field|type|note|
|-|-|-|
|id|int|PK, ↑|
|menu_name|varchar|`Video`,`Life` 对应文章类别|
|menu_id|int|`1`,`2`，用于数据库搜索|
|menu_icon|varchar|菜单导航按钮图标，无法使用|
|menu_path|int|`video`,`lifw`|




## 1.2 `getBlogByTypeId`API












