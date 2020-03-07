# like-1

![Mar-07-2020 14-44-38](https://user-images.githubusercontent.com/26485327/76138370-333ef380-6082-11ea-8c21-580613b3e77c.gif)

#### 功能
- 点击按钮，显示为已赞❤️，数字+1， 否则默认状态
- 点赞，取消点赞。共2种状态
  1. 点赞
      - 红色
      - ❤️
      - 数字+1
  2. 取消店在
      - 黑色
      - 数字-1


#### React思路
1. 按钮点击触发状态变更事件
2. 状态变更事件更改状态
3. 状态变更后，触发render，根据当前状态的值判断如何显示页面

### 1. 设置初始状态
  - 随机初始化点赞数
  - 默认点赞状态位false
```javascript
  constructor(props){
      super(props)
      this.state = {
          num:Math.floor(Math.random()*10),
          like: false
      }
  }
```

### 2. 绑定事件
```html
<div className="flex">
    <button onClick={()=>this.handleClick()} />
     <div className="num p-2">{this.state.num}</div>
</div>
```


### 3. 事件变更状态
```javascript
handleClick(){
    this.setState({
        like: !this.state.like
    })
}
```
状态变更后，react默认自动创新执行render()函数，重新渲染页面
### 4. 根据新状态触发重新渲染

```javascript
<div className="flex">
    <button 
    onClick={()=>this.handleClick()} 
    style={this.state.like? {color:'red'} : {color:'black'}}
    className="w-12 p-1 shadow-lg border-2"
    >
        {this.state.like? '♡': 'like'}
    </button>
    <div className="num p-2">{this.state.like? this.state.num+1 : this.state.num}</div>
</div>
```
- <button>点击后，触发`handleClick()`函数，该函数将like的状态取反
- 如果like为true
  - 变更颜色为red
  - 变更文字显示为❤️
  - 变更数字+1
- 否则
  - 颜色为black
  - 文字显示为like
  - 数字被初始化随机数字












