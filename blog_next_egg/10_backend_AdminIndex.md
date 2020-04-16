
# 管理后台主页

- 使用antd Layout模板 [Layout布局](https://ant.design/components/layout-cn/)
- 将原有class组件改成function组件


<img width="765" src="https://user-images.githubusercontent.com/26485327/79425395-38ce1880-7ff4-11ea-8e66-a4875ded1b5c.png">


# 1. AdminIndex页面
```javascript
// AdminIndex.js
import React, { useState } from 'react'
import '../Static/css/AdminIndex.css'
import { Layout, Menu, Breadcrumb } from 'antd'
import {
  PieChartOutlined,
  FileAddOutlined,
  OrderedListOutlined,
  CommentOutlined
} from '@ant-design/icons'
const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu


function AdminIndex(){
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed)
    };
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />

          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <PieChartOutlined />
              <span>Dashboard</span>
            </Menu.Item>

            <Menu.Item key="2">
              <FileAddOutlined />
              <span>Add Article</span>
            </Menu.Item>

            <SubMenu
              key="sub1"
              title={
                <span>
                  <OrderedListOutlined />
                  <span>Manage Article</span>
                </span>
              }
            >
              <Menu.Item key="3">Add</Menu.Item>
              <Menu.Item key="4">List</Menu.Item>
            </SubMenu>

            <Menu.Item key="9">
              <CommentOutlined />
              <span>Comments</span>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>

            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Console</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>

            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Admin Management Console
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}> ©2020 Davidkorea.com</Footer>
        </Layout>
      </Layout>
    );
}
export default AdminIndex
```
```css
// AdminIndex.css
.logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}
```

# 2. 路由

```javascript
// Main.js
function Main(){
    return (
        <div className="main">
            <Router>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/index" exact component={AdminIndex}></Route>
            </Router>
        </div>
    )
}
```







