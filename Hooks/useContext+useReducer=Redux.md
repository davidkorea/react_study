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

![Mar-15-2020 17-15-38](https://user-images.githubusercontent.com/26485327/76698651-a1b62e00-66e0-11ea-98f4-c1dc55e396fe.gif)

#### - 父组件 Ex6
- 创建上下文，用于共享参数给子组件调用
  - 此处创建的上下文既传递参数变量出去，也传递方法函数出去（useReducer的dispatch）
  - **传递多参数时，需要初始化创建上下文为对象{}**
- 使用UseReducer，既创建出状态state，有创建出根据action类型type变更状态state的reducer函数
  - **由于useReducer可以直接初始化出一个状态state，因此无需再使用useState创建状态变量**
  

```javascript
import React, { createContext, useReducer } from 'react'
import Buttons from './Buttons'
import ShowArea from './ShowArea'

export const colorContext =  createContext({}) 
//创建一个上下文组件，共享color状态，必须是个对象{}，数组[]报错

function Ex6(){
    // const [color, setcolor] = useState('blue');  // useReducer函数已经创建出了状态
    const [color, dispatch] = useReducer((state, action)=>{
        switch(action.type){
            case "changeColor":
                return action.value
            default:
                return state
        }
    }, 'blue')    // 出书话状态变量color为'blue'

    return (
        <div className="flex flex-col justify-center items-center">
            <colorContext.Provider value={{color, dispatch}}>  // 共享多个参数，需要使用{}
                <ShowArea></ShowArea>
                <Buttons></Buttons>
            </colorContext.Provider>
        </div>
    )
}
export default Ex6
```


#### - 子组件 ShowArea

```javascript
import React, { useContext } from 'react'
import {colorContext} from './Ex6'

function ShowArea(){
    const {color} =  useContext(colorContext)

    return (
    <div className="m-2" style={{color:color}}>The text color is: {color}</div>
    )
}
export default ShowArea
```




#### - 子组件 Buttons

```javascript
import React, { Component, useContext } from 'react'
import {colorContext} from './Ex6'                 // 导入共享的上下文

function Buttons(){
    const {dispatch} = useContext(colorContext)    // 从上下文中取出dispatch函数
    console.log(dispatch);
    
    return (
        <div>                // 通过dispatch函数，将新的action对象传递给useReducer中的reducer函数     
            <button onClick={()=>dispatch({type:'changeColor',value:'red'})} 
              className="w-16 m-1 shadow border-2">Red</button>
            <button onClick={()=>dispatch({type:'changeColor',value:'teal'})} 
              className="w-16 m-1 shadow border-2">Teal</button>
        </div>
    )
}
export default Buttons
```





