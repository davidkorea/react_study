
# useContext
- 父子组件传值，代替class组件中的props，虽然function组件也有props
- 将父组件中的值（state的值）共享出去，给子组件使用
- 就像useState一样，给每个变量（每个状态）单独创建一个useState
  - context也一样，想共享哪个变量，给哪个变量创建一个createContext，相当于创建了一个组件，不能放在组件函数里面创建，要放在外面创建
  - 将这个reateContext从父组件中传递给子组件
- 在子组件中，在用useContext来调用传过来的变量

### 1.父组件 - 计数器
```javascript
import React, { useState, createContext } from 'react'

const countContext = createContext();        // 创建共享上下文组件

function Ex4(){
    const [count, setcount] = useState(0);
    // const countContext = createContext();  // 共享上下文，不能创建在组件函数内部
    return (
        <div className="">
            <div>you clicked {count} times</div>
            <button onClick={()=>setcount(count+1)} className="w-10 ml-2 shadow-md border-2">+1</button>
            
            <countContext.Provider value={count}>   // 组件固定用法Provider value
                <ChildCompnt></ChildCompnt>         // 将真正子组件放在共享上下文的组件内部
            </countContext.Provider>
        </div>
    )
}

export default Ex4
```
- import createContext，引入创建上下文
- 将需要共享出去的状态（变量），使用createContext创建好的 上下文共享组件
- 再将用于接收该共享状态的子组件，至于该共享上下文组件内部
- 上下文共享组件使用Provider和value，将状态共享出去，传递给包含在其内部的子组件

### 2. 子组件
```javascript
import React, {useContext} from 'react'

function ChildCompnt(){
    const count = useContext(countContext);   // 接收床底过来的参数，赋值给count变量
    
    return (
        <div>This is child component. count: {count}</div>
    )
}
```
- import useContext，引入使用上下文
- 子组件中使用useContext(父组件中创建的共享上下文组件名)，来啊接收传递过来的状态













