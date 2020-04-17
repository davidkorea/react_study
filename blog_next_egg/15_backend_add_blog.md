# 添加新博客

1. 获取页面全部信息title，intro，content，type，date
2. 将获取到的信息保存到数据库
3. 更新文章



# 1. 获取页面输入信息

title，intro，content，type，date

## 1.1 title

onChange检测Input输入变化，同步更新标题状态e.target.value

```javascript
const [blogTitle, setBlogTitle] = useState('');

<Input placeholder="blog title" 
  onChange={e=>{setBlogTitle(e.target.value)}}
size="large"></Input>
```
## 1.2 Date

onChange事件接收2个参数，一个是日期格式，一个是字符串格式

```javascript
const [addDate, setAddDate] = useState('');

<div className="date-select">
    <DatePicker onChange={(date,dateString)=>{setAddDate(dateString)}} 
      size="large">
    </DatePicker>
</div>
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

