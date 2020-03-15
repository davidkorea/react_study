
# 1. useEffect

```javascript
useEffect(() => {
    effect
    return () => {
        cleanup
    };
}, [input]);
```
- useEffect函数接收两个参数，第一个是处理函数，第二个是依赖项
- 当且仅当依赖项的值发生变化时，才会调用该useEffect的第一个参数，也就是处理函数
  - 依赖项可以是一个useState的状态，也可以是一个普通的变量
- 第一个参数处理函数中可以有一个return，用于当依赖项发生变化后，清除当先处理函数
    - 相当于willUnmount的作用 
    
## Demo1 定时器
### 1. 错误
```javascript
function Ex1(){
    const [count, setCount] = useState(0)

    useEffect(()=>{
        console.log('hi')
        setInterval(()=>{
            setCount(count + 1) //定时器每1s将状态count加1
        },1000)
    })

    return (
        <div>{count}</div>
    )
}
```
- 没有指定依赖项，那么只要组件内有任意一个状态更新，useEffect默认被调用一次，类似didUpdate生命周期函数
- 由于定时器函数中，每1s变更一次状态，状态变化，useEffect自动被触发，那么每1秒useEffect执行一次
- useEffect每执行一次，都会创建一个新的setInterval定时器函数
- 这样造成了2个死循环
    - 每次变更state，触发一次useEffect
    - 每次useEffect被触发，新创建一个setInterval定时器函数，新定时器函数又会更改状态...
    
![Mar-15-2020 10-14-05](https://user-images.githubusercontent.com/26485327/76693764-bd501300-66a5-11ea-8370-661a370b4526.gif)


### 2. 正确
```diff
  function Ex1(){
      const [count, setCount] = useState(0)
  
      useEffect(()=>{
          console.log('hi')
-         setInterval(()=>{
+         const timer = setInterval(()=>{
              setCount(count + 1) //定时器每1s将状态count加1
          },1000)
+         return ()=clearInterval(timer)
-      })
+      }, [count])
  
      return (
          <div>{count}</div>
      )
  }
```
- 把状态count，添加为依赖项，当依赖项变化时，调用useEffect函数，也会触发useEffect函数中处理函数的return来解绑上一个处理函数
- 给计数器函数命名，在添加return，当依赖项变化时，执行return后面的函数，来清除上一次的处理函数，也就清除了计时器setInterval

![Mar-15-2020 10-24-27](https://user-images.githubusercontent.com/26485327/76693903-313eeb00-66a7-11ea-8f99-6774529f1789.gif)




## Demo2 路由，测试生命周期
- 安装路由 `% cnpm install --save react-router-dom`
- `import {BrowserRouter as Router, Route, Link} from 'react-router-dom'`
- 创建2个组件Index和List，通过路由添加到主组件
  - 主组件中添加子组件的路由后，点击子组件，会显示当先组件的名称

### 1. 主组件本身没有逻辑，仅显示子组件


```javascript
import React, { useEffect } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

// index组件
function Index(){
    useEffect(() => {
        console.log('============================')
        console.log('useEffect ----- Index hi');
        return ()=>console.log('useEffect --- Index 886')
    });
    return (
        <div className="text-2xl mt-10">Index Page</div>
    )
}

// list组件
function List(){
    useEffect(() => {
        console.log('============================')
        console.log('useEffect ----- List hi');
        return ()=>console.log('useEffect --- List 886')

    });
    return (
        <div className="text-2xl mt-10">List Page</div>
    )
}


function Ex3(){
    const [count, setCount] = useState(0);
    return (
        <div className="mt-4 w-64 h-32 border-2 shadow-lg flex flex-col">
            <Router>
                <div className="flex text-center">
                    <div className="border-2 w-12 shadow-md"><Link to="/">index</Link></div>
                    <div className="border-2 w-12 shadow-md"><Link to="/list/">list</Link></div>
                </div>
                <Route path="/" exact component={Index}></Route>
                <Route path="/list/" component={List}></Route>
            </Router>
        </div>
    )
}
export default Ex3
```

- 每次点击切换子组件时，上一个组件执行return来消灭其自身，新被点击的组件将会执行useEffect中的函数
  - 再次切换组件时，则再次执行销毁当前组件，加载新组件

![Mar-15-2020 11-06-10](https://user-images.githubusercontent.com/26485327/76694427-80881a00-66ad-11ea-8ab7-f5ec8bb90a8b.gif)



### 2. 主组件有逻辑，同时示子组件
- 主组件本身有点击加一功能
    - 每当主组件更新时，当前路由展示的子组件也会先销毁再次加载

![Mar-15-2020 11-14-36](https://user-images.githubusercontent.com/26485327/76694481-30f61e00-66ae-11ea-820f-b621fc654017.gif)

```javascript
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

// index组件
function Index(){
    useEffect(() => {
        console.log('============================')
        console.log('useEffect ----- Index hi');
        return ()=>console.log('useEffect --- Index 886')
    });
    return (
        <div className="text-2xl mt-10">Index Page</div>
    )
}

// list组件
function List(){
    useEffect(() => {
        console.log('============================')
        console.log('useEffect ----- List hi');
        return ()=>console.log('useEffect --- List 886')
    });
    return (
        <div className="text-2xl mt-10">List Page</div>
    )
}


function Ex3(){
    const [count, setCount] = useState(0);
    return (        
        <div>
            <div className="ex1 flex">
                <div>{count}</div>
                <button onClick={()=>setCount(count+1)} className="ml-4 w-10 border-2">+1</button>
            </div>
            <div className="mt-4 w-64 h-32 border-2 shadow-lg flex flex-col">
                <Router>
                    <div className="flex text-center">
                        <div className="border-2 w-12 shadow-md"><Link to="/">index</Link></div>
                        <div className="border-2 w-12 shadow-md"><Link to="/list/">list</Link></div>
                    </div>
                    <Route path="/" exact component={Index}></Route>
                    <Route path="/list/" component={List}></Route>
                </Router>
            </div>
        </div>
    )
}
export default Ex3
```

- 起始主组件变化时，子组件无需跟着变换，因为子组件的状态没有变化
    - 如果一起变化，造成性能浪费
- 给子组件的useEffect添加依赖项，添加一个空数组[]，这样表示只有组件加载时，才会调用useEffect
    - 也就是只有子组件真的被加载时，才会调用useEffect
    - 而不会跟随父组件的更新而跟随渲染

```javascript
// index组件
function Index(){
    useEffect(() => {
        console.log('============================')
        console.log('useEffect ----- Index hi');
        return ()=>console.log('useEffect --- Index 886')
    }, []);
    
    return (
        <div className="text-2xl mt-10">Index Page</div>
    )
}
```
![Mar-15-2020 11-22-30](https://user-images.githubusercontent.com/26485327/76694562-4ae43080-66af-11ea-97a9-48edbee03022.gif)



