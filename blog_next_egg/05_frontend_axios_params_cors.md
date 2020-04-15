
# 前端跨页面url传参，请求api数据，CORS


# 1. 前端页面Link路由传参

#### index.html
```javascript
import Link from 'next/link'

<List 
  header={<div>Latest blogs</div>}
  itemLayout="vertical"
  dataSource={blogList}
  renderItem={item=>(
    <List.Item>
      <div className="item-title">
      
        <Link href={{pathname:'detail',query:{id:item.id}}}>
          <a>       // pathname为跳转至/pages文件夹下的detail文件，query为?id=1传参
            {item.article_title}
          </a>
        </Link>
        
      </div>
      <div className="item-icons">
        <span className='icon'><CalendarOutlined /> {item.add_time}</span>
        <span className='icon'><FolderOutlined /> {item.type_name}</span>
        <span className='icon'><FireOutlined/>  {item.view_count} views</span>
      </div>
      <div className="item-content">{item.article_intro}</div>
    </List.Item>
  )}
/>
```


#### detail.html
- 获取index页面传递来的路由参数，根据参数请求api数据
- getInitialProps获取之前页面传递的参数
- **更改react markdown 和 markdown nav 两个组件的source的值，否则报错**

```javascript
import ReactMarkdown from 'react-markdown'
import MarkdownNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'

function Detail(){
  return (
    <div className="article">
        <div className="title">{blog.article_title}</div>
        <div className="info">
            <span className='icon'><CalendarOutlined /> {blog.add_time}</span>
            <span className='icon'><FolderOutlined /> {blog.type_name}</span>
            <span className='icon'><FireOutlined/>  {blog.view_count} views</span>
        </div>
        <div className="content">
            <ReactMarkdown
                source={blog.article_content}     // 更改ReactMarkdown的source
                escapeHtml={false}
            ></ReactMarkdown>
        </div>
    </div>
    <Affix offsetTop={1}>
      <div className="navbar">
          <div className="nav-title">Chapter</div>
          <MarkdownNav
              className="nav-item"
              source={blog.article_content}source   // 更改MarkdownNav的source
          ></MarkdownNav>
      </div>
    </Affix>
  )
}

Detail.getInitialProps = async(context)=>{  
  console.log('context: ',context);
  let id = context.query.id                  // 从之前页面获取路由参数！！！！！！！！！
  let response = await axios('http://127.0.0.1:7001/default/getblogdetailbyid/' + id)
  let data = await response.data
  return data
}

export default Detail
```


# 2. CORS



