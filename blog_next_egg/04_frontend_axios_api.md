
# 前端页面请求API

# 1. axios
1. `cnpm install --save axios`
2. `import axios from 'axios'`

# 2. getInitialProps

- 使用`getInitialProps`发起axios请求

```javascript
function Home(propsData){     // 从下面getInitialProps获得的数据，无需解包，直接传入使用

  console.log('propsData: ',propsData);
  const [blogList, setBlogList] = useState(propsData.data)   // 获得getInitialProps传入的数据

  return (
    <div>
      {
        blogList.map((v,i)=>{
          ...
        })
      }
    </div>
  )
}

Home.getInitialProps = async()=>{
  let response = await axios('http://127.0.0.1:7001/default/getbloglist')
  let data = await response.data
  console.log('propsData: ',data);
  
  return data
}

export default Home
```

<img width="1244" src="https://user-images.githubusercontent.com/26485327/79301590-8c6d3300-7f1c-11ea-8028-36b00f9d8315.png">



```javascript
import{Row,Col,List} from 'antd'
import {CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons'

return (
  <List 
    header={<div>Latest blogs</div>}
    itemLayout="vertical"
    dataSource={blogList}
    renderItem={item=>(
      <List.Item>
        <div className="item-title">{item.article_title}</div>
        <div className="item-icons">
          <span className='icon'><CalendarOutlined /> {item.add_time}</span>
          <span className='icon'><FolderOutlined /> {item.type_name}</span>
          <span className='icon'><FireOutlined/>  {item.view_count} views</span>
        </div>
        <div className="item-content">{item.article_intro}</div>
      </List.Item>
    )}
  />
)
```
<img width="1410" src="https://user-images.githubusercontent.com/26485327/79302115-f89c6680-7f1d-11ea-8515-b7b14938aa56.png">


