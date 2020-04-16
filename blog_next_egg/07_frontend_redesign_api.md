
# 前端API接口重新设置

由于每个页面或者组件（index，list，Header）后由自己的getInitialProps请求，那么每个请求的api都分散再不同页面，不方便管理。
- api服务器ip地址变更，或者求情路径变更，所有页面都要逐一更改
- 需要统一的集中化API管理

## 1. 创建config

1. 在前端项目的根目录下，创建condif文件夹，用于统一管理项目的配置文件，当然也包括API配置文件
2. 创建`api.js`
```javascript
const baseUrl = 'http://127.0.0.1:7001'

const API = {
    getBlogList: baseUrl + '/default/getbloglist',
    getBlogDetailById: baseUrl + '/default/getblogdetailbyid/',
    getMenuList: baseUrl + '/default/getmenulist',
    getBlogByTypeId: baseUrl + '/default/getblogbytypeid/'
}

export default API
```
3. 需要API的文件引入该配置文件
```javascript
import API from '../config/api'

Detail.getInitialProps = async(context)=>{
  let id = context.query.id
  // let response = await axios('http://127.0.0.1:7001/default/getblogdetailbyid/' + id)
  let response = await axios(API.getBlogDetailById + id)
  let data = await response.data
  return data
}
```
