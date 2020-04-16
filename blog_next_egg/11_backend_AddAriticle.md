

# 添加文章页面

1. `cnpm install --save marked`
2. AdminIndex页面路由该页面，将`http://localhost:3001/index`路由给AddArticle页面
3. AddArticle页面布局，markdown展示

# 1. AdminIndex配置路由

```javascript
import {Route} from 'react-router-dom'
import AddArticle from './AddArticle'

<Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Console</Breadcrumb.Item>
      <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
    </Breadcrumb>

    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      <div>
        <Route path="/index" exact component={AddArticle}></Route>  // 配置路由
      </div>
    </div>
</Content>
```


# 2. AddArticle页面布局

<img width="500" src="https://user-images.githubusercontent.com/26485327/79455063-e0f8d700-801e-11ea-83a5-37d40159a24c.jpeg">

<img width="1440" src="https://user-images.githubusercontent.com/26485327/79455317-4351d780-801f-11ea-9b29-49bfcb78ba5a.png">


```javascript
import React,{useState} from 'react'
import marked from 'marked'
import '../Static/css/AddArticle.css'
import {Row,Col,Button,Input,Select,DatePicker,TimePicker} from 'antd'
const {Option} = Select
const {TextArea} = Input


return (
    <div className="addarticle">
        <Row gutter={10}>

            {/* left */}
            <Col span={18}>
                <Row gutter={[20,20]}> {/* gutter={[ 水平间隔，上下间隔 ]} */}
                    <Col span={20}>
                        <Input placeholder="blog title" size="large"></Input>
                    </Col>
                    <Col span={4}>
                        <Select defaultValue="1" size="large">
                            <Option value="1">Video</Option>
                        </Select>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={12}>
                        <TextArea className="markdown-content" rows={30}></TextArea>
                    </Col>
                    <Col span={12}>
                        <div className="content-preview"></div>
                    </Col>
                </Row>
            </Col>

            {/* right */}
            <Col span={6}>
                <Row gutter={[20,20]}>
                    <Col span={6}>
                        <Button type="primary" size="large">Save</Button>
                    </Col>
                    <Col span={6}>
                        <Button type="dashed" size="large">Publish</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <TextArea placeholder="introduction" rows={6}></TextArea>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div className="intro-preview"></div>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={12}>
                        <div className="date-select">
                            <DatePicker placeholder='date' size="large"></DatePicker>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="time-select">
                            <TimePicker placeholder='time' size="large"></TimePicker>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
）
```

# 3. AddArticle设置Markdown

1. 页面使用marked渲染markdown
2. css 配合渲染后的代码块样式


```javascript
import marked from 'marked'

function AddArticle(){

    marked.setOptions({
        renderer: new marked.Renderer(),   // 配置marked
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartypants: true,
        smartypants: false
    })

    const [articleContent, setArticleContent] = useState('');
    const [previewContent, setPreviewContent] = useState('');
    const [articleIntro, setArticleIntro] = useState('');
    const [previewIntro, setPreviewIntro] = useState('');

    const contentChange = (e)=>{            // 文章内容
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setPreviewContent(html)
    }

    const introChange = (e)=>{              // 文章简介
        setArticleIntro(e.target.value)
        let html = marked(e.target.value)
        setPreviewIntro(html)
    }

    return (
        <div className="addarticle">
            <Row gutter={10}>

                {/* left */}
                <Col span={18}>
                    <Row gutter={[20,20]}> {/* gutter={[ 水平间隔，上下间隔 ]} */}
                        <Col span={20}>
                            <Input placeholder="blog title" size="large"></Input>
                        </Col>
                        <Col span={4}>
                            <Select defaultValue="1" size="large">
                                <Option value="1">Video</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea className="markdown-content"
                                rows={30}
                                onChange={contentChange}   // 绑定onChange事件，变更状态
                            ></TextArea>
                        </Col>
                        <Col span={12}>
                            <div className="content-preview"   // 显示转化后的文本
                                dangerouslySetInnerHTML={{__html:previewContent}}
                            ></div>
                        </Col>
                    </Row>
                </Col>

                {/* right */}
                <Col span={6}>
                    <Row gutter={[20,20]}>
                        <Col span={6}>
                            <Button type="primary" size="large">Save</Button>
                        </Col>
                        <Col span={6}>
                            <Button type="dashed" size="large">Publish</Button>
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
                    <Row gutter={20}>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker placeholder='date' size="large"></DatePicker>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="time-select">
                                <TimePicker placeholder='time' size="large"></TimePicker>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle
```
```css
.content-preview {
    height: 100%;
    padding: 10px;
    background-color: #f8f8f8;
}

.intro-preview {
    min-height: 100px;
    margin-top: 10px;
    padding: 10px;
    background-color: #f8f8f8;
}

.date-select,
.time-select {
    margin-top: 10px;
}

.content-preview h1 {
    font-size: 30px;
}

.content-preview h2 {
    font-size: 28px;
    border-bottom: 1px solid #cbcbcb;
}

.content-preview h3 {
    font-size: 24px;
}

.content-preview pre {
    display: block;
    background-color: #f0f0f0;
    padding: 5px;
    border-radius: 5px;
}

.content-preview pre>code {
    color: #000;
    background-color: #f0f0f0;
}

.content-preview code {
    background-color: #fff5f5;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 0px 3px;
    color: #ff502c;
}

.content-preview blockquote {
    border-left: 4px solid #cbcbcb;
    padding: 10px 10px 10px 30px;
    background-color: #f8f8f8;
}

.intro-preview h1 {
    font-size: 30px;
}

.intro-preview h2 {
    font-size: 28px;
    border-bottom: 1px solid #cbcbcb;
}

.intro-preview h3 {
    font-size: 24px;
}

.intro-preview pre {
    display: block;
    background-color: #f0f0f0;
    padding: 5px;
    border-radius: 5px;
}

.intro-preview pre>code {
    color: #000;
    background-color: #f0f0f0;
}

.intro-preview code {
    background-color: #fff5f5;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 0px 3px;
    color: #ff502c;
}

.intro-preview blockquote {
    border-left: 4px solid #cbcbcb;
    padding: 10px 10px 10px 30px;
    background-color: #f8f8f8;
}
```

