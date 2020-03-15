
# useReducer

- reducer的思想源于redux，但是reducer的执行逻辑使用原生JavaScript就能实现
- reducer的核心思想就是，创建一个函数，这个函数接受2各参数，第一个为当前状态state，第二个为操作action
  - reducer函数就是根据action中提供的操作类型type来变更当前状态state，变更后生成一个新的state返回



# 1. 原生JavaScript实现reducer
- state数据结构
  - {name:'david', age:20}
- action数据结构
  - {type:'changeInput', value:25}
  
```javascript
function myReducer(state, action){
  switch(action.type){
    case 'changeInput':
      return {
        ...state,
        age: action.value
      }
    default:
      return staate
  }
}
```
- 函数根据传递进来的action对象获取到其内部的type属性，根据type属性来判断如何处理其value属性
- case匹配到type后，将原来的state对象解开，再将action的value将其替换掉，在生成一个新的状态对象返回
  - `...`的解宝方式自动返回一个新对象


# 2. react Hook - useReducer

```javascript
import React, { useReducer } from 'react'

const [state, dispatch] = useReducer(reducer函数, initialState, init)
```
- 其中dispatch函数是自带的，无需自行定义，用于事件绑定时，将action传递给reducer函数来处理
- reducer函数需要自行实现，根据action改变state，并返回新state

```javascript
import React, { useReducer } from 'react'

function Ex5(){
    // const [state, dispatch] = useReducer(reducer, initialState, init)
    const [count, dispatch] = useReducer((state, action)=>{
        switch(action.type){
            case "add":
                return state+action.value
            case "sub":
                return state-action.value
            default:
                return statae
        }
    }, 0)
    
    return (
        <div>
            <div>My Score is: {count}</div>
            <br/>
            <button onClick={()=>dispatch({type:'add',value:1})} className="w-10 border-2 shadow m-1">+1</button>
            <button onClick={()=>dispatch({type:'add',value:10})} className="w-10 border-2 shadow m-1">+10</button>
            <button onClick={()=>dispatch({type:'sub',value:1})} className="w-10 border-2 shadow m-1">-1</button>
        </div>
    )
}
export default Ex5
```
















