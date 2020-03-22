

# css_style_jsx

next不支持`import './css.css'`文件，需要直接在组件js文件中使用style jsx

# 1. 静态样式
- 在pages目录下创建testcss.js页面，无需额外设置，直接在浏览器访问`http://localhost:3000/testcss`即可，next已经处理好路由

```javascript
function Testcss(){
    return (
        <div>
            <div>test css with style jsx</div>

            <style jsx>
            {`
                div{color:red;}
            `}
            </style>
        </div>
    )
}

export default Testcss
```
- 需要在return的第一次标签内，签入style标签，**花括号里面需要一对\`**


# 2. 动态改变样式
![Mar-22-2020 21-09-46](https://user-images.githubusercontent.com/26485327/77250241-84a1d200-6c81-11ea-8389-5adb988ecb5a.gif)


```javascript
import { useState } from "react"

function Testcss(){
    const [color, setColor] = useState('red');
    const changeColor = ()=>{
        setColor(color=='red'? 'blue' : 'red')
    }
    
    return (
        <div>
            <div>test css with style jsx</div>
            <button onClick={changeColor}>change color</button>

            <style jsx>
            {`
                div{color:${color};}
            `}
            </style>
        </div>
    )
}

export default Testcss
```
- style jsx中，css样式的属性值直接使用定义的状态变量`${state}`













