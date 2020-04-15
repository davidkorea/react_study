

# Middle - API Service - Egg.js


# 1 Egg.js Get Started

1. `mkdir middle && cd middle`
2. `egg-init api-service-1`, simple
3. `cd api-service-1`
4. `cnpm install`
5. `npm run dev`, `http://127.0.0.1:7001/`

# 2. RESTful API

- frontend default api
- backend admin api

## 2.1 Route
```
/app
  route.js         // 路由入口文件，引入下面的子路由配置文件

  /Route
     default.js    // frontend api route
     admin.js      // backend api route
```
## 2.2 Controller
```
/app
  /controller
     /defaualt
     /admin
```





























