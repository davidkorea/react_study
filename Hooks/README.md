# Hooks

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
### Demo 定时器
#### 1. 错误
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


#### 2. 正确
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
+.     }, [count])
  
      return (
          <div>{count}</div>
      )
  }
```
- 把状态count，添加为依赖项，当依赖项变化时，调用useEffect函数，也会触发useEffect函数中处理函数的return来解绑上一个处理函数
- 给计数器函数命名，在添加return，当依赖项变化时，执行return后面的函数，来清除上一次的处理函数，也就清除了计时器setInterval

![Mar-15-2020 10-24-27](https://user-images.githubusercontent.com/26485327/76693903-313eeb00-66a7-11ea-8f99-6774529f1789.gif)





















