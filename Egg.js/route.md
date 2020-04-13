
# egg.js 多级路由

目录结构
```
/app
  - router.js        路由唯一入口，需要引入并指定子路由的路径
  
  - /router
     - default.js    子路由指定，某一特定url绑定哪个controller的哪个方法
     - admin.js
  
  - /controller
     - /admin
     - /default
       - home.js
```
