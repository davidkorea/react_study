
# 博客分类 + 路由守卫

当用户未登录时，无法调用获取博客分类的api请求后端服务器


1. Middle， API
2. backend， addArticle page


# 1. Middle - API

## 1.1 路由鉴权
### Controller

- `controller/admin/main.js`
```javascript
async getBlogType(){
    let type = await this.app.mysql.select('blog_type')
    this.ctx.body = {data:type}
}
```
### Route
- `app/route/admin.js`
```diff
  module.exports = app => {
    const { router, controller } = app;
    var adminAuth = app.middleware.adminAuth()
    router.get('/admin', controller.admin.main.Index);
    router.post('/admin/login', controller.admin.main.Login);
+   router.get('/admin/getblogtype', adminAuth, controller.admin.main.getBlogType)  
  };
```
<img width="378"  src="https://user-images.githubusercontent.com/26485327/79539909-cde71500-80b9-11ea-9c0c-cd07af597840.png">


# 2. Backend

## 2.1 Global API settings

- `src/Config/api.js`

```javascript
const baseUrl = 'http://127.0.0.1:7001/admin'

const API = {
    login: baseUrl + '/login',
    getBlogType: baseUrl + '/getblogtype'
}

export default API
```

## 2.2 AddArticle Page

1. 页面加载后，axios请求获取文章类别信息

```javascript
import axios from 'axios'
import API from '../Config/api'

function AddArticle(props){

    const [blogType, setBlogType] = useState([]);
    const [blogTypeSelected, setBlogTypeSelected] = useState('Video');

useEffect(()=>{
        getBlogType()
    },[])

    const getBlogType = ()=>{
        axios({
            method: 'get',
            url: API.getBlogType,
            withCredentials: true   // 跨域cookie
        }).then(res=>{
            if(res.data.data == 'no login'){  // egg app/middle/adminAuth中设置
                localStorage.removeItem('openId')
                props.history.push('/')
            }else{
                setBlogType(res.data.data)
            }
        })
    }

    return (
<Select defaultValue={blogTypeSelected} 
                                onChange={(value)=>setBlogTypeSelected(value)}  
                                // value由组件自动传入，就是下面Option中的value
                                size="large"
                            >
                                {
                                    blogType.map((v,i)=>{
                                        return(<Option key={i} value={v.id}>{v.type_name}</Option>)
                                    })
                                }
                            </Select>
    ）
}

```




















