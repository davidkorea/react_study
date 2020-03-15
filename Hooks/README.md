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
