# Hooks

## 1. useEffect]

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
#### Demo 定时器
##### 1. 错误
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





