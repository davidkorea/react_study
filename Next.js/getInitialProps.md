

# axios & getInitialProps & withRouter

- install axios `cnpm install --save axios`


# 1. getInitialProps

next规定所有ajax请求需要在getInitialProps中进行操作

```javascript
import Link from 'next/link'
import {withRouter} from 'next/router'
import axios from 'axios' 


function Page1({router, data}){
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

Page1.getInitialProps = async ()=>{
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



