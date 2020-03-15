
# useContext
- 父子组件传值，代替class组件中的props，虽然function组件也有props
- 将父组件中的值（state的值）共享出去，给子组件使用
- 就像useState一样，给每个变量（每个状态）单独创建一个useState
  - context也一样，想共享哪个变量，给哪个变量创建一个createContext，相当于创建了一个组件，不能放在组件函数里面创建，要放在外面创建
  - 将这个reateContext从父组件中传递给子组件
- 在子组件中，在用useContext来调用传过来的变量


