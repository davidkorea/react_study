
# 博客分类 + 路由守卫

当用户未登录时，无法调用获取博客分类的api请求后端服务器


1. Middle， API
2. backend， addArticle page


# 1. Middle - API 路由鉴权

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

### Test API

- Chome已登录博客
<img width="378"  src="https://user-images.githubusercontent.com/26485327/79539909-cde71500-80b9-11ea-9c0c-cd07af597840.png">

 
- Safari未登录博客

<img width="481"  src="https://user-images.githubusercontent.com/26485327/79545126-c841fd00-80c2-11ea-84f4-2d6f4efd7c82.png">



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

### 1. 页面加载后，axios请求获取文章类别信息

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
                props.history.push('/')       // 检测没有登录，跳转至login页面
            }else{
                setBlogType(res.data.data)
            }
        })
    }

    const handleTypeSelected = (value)=>{    // 需要将选择的类别转换为id，存储数据库
        if(value='Video'){
            setBlogTypeSelected(1)
        }else if(value='Life'){
            setBlogTypeSelected(2)
        }
    }

    return (
        <Select defaultValue={blogTypeSelected} 
            onChange={(value)=>handleTypeSelected(value)}  
            // onChange={(value)=>setBlogTypeSelected(value)}  由于数据库需要type_id字段，需要数字
            // 参数value由组件自动传入，就是下面Option中的value
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



















