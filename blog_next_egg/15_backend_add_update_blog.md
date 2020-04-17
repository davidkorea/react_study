# 添加新博客

1. 获取页面全部信息title，intro，content，type，date
2. 创建中台API，将获取到的信息保存到数据库
3. 更新文章



# 1. 获取页面输入信息

1. 获取信息title，intro，content，type，date
2. 按钮提交信息

## 1.1 title

onChange检测Input输入变化，同步更新标题状态e.target.value

```javascript
const [blogTitle, setBlogTitle] = useState('');

<Input placeholder="blog title" 
  onChange={e=>{setBlogTitle(e.target.value)}}
size="large"></Input>
```
## 1.2 Date

onChange事件接收2个参数，一个是Moment对象，一个是日期格式字符串2015-04-15格式

```javascript
const [addDate, setAddDate] = useState('');

<div className="date-select">
    <DatePicker onChange={(date,dateString)=>{setAddDate(dateString)}} 
      showTime={true}   // 增加显示时间
      size="large">
    </DatePicker>
</div>
```

- date
```
Moment {_isAMomentObject: true, _isUTC: false, _pf: {…}, _locale: Locale, _d: Fri Apr 17 2020 16:03:17 GMT+0800 (中国标准时间)…}
  _d: Fri Apr 17 2020 16:03:17 GMT+0800 (中国标准时间) {}
  _isAMomentObject: true
  _isUTC: false
  _isValid: true
  _locale: Locale {_calendar: {…}, _longDateFormat: {…}, _invalidDate: "Invalid date", _dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: ƒ, …}
  _pf: {empty: false, unusedTokens: Array(0), unusedInput: Array(0), overflow: -2, charsLeftOver: 0, …}
  __proto__: Object
```

- datestring
```
2020-04-17 18:01:14    
// 此格式可以直接new Date(2020-04-17 18:01:14).getTime()/1000 转化为unix timestamp
```

## 1.3 Intro & Content

之前maarkdown时，已经实现，跟随变化同步更新状态

```javascript
const [blogContent, setBlogContent] = useState('');
const [previewContent, setPreviewContent] = useState('');
const [blogIntro, setBlogIntro] = useState('');
const [previewIntro, setPreviewIntro] = useState('');

const contentChange = (e)=>{
    setBlogContent(e.target.value)
    let html = marked(e.target.value)
    setPreviewContent(html)
}

const introChange = (e)=>{
    setBlogIntro(e.target.value)
    let html = marked(e.target.value)
    setPreviewIntro(html)
}


<Row gutter={10}>
    <Col span={12}>
        <TextArea className="markdown-content"
            rows={30}
            onChange={contentChange}
        ></TextArea>
    </Col>
    <Col span={12}>
        <div className="content-preview"
            dangerouslySetInnerHTML={{__html:previewContent}}
        ></div>
    </Col>
</Row>

<Row>
    <Col span={24}>
        <TextArea placeholder="introduction" rows={6}
            onChange={introChange}
        ></TextArea>
    </Col>
</Row>
<Row>
    <Col span={24}>
        <div className="intro-preview" dangerouslySetInnerHTML={{__html:previewIntro}}></div>
    </Col>
</Row>
```

## 1.4 Type

前面一节，已经设置了鉴权+请求文章类别 [14_backend_blogType](https://github.com/davidkorea/react_study/blob/master/blog_next_egg/14_backend_blogType.md)


## 1.5 Save & Publish 提交信息

```javascript
const handleSave = ()=>{
    if(!blogTitle){
        message.warn('No Title')
        return false
    }else if(!blogTypeSelected){
        message.warn('No Type')
        return false
    }else if(!addDate){
        message.warn('No Date')
        return false
    }else if(!blogContent){
        message.warn('No Content')
        return false
    }else if(!blogIntro){
        message.warn('No Intro')
        return false
    }

    message.success('ok')        
}

<Button onClick={handleSave} type="primary" size="large">Save</Button>
```

<img width="800" src="https://user-images.githubusercontent.com/26485327/79548423-01c93700-80c8-11ea-94ed-ebfe243af76b.png">


# 2. Middle API & Database

1. Egg controller
2. Egg route
3. Backend global APi config
4. AddArticle Page logic


## 2.1 Middle 

#### Route

- `app/route/admin.js`
```diff
  module.exports = app => {
    const { router, controller } = app;
    var adminAuth = app.middleware.adminAuth()
    router.get('/admin', controller.admin.main.Index);
    router.post('/admin/login', controller.admin.main.Login);
    router.get('/admin/getblogtype', adminAuth, controller.admin.main.getBlogType);
+   router.post('/admin/addarticle',adminAuth, controller.admin.main.AddArticle); 
  };
```

- POST请求
- 鉴权adminAuth，未登录，无法请求该url


#### Controller

- `app/controller/admin/main.js` 

```javascript
async AddArticle(){
    const tempArticle = this.ctx.request.body
    console.log('tempArticle: ',tempArticle);          //

    const result = await this.app.mysql.insert('blog_article',tempArticle)  // 表名，数据
    console.log('sqlresult: ',result);                 //

    const insertSuccess = result.affectedRows === 1    // 改变一行表示插入成功
    const insertId = result.insertId                   // 当前插入条目的id，就是数据库中表的id字段

    console.log('insertSuccess: ',insertSuccess);      //
    console.log('insertId: ', insertId);               //

    this.ctx.body = {
        insertSuccess: insertSuccess,
        insertId: insertId
    }
}
```

- tempArticle

```
tempArticle:  {
  article_title: '12345678',
  article_intro: 'wqefsdcvx ',
  article_content: 'adsfghjkhgfdsa',
  article_type_id: 1,
  add_time: 1586016000,
  view_count: 0
}
```
- sqlresult
```
sqlresult:  OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 8,              // 就是数据库中表的主键id字段
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0
}
```

- insertSuccess & insertId
```
insertSuccess:  true
insertId:  8
```



## 2.2 Backend

### Global API

- `src/Config/api.js`

```diff
  const baseUrl = 'http://127.0.0.1:7001/admin'
  const API = {
      login: baseUrl + '/login',
      getBlogType: baseUrl + '/getblogtype',
+     AddArticle: baseUrl + '/addarticle'
  }
  export default API
```

### AddArticle页面提交逻辑

```javascript
const [blogId, setBlogId] = useState(0)  // 创建状态用于保存中台返回的数据insertId
                                         // 就是数据库中表的主键id字段
const handleSave = ()=>{
    if(!blogTitle){
        message.warn('No Title')
        return false
    }else if(!blogTypeSelected){
        message.warn('No Type')
        return false
    }else if(!addDate){
        message.warn('No Date')
        return false
    }else if(!blogContent){
        message.warn('No Content')
        return false
    }else if(!blogIntro){
        message.warn('No Intro')
        return false
    }

    let tempBlog = {} // 该对象的每个属性对应 数据库中的字段
    tempBlog.article_title = blogTitle
    tempBlog.article_intro = blogIntro
    tempBlog.article_content = blogContent
    tempBlog.article_type_id = blogTypeSelected
    // let time = addDate.replace('-','/') // 把-换成/，无需转换，可直接生成时间戳
    tempBlog.add_time = (new Date(addDate).getTime())/1000

    console.log(tempBlog);

    if(blogId === 0){  // 新增加文章
        tempBlog.view_count = 0
        axios({
            method: 'post',
            url: API.AddArticle,
            data: tempBlog, 
            withCredentials: true
        }).then(res=>{   // 新增请求成功，会得到insertId
            console.log(res.data);
            setBlogId(res.data.insertId)
            if(res.data.insertSuccess){
                message.success('Add new blog success')
            }else{
                message.error('Add failed')
            }
        })
    }else{
      // update current blog
    }
}
```


# 3. 更新已添加文章

- 由于上面创建新文章后，没有执行将所有输入的信息清空，所以，可以继续添加或者修改内容，继续保存
- 为了更新同一文章不会再创建一条新记录，需要获取该文章在数据库表中的id，并根据该id更新记录


## 3.1 Middle API

- POST `http://127.0.0.1:7001/admin/updatearticle`

#### Controller
1. 获取文章在数据库表中的id
2. 根据该id，更新该条记录
```javascript
async updateArticle(){
    const currentBlog = this.ctx.request.body   //currentBlog包含insertId
    const result = await this.app.mysql.update('blog_article',currentBlog)
    //currentBlog包含insertId，update函数会自动更新数据

    const updaateSuccess = result.affectedRows === 1
    this.ctx.body = {
        updaateSuccess: updaateSuccess
    } 
}
```


#### Router
```diff
  module.exports = app => {
    const { router, controller } = app;
    var adminAuth = app.middleware.adminAuth()
    router.get('/admin', controller.admin.main.Index);
    router.post('/admin/login', controller.admin.main.Login);
    router.get('/admin/getblogtype', adminAuth, controller.admin.main.getBlogType);
    router.post('/admin/addarticle',adminAuth, controller.admin.main.AddArticle);
+   router.post('/admin/updatearticle',adminAuth, controller.admin.main.AddArticle);
  };
```


## 3.2 Backend

#### Global API setting
```diff
  const baseUrl = 'http://127.0.0.1:7001/admin'
  const API = {
      login: baseUrl + '/login',
      getBlogType: baseUrl + '/getblogtype',
      AddArticle: baseUrl + '/addarticle',
+     updateArticle: baseUrl + '/updatearticle'
  }
  export default API
```

#### AddArticle更新文章逻辑
```javascript
    const [blogId, setBlogId] = useState(0)  // insertId
    const handleSave = ()=>{
        if(!blogTitle){
            message.warn('No Title')
            return false
        }else if(!blogTypeSelected){
            message.warn('No Type')
            return false
        }else if(!addDate){
            message.warn('No Date')
            return false
        }else if(!blogContent){
            message.warn('No Content')
            return false
        }else if(!blogIntro){
            message.warn('No Intro')
            return false
        }

        let tempBlog = {} // 该对象的每个属性对应 数据库中的字段
        tempBlog.article_title = blogTitle
        tempBlog.article_intro = blogIntro
        tempBlog.article_content = blogContent
        tempBlog.article_type_id = blogTypeSelected
        // let time = addDate.replace('-','/') // 把-换成/
        // addDate: 2020-04-17 17:57:27 无需转换-和/，直接可以被识别
        tempBlog.add_time = (new Date(addDate).getTime())/1000

        console.log(tempBlog);
        
        if(blogId === 0){  // 新增加文章，状态blogId初始值为0
            tempBlog.view_count = 0
            axios({
                method: 'post',
                url: API.AddArticle,
                data: tempBlog, 
                withCredentials: true
            }).then(res=>{   // 新增请求成功，会得到insertId
                console.log(res.data);
                setBlogId(res.data.insertId)
                if(res.data.insertSuccess){
                    message.success('Add new blog success')
                }else{
                    message.error('Add failed')
                }
            })
        }else{      // 状态blogId不为0，说明不是初始状态，判断为更新已有文章
            tempBlog.id = blogId   // blogId就是数据库表中该文章的id字段
            axios({
                method: 'post',
                url: API.updateArticle,
                data: tempBlog,
                withCredentials: true
            }).then(res=>{
                if(res.data.updateSuccess){
                    message.success('Update success')
                }else{
                    message.error('Update failed')
                }
            })
        }
    }
```

