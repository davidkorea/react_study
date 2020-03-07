
- [DOM元素 - onChange](https://react.docschina.org/docs/dom-elements.html#onchange)
  - 文档中没有提及`onInput`事件，只有`onChange`，虽然一些教程中使用了`onInput`，目前测试onInput会报错
  
# React获取原生对象，受控组件

- input控件不直接显示输入内容，而是以react的方式，控件触发onChange事件后，有onChangeHandler函数去改变this.state的状态。状态发生变化后react会自动触发render函数去重新渲染页面

- 因此需要给input控件绑定`onChange`事件，该事件调用函数`onChange={(e)=>this.handleChange(e)}`，参数e是自动返回的参数对象，可以在这个对象中找到input的原生html对象
- `handleChange(e)`函数在拿到参数e后，通过`e.target.value`将输入框的输入内容取出。取出后将该输入内容赋值给状态`this.state.text`，当状态变更后，react会自动触发render函数重新渲染页面
- 因此需要在渲染的时候，给input控件传递参数value用于在输入框中显示内容`<input value={this.state.text}>`
  - 此处即为不同支出，这里input输入框显示的内容时经过状态处理后的内容，是一个**受控控件**，state设置什么，input就显示什么
  - 当时需要实时显示键盘输入，就将state设置为从input控件中获取的value值，再通过input的value属性将该值显示在输入框中
  - 如果需要特殊处理，那么把`this.state.text`设置为什么值，那么输入框就显示什么值
  - 也可以先获取到输入框的输入内容，判断长度是否大于10个字符，超过则禁止输入，通过state来控制。而实际上`e.target.value`依然能获取到输入的值，只不过不更新state，也就不能中心选人页面，也就不能继续显示超过10个的字符

![Mar-07-2020 17-13-09](https://user-images.githubusercontent.com/26485327/76140579-f4ffff00-6096-11ea-9abf-3d8d210e7e76.gif)


```javascript
import React, { Component } from "react";

class Input extends Component{
    constructor(props){
        super(props)
        this.state = {
            text:''
        }
    }

    handleChange(e){
        console.log(e.target.value);
        if(e.target.value.length > 10){
            return
        }else{
            this.setState({
                text: e.target.value
            })
        }
    }

    render(){
        return (
            <div>
                <input 
                value={this.state.text}
                onChange={(e)=>this.handleChange(e)} 
                type="text" className="shadow-lg outline-none"/>
            </div>
        )
    }
}

export default Input

```
