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


# 2. useMemo

- 当父组件中的state发生变化，则会更新父组件页面，但是父组件中父子组件默认也会被更新
- 父组件因为其内部状态变化了，理应当重新刷新页面，但是子组件中的状态没有变化，其实不需要重新渲染，但是默认也被重新刷新了
- 也就是说，子组件中的所有函数重新被执行，useEffect中的ajax/fetch也会重新请求数据





















