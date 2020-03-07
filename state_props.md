# state & props


# 1. state 
#### 规则
1. state只能在组件的·constructor·中初始化
2. state只能使用`setState`方法来更新数据
3. `setState`会导致`render`重新执行，渲染组件和**子组件**，子组件更新不会更新父组件（需要探索效率问题）


# 2. props 父->子组件间参数传递 
props 无需定义，可直接使用

### 1. 组件 单标签传递参数
```JavaScript
import Box from './Box'

class Page extend Component{
  ...
  
  render(){
    return (
      <div>
        <Box title="myBox" />
      </div>
    )
  }
}
```
- 父组件Page
- 子组件Box
- 在父组件里面引入了子组件<box />，可以通过添加属性的方式添加一个或多个属性
  - `<Box title="myBox" name="hi" />`
- 在子组件里面可以通过`this.props.title`或`this.props.name`来接受翻父组件传进来的参数

### 2. 组件 双标签传递参数

> **注意**：是将一个自定义的**组件标签拆开**，并放入其他组件标签来使用。而不是把普通html标签拆开放入自足见。因为html标签本来就可以拆开放子组件

```JavaScript
import Box from './Box'
import Tag from './Tag'
class Page extend Component{
  ...
  
  render(){
    return (
      <div>
        <Box title="myBox">               // 自定义组件标签拆开，而不是html标签拆开
          <span>this is a span</span>
          <Tag tagname="tag">this is a Tag Component</Tag>
        </Box>
      </div>
    )
  }
}
```
- 既可以像以前一样，在子组件里面使用`this.props.title`来获取属性
- 也可以使用`this.props.children`来原封不动的获取所有的子标签
  - 即返回两个标签，一个hmtl原生标签span，一个自定义组件标签Tag，可用于直接显示在页面中
    ```html
    <span>this is a span</span>
    <Tag>this is a Tag Component</Tag>
    ```
  - 在Box子组件中，不想原封不动回去子组件的html时，可以使用`this.props.children[1].props.tagname`来获取子元素的具体某个属性的值
    - 级联使用props。因为children拿到的是一个数组，里面每个元素都是插入到父元素里面的子元素，第一个元素为span，第二个元素为Tag
    - 要拿到第二个子元素的属性值，需要2使用props
  - 在Tag子组件中，直接使用`this.props.tagname`即可回去该参数的值
  
- 但是子标签中的自定义组件标签可以继续传递参数，而原生html标签则不可以之间传递参数
  - `<span mytitle='myspan'>this is a span</span>`会报错


### 3. 示例

- App
  - Frame
    - Like
    - Input

> **把一个自定义组件拆开，在放入其他子组件。即把`<Frame />`组件拆开`<Frame>  </Frame>`，并在其中放入其他子组件**
> **FATHER.props.children[0].props.ATTRI**，子元素的属性值获取方法

<img width="1100" src="https://user-images.githubusercontent.com/26485327/76142009-59758b00-60a4-11ea-8a5b-bd6f47577cbd.png">


```javascript
// App
import React from 'react'
import Like from './Like'
import Input from './Input'
import Frame from './Frame'

function App() {
    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <Frame name="frame">
                <Like name="like"></Like>
                <Input name="input"></Input>
                <div>Frame Component in the App</div>
            </Frame>
        </div>
    )
}
export default App
```

```javascript
// Frame
import React,{ Component } from "react";

class Frame extends Component{
    render(){
        console.log('frame: ', this.props);               // children=[{Like},{Input},{div}]
        console.log(this.props.children[0].props.name);   // children的第一个元素的props的name属性

        return (
            <div className="frame w-64 h-56 bg-teal-300 flex flex-col justify-center items-center">
                {this.props.children}
            </div>
        )
    }
}
export default Frame
```

```javascript
// Like
render(){
        console.log('like: ',this.props);
        
        return (
            <div className="flex m-4">
              ...
            </div>
        )
    }
```


```javascript
// Input

 render(){
        console.log('input: ',this.props);

        return (
            <div>
              ...
            </div>
        )
    }
```






