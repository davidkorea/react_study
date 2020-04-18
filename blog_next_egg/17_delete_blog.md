

# 列表页中删除博客

1. Middle API
2. ArticleList删除逻辑


# 1. API

### Controller
```javascript
async deleteArticle(){
    const id = this.ctx.params.id  // GET请求的动态参数 ../1
    const result = await this.app.mysql.delete('blog_article',{'id':id})
    if(result.affectedRows ===1){
        console.log('result: ',result);
        this.ctx.body={data:result}
    }
}
```

### Route
```diff
+  router.get('/admin/deletearticle/:id', adminAuth, controller.admin.main.deleteArticle);
```
- POST
- 路由动态传参 `/:id`


# 2. Backend 

### Global API Settings
```javascript
deleteArticle: baseUrl + '/deletearticle/',     // 需要加文章id
```

### 页面逻辑

```javascript
import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, message } from 'antd';
import axios from 'axios'
import API from '../Config/api'
import {EditOutlined, DeleteOutlined,CloseCircleOutlined} from '@ant-design/icons'
const {confirm} = Modal

function ArticleList(props){
    const columns = [
        {
          title: 'Title',
          dataIndex: 'article_title',
          key: 'article_title',             // key要和数据库中表的字段名一致！！！
          render: text => <a>{text}</a>,
        },
        {
          title: 'Date',
          dataIndex: 'add_time',
          key: 'add_time',
        },
        {
            title: 'View',
            dataIndex: 'view_count',
            key: 'view_count',
          },
        {
          title: 'Type',
          key: 'type_name',
          dataIndex: 'type_name',
          render: x => {    // x就是类别名称
            //   console.log(x);
              if(x){
                let color = x=='Video'?'geekblue' : 'green'
                return (
                  <Tag color={color} key={x}>
                    {x}
                  </Tag>
                );
              }
          }
        },
        {
          title: 'Action',
          key: 'action',
          render: (record) => { // record就是当前记录本身，包含所有数据库返回字段!!!!!!!
                                // 取出id字段，用于删除，编辑当前文章！！！！！！！            
              return(
                <span>
                <a style={{marginRight: 16}} ><EditOutlined /></a>
                <a style={{color:'tomato'}} onClick={()=>deleteArticle(record)} ><DeleteOutlined /></a>
                </span>
              );
            },
        },
      ];

    const [blogList, setBlogList] = useState([]);

    useEffect(()=>{
        getArticleList()
    },[])

    const getArticleList = () => {
        axios({
            method: 'get',
            url: API.getArticleList,
            withCredentials: true
        }).then(res=>{
            // console.log(res.data.data);
            setBlogList(res.data.data)
        })
    }

    const deleteArticle = record => {
        console.log(record);
        confirm({
            title: 'Are you sure to delete?',
            content: `Delete " ${record.article_title} " will not be recovered.`,
            icon: <CloseCircleOutlined style={{color:'tomato'}} />,
            okType: 'danger',
            onCancel(){
                message.info('Cancelled delete')
            },
            onOk(){
                axios({
                    method: 'get',
                    url: API.deleteArticle + record.id,
                    withCredentials: true
                }).then(res=>{
                    console.log(res);
                    message.success('Deleted')
                    getArticleList()  // 删除成功后，需要重新获取最新数据
                                     // 最佳实践不是请求数据库，而是更新页面的状态setBlogList！！！！！
                })
            }
        })
    }

    return (
        <div classtitle="articlelist">
            <Table pagination={{pageSize:10}} columns={columns} dataSource={blogList} />
        </div>
    )
}

export default ArticleList
```






