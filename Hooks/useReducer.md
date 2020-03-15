
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



















