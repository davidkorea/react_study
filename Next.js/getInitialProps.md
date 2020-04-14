- 因为sync本身就会返回一个Promise对象，因此再sync路面无需再次创建promise
```javascript
Index.getInitialProps = async ()=>{
  const response = await axios('http://127.0.0.1:7001/getarticlelist')
  const data = await response.data
  // console.log(data);
  return data
}
```

```javascript
import Head from 'next/head'
import axios from 'axios'
import { useState } from 'react';

function Index(initprops){
  console.log('data: ', initprops.data);
  const [list, setList] = useState(initprops.data);

  return (
    <div>
      <div>index page</div>
      <div>
        {
          list.map((v,i)=>{
            return (
                <li key={i}>
                  <ul>{v.article_title}</ul>
                  <ul>{v.article_intro}</ul>
                </li>
            )
          })
        }
      </div>
    </div>
  )
}

Index.getInitialProps = async ()=>{
  const response = await axios('http://127.0.0.1:7001/getarticlelist')
  const data = await response.data
  // console.log(data);
  return data               // 此处返回的数据，可以在上面的函数中通过参数来接收，参数名叫什么不重要
}

export default Index

```


<img width="570" src="https://user-images.githubusercontent.com/26485327/79178511-12637e00-7e38-11ea-8bf2-ddad86487dcc.png">



# axios & getInitialProps & withRouter

- install axios `cnpm install --save axios`


# 1. getInitialProps

next规定所有ajax请求需要在getInitialProps中进行操作

```javascript
import Link from 'next/link'
import {withRouter} from 'next/router'
import axios from 'axios' 

function Page1({router, data}){      // 参数data是getInitialProps中请求的json数据的第二个data Array
     console.log(router);
     
    return (
        <div>
            <div className="page1">page1</div>
            <div>I am {router.query.name}, hello!!!!!</div>
            <Link href='/'><a>home page</a></Link>
            <div>{data}</div>
        </div>
    )
}

Page1.getInitialProps = async ()=>{               // next的ajax请求固定格式
    const promise = new Promise((resolve)=>{
        axios('https://www.easy-mock.com/mock/5e772e153ab3b77dfe8689c7/test/nextjs').then(
            res=>{
                console.log(res);
                resolve(res.data)
            }
        )
    })
    return await promise
}

export default withRouter(Page1)
```

```javascript
// api

{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
  data:
    data: Array(4)
      0: "david"
      1: "davidson"
      2: "dive"
      3: "joyce"
      length: 4
      __proto__: Array(0)
    __proto__: Object
    status: 200
    statusText: "OK"
  headers: {content-length: "44", content-type: "application/json; charset=utf-8"}
  config: {url: "https://www.easy-mock.com/mock/5e772e153ab3b77dfe8689c7/test/nextjs", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
  request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
  __proto__: Object
```



