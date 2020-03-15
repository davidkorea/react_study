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
























