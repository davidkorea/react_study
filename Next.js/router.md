
- 不同于 react-router-dom，每次指代加载点处显示路由之后的页面
- next的路由直接显示一个完整的页面，而不是加载点之后的局部空间内加载新页面

-----
# Router & Link & query传参
- next只能使用query来传参 `?id=1`，接收参数的页面需要使用`withRouter`来接收参数
  - react-router-dom 支持path传参 `/path/:id`
- 所有在pages目录下的js文件，都会被next自动路由
  - 使用时，无需import，直接填写文件路径即可，如`<Link href='page1'><a>page1</a><Link>`
  - 该href中的路径回显示为浏览器中的url
- 由于文件名直接作为url路径，而一般url都是小写字母，所以pages下面的**页面文件用小写字母命名**

# 1. Link
- 从next/link 中引入Link
- Link标签下必须嵌套 一个a标签
- a标签无需href参数，而**Link标签需要href参数**
- 如需引入响应路径的页面组件，因为next自动将pages目录下的页面组件路由好了

```javascript
import Link from 'next/link'

function Index(){
  return (
     <div>
      <Link href="/page1/"><a>page1</a></Link>
      <Link href="/page2/"><a>page2</a></Link>
    </div>
  )
}

export default Index
```


# 2. Router.push

```javascript
import Router from 'next/router'
function Index(){
  return (
    <div>
        <button onClick={()=>Router.push('/page1')}>page1</button>
    </div>
  )
}

export default Index
```

# 3. 传参

- next必须使用query的方式传递参数，即`?id=1&name=hi`

### 3.1 Link传参

- Link和上面一样，没有新用法
- **接收参数的页面需要使用withRouter将组件包裹后export出去，否则拿不到url的参数**

```javascript
// index.js

import Link from 'next/link'

function Index(){
  return (
    <div>
      <div className="title">hi</div>
      <Link href='/page1?name=david'><a>david</a></Link><br/>
      <Link href='/page1?name=davidson'><a>davidson</a></Link><br/>
      <Link href='/page1?name=dive'><a>dive</a></Link><br/>
    </div>
  )
}

export default Index
```

```javascript
// page1.js

import Link from 'next/link'
import {withRouter} from 'next/router'
 
function Page1({router}){     
    return (
        <div>
            <div className="page1">page1</div>
            <div>I am {router.query.name}, hello!!!!!</div>
            <Link href='/'><a>home page</a></Link>
        </div>
    )
}

export default withRouter(Page1)
```
- 组件函数接收一个参数，可以接收props，使用`props.router.query`来接收参数
  - 组件函数使用`{router}` 接收参数更方便，因为就传递进来这一个参数
- export时，必须使用withRouter包裹组件后，暴露出去，否则组件函数接收不到路由参数

### 3.2 Router.push传参

```javascript
// index.js


import Link from 'next/link'
import Router from 'next/router'

function Index(){

  const handleClick = ()=>{
    // Router.push('/page1?name=joyce')
    Router.push({
      pathname:'/page1',
      query:{name:'joyce'}
    })
  }
  
  return (
    <div>
      <div className="title">hi</div>
      <Link href='/page1?name=david'><a>david</a></Link><br/>
      <Link href='/page1?name=davidson'><a>davidson</a></Link><br/>
      <Link href='/page1?name=dive'><a>dive</a></Link><br/>
      <div>
        <button onClick={handleClick}>joyce</button>
      </div>
    </div>
  )
}
export default Index
```
- 接收参数的页面依然需要使用withRouter来export组件
- 使用按钮的onClick事件，来传递参数
- Router.push有两种方式传递参数
  - ```javascript
    Router.push('/page1?name=joyce')
    ```
  - ```javascript
    Router.push({
      pathname:'/page1',
      query:{name:'joyce'}
    })
    ```
    - 实际上这种分开写的方式，在Link中的href中也能使用







