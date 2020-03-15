
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
##### - 无论useEffect中是否有依赖项，都有问题
  - 每次setCount一次，状态count变化一次，音儿组件update一次，**一旦更新，useEffect又会被执行（didMoungt，didUpdate）**...
  - 改变状态是在useEffect计时器setInterval里面，每1s就变化一次，也就是每1s更新一次组件，也就是每1s调用一次useEffect，也就每一秒都创建一个新的计时器setInterval
  - 这样就无线循环，就会有无数多个计时器setInterval，出现错乱
    - 如果不是定时器自动+1，而是按钮触发事件来+1，就不会由这种无线死循环的现象
    - 因为执行+1实在事件函数里面，而不是useEffect每次更新组件都会被触发，而是点击时才会触发
    
##### - 那么依赖项空着不写也不对，依赖项写上状态count也不对，那么使用空数组[]，来设置仅首次加载执行useEffect
```javascript
useEffect(() => {
    console.log('hi');
    const timer = setInterval(() => {
        setcount(count + 1)
        console.log(count)   // 不受外层useEffect控制，一直执行每1s加一
    }, 1000);
},[]);
```
- 可以看到，页面的渲染只会执行一次+1，也就是从初始值0变化到1，页面不在显示变化了
    - 因为这次是首次加载调用的useEffect
- 但是log中会一直打印count值，只不过每次打印输出的都是0，而没有+1
    - 也就是说，由于空数组[]依赖项的设置，外层的useEffect虽然仅在加载时执行一次
    - 但是内层的setInterval依然不停的在执行，每1s打印一次


##### - 解决方法1：设置依赖项为状态count，以及设置return
  - 每次状态变化，都会调用return来清除当前的计时器setInterval，下次重新在创建
  - 而状态count里面的值，由useState来保存，下次调用新的计时器setInterval会在当前保存的count状态的值下再执行加一
  - 然后周而复始，清除计时器，在创建计时器+1，再清除计时器

##### - 解决方法2：useRef

## 1.2 useRef

- `const ref = useRef(initialValue)`
- 创建一个ref来实时跟踪count状态，count一变化，立马赋值给ref
- useEffect设置仅加载执行一次，也就是设置依赖项为空数组[]
    - 计时器中setcount(ref.current + 1)，

```javascript
import React, { useState, useRef, useEffect } from 'react'

function Ex7(){

    const [count, setcount] = useState(0);
    const countref = useRef(null)

    // ref数值完全跟随count的数值
    useEffect(() => {
        countref.current = count
        console.log('countref.current: ',countref.current);
    }, [count]);

    useEffect(() => {
        console.log('hi');
        const timer = setInterval(() => {
            setcount(countref.current+1)
        }, 1000);
    },[]);

    return (
        <div>
            <div>{count}</div>
            <button></button>
        </div>
    )
}
export default Ex7
```
- 因为依赖项为空数组[]，useEffect仅仅在组件首次加载时执行一次，
    - 之后setInterval自己继续执行，但是count的值一直被记录为初始值0，**即使count已经+1，useEffect也只使用count的初始值0**
- 但是countref.current不一样
    - setcount(countref.current + 1)，把count设置+1后，countref.current马上跟随+1
    - 之后count重置为0
    - 完了... 我也搞不明白了？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？反正这样做是对的











