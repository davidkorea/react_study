# useContext+useReducer=Redux
- Redux
  - 状态共享 store = createStore()
  - 状态管理 reducer dispatch subscribe
- react Hooks
  - 状态共享 createContext，useContext
  - 状态管理 useReducer

# Demo
- 父组件 Ex6
  - 子组件 ShowArea  
  - 子组件 button
  
  

## 1. 静态实现
<img width="200" src="https://user-images.githubusercontent.com/26485327/76696506-314ee300-66c7-11ea-8ce5-ebbe4428413a.png">

#### - 父组件 Ex6
```javascript
import React from 'react'
import Buttons from './Buttons'
import ShowArea from './ShowArea'

function Ex6(){
    return (
        <div className="flex flex-col justify-center items-center">
                <ShowArea></ShowArea>
                <Buttons></Buttons>
        </div>
    )
}
export default Ex6
```
#### - 子组件 ShowArea

```javascript
import React from 'react'
function ShowArea(){
    return (
      <div className="m-2">The text color is: " "</div>
    )
}
export default ShowAreaBB
```
#### - 子组件 Buttons

```javascript
import React from 'react'
function Buttons(){
    return (
        <div>
            <button className="w-16 m-1 shadow border-2">Red</button>
            <button className="w-16 m-1 shadow border-2">Yellow</button>
        </div>
    )
}
export default Buttons
```

## 2. 动态实现
- 父组件创建共享状态，字体颜色color
- 所有子组件获取共享状态，变更状态后再次渲染到父组件
