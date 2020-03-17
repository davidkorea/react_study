
# 状态上移，方法下放 state_props_ex2_form 

- **关键是，这个组件设置了状态，那个组件也还要拿来使用！！**
  - 主要就是一个页面上面多个子组件，每个组件都需要使用同一个状态
  - 那么这时候，就是把状态统一放到父组件，所有子组件大家一起来用
  - 如果一个状态只有一个组件来用，那么状态放在子组件内部，自己维护也可以

- 组件本身由自己的状态和方法函数，但是由于组件的嵌套，当本身变成子组件时。
  - 自己的状态需要上移变成父组件的状态
  - 自己的方法函数也需要上移到父组件，再通过参数props下传回到子组件来使用
  - 也就是自己的状态和自己的方法全部给父组件，自己在通过props重新接收回来
    - 通过接收回来的方法函数，来变更接收回来的状态
    - 表面上就像是 子组件 通过父组件传来的方法函数 来 变更父组件的状态
    - 实际上都是原来子组件自己的方法和函数！！


### 关于表单提交！！
- 放置于`<form></form>`标签内的`<button type="">`按钮，默认就是type="submit"
  - 因此`<button>`按钮的onClick事件的处理函数需要先`e.preventDefault`来取消默认的向form的action的url提交http请求的动作
  - 取消http提交的动作后，再来处理setState
  - react中`<button>`标签~~没有onSubmit函数~~，而是使用onClick函数
  - jquery也是通过`<button id="btn">`标签中的id属性先获取到该元素，调用click函数
    - 表单内的输入值也是，先根据`<input id="name" name="name">`标签的id属性获取到该元素，再获取该元素的`value`属性，即可获取到输入框的输入值
  
- 而未放置在表单内部的按钮，onClick事件的处理函数可以直接setState

# Demo

![Mar-17-2020 12-44-47](https://user-images.githubusercontent.com/26485327/76822825-20c87500-684d-11ea-833c-2fde227d6174.gif)

组件结构如下
- `App`
  - `Phone`
    - `PostCard`
    - `PostForm`
    
**关键就是，同一个状态，几个子组件都要用，因此状态放到共同的父组件！！！**

# 1. 子组件

- 其实发现了，所有子组件，自己都不用写状态。！！除非你就写了单一组件，但不存在这种项目！！
- 所需的状态全部fong父组件中创建，在接收过来展示就可以了
- 如果需要setState，那么就发方法函数也接收回来

## 1.1 子组件 PostCard

<img width="267" alt="截屏2020-03-17下午12 42 28" src="https://user-images.githubusercontent.com/26485327/76822682-c5968280-684c-11ea-8cb1-3d665bd61b4f.png">

```javascript
import React from 'react'

function PostCard(props){
    return (
        <div className="postcard border-2 shadow rounded mt-2">
            <div className="title font-bold bg-indigo-200 rounded">{props.title}</div>
            <div className="content font-light p-1 truncate">{props.content}</div>
        </div>
    )
}
export default PostCard
```


## 1.2 子组件 PostForm

<img width="267" alt="截屏2020-03-17下午12 42 48" src="https://user-images.githubusercontent.com/26485327/76822705-d0511780-684c-11ea-9ad1-cf915b6d921d.png">

```javascript

import React from 'react'

function PostForm(props){
    // const handleClick = (e)=>{
    //     e.preventDefault()
    //    // 因为输入变量是来自父组件，子组件内部不能set父组件的状态值
    // }

    return (
        <div className="postform border-2 border-indigo-200 mt-5 shadow-md">
        
            <form action="">
                <div className="name text-center bg-indigo-200">Add a new post</div>
                <div className="titleinput">
                    <div className="name">Title</div>
                    <input type="text" className="outline-none w-56 p-1 text-gray-600"
                        value={props.titleInput}
                        onChange={props.changeTitleInput}
                    />
                </div>
                
                <div className="contentinput mt-2">
                    <div className="name">Content</div>
                    <textarea className="resize-none outline-none p-1 w-56 text-gray-600" 
                        value={props.contentInput}
                        onChange={props.changeContentInput}
                    ></textarea>
                </div>
                
                <button 
                    onClick={(e)=>props.handleClick(e)}
                    className="w-20 bg-indigo-200 rounded-lg border-2"
                >Submit</button>
                
            </form>
        </div>
    )
}
export default PostForm
```
- 对于受控输入框，就是不是直接输入直接显示
  - 而是先通过onChange事件检测到输入框内容的变化，一边话就setState，把输入框的实时变化赋值给一个状态变量
  - 而输入框的显示是通过value属性来展示状态变量的值
  - **因此，这种受控输入框必须同时有value实行和onChange方法，否则报错！！**
  
- 按钮buutton，只有onClick事件，**即使在表单form里面也是通过onClick事件来调用函数取变更状态，只不过需要取消默认提交http请求的操作**


## 1.3 子组件Phone
```javascript
import React from 'react'

function Phone({children}){
    return (
        <div className="phone bg-indigo-100 flex flex-col shadow-lg p-8 overflow-scroll">
            {children}
        </div>
    )
}
export default Phone
```

# 2. 父组件 App

```javascript
import React, { useState } from 'react'
import Phone from './Phone'
import PostCard from './PostCard'
import PostForm from './PostForm'

function App() {

    const [posts, setPosts] = useState([
        {title: 'title', content: "content"},
    ]);

    const [titleInput, setTitleInput] = useState('');
    const [contentInput, setContentInput] = useState('');
    
    const handleClick = e => {
        e.preventDefault()
        setPosts(posts.concat({
            title:titleInput,
            content:contentInput
        }))
        setTitleInput('')
        setContentInput('')
    }
    
    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <Phone>
                {posts.map((v,i)=>{
                    return <PostCard title={v.title} content={v.content} key={i} />
                })}

                <PostForm
                    titleInput={titleInput}
                    contentInput={contentInput}
                    changeTitleInput={(e)=>setTitleInput(e.target.value)}
                    changeContentInput={(e)=>setContentInput(e.target.value)}
                    handleClick={(e)=>handleClick(e)}
                ></PostForm>
            </Phone>
        </div>
    )
}
export default App
```







