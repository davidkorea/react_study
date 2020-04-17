# 添加新博客

1. 获取页面全部信息title，intro，content，type，date
2. 将获取到的信息保存到数据库
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
2020-04-17
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







