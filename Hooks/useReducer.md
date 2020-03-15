
# useReducer

- reducer的思想源于redux，但是reducer的执行逻辑使用原生JavaScript就能实现
- reducer的核心思想就是，创建一个函数，这个函数接受2各参数，第一个为当前状态state，第二个为操作action
  - reducer函数就是根据action中提供的操作类型type来变更当前状态state，变更后生成一个新的state返回
