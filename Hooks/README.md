# Hooks

# 1. useEffect

- useEffect如果需要使用定时器，一定要用setTimeout！！！**切记不要使用setInterval！！**


# 2. useMemo

- 当父组件中的state发生变化，则会更新父组件页面，但是父组件中父子组件默认也会被更新
- 父组件因为其内部状态变化了，理应当重新刷新页面，但是子组件中的状态没有变化，其实不需要重新渲染，但是默认也被重新刷新了
- 也就是说，**子组件中的所有方法函数都会重新被执行**，useEffect中的ajax/fetch也会重新请求数据





















