

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




