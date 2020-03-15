
# useRef
1. 跟随存储变量
2. 绑定原生DOM

# 1. 从计时器Demo说起
## 1.1 计时器问题出在哪里
```javascript
import React, { useState, useEffect } from 'react'
function Ex7(){
    const [count, setcount] = useState(0);

    useEffect(() => {
        console.log('hi');
        const timer = setInterval(() => {
            setcount(count + 1)
        }, 1000);
    },[count]);

    return (
        <div>
            <div>{count}</div>
            <button></button>
        </div>
    )
}
export default Ex7
```
```javascript
    useEffect(() => {
        console.log('hi');
        const timer = setInterval(() => {
            setcount(count + 1)
        }, 1000);
    });
```
- 无论useEffect中是否有依赖项，都有问题
  - 每次setCount一次，状态count变化一次，音儿组件update一次，**一旦更新，useEffect又会被执行（didMoungt，didUpdate）**...
  - 改变状态是在useEffect计时器setInterval里面，每1s就变化一次，也就是每1s更新一次组件，也就是每1s调用一次useEffect，也就每一秒都创建一个新的计时器setInterval
  - 这样就无线循环，就会有无数多个计时器setInterval，出现错乱
    - 如果不是定时器自动+1，而是按钮触发事件来+1，就不会由这种无线死循环的现象
    - 因为执行+1实在事件函数里面，而不是useEffect每次更新组件都会被触发，而是点击时才会触发
    
- 解决方法1：设置依赖项为状态count，以及设置return
  - 每次状态变化，都会调用return来清除当前的计时器setInterval，下次重新在创建
  - 而状态count里面的值，由useState来保存，下次调用新的计时器setInterval会在当前保存的count状态的值下再执行加一
  - 然后周而复始，清除计时器，在创建计时器+1，再清除计时器

- 解决方法2：useRef

## 1.2 useRef














