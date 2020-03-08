# 状态上传 + 方法下放 示例文本编辑器

# text-editor-2
![Mar-07-2020 22-52-27](https://user-images.githubusercontent.com/26485327/76145651-5db2a000-60c6-11ea-8395-8be4856f4e88.gif)

- App.js
```javascript
import React from 'react'
import Frame from './Frame'

function App() {
    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <Frame name="frame">
            </Frame>
        </div>
    )
}
export default App
```

- Frame.js
```javascript
import React,{ Component } from "react";
import TextArea from './TextArea'
import Options from './Options'

class Frame extends Component{
    constructor(props){
        super(props)
        this.state = {
            themeColor: ''
        }
    }

    handleClick(color){
        this.setState({
            themeColor:color
        })
    }

    changeStyle(fontsize,align){
        console.log(fontsize,align);
        this.setState({
            fontSize:fontsize,
            align:align
        })
    }
    render(){
        return (
            <div className="frame w-64 h-56 bg-teal-300 flex flex-col justify-center items-center">
                <TextArea 
                  fontSize={this.state.fontSize} 
                  align={this.state.align}>
                </TextArea>
                <Options 
                  fontSize={this.state.fontSize} 
                  align={this.state.align}
                  changeStyle={(fontsize,align)=>this.changeStyle(fontsize,align)}>
                </Options>
            </div>
        )
    }
}
export default Frame
```

- Options.js
```javascript
import React, { Component } from "react";

class Options extends Component{
    render(){
        return (
            <div className="flex justify-between w-56 border-teal-400 border-2 shadow-lg bg-teal-200">
                {/* <div onClick={()=>this.props.changeStyle('12px', '')} 
                    第二个参数不能留空，否则每次都清空对齐样式*/}
                <div onClick={()=>this.props.changeStyle('12px', this.props.align)}
                  className="sm m-1 mr-2">aa</div>
                <div onClick={()=>this.props.changeStyle('22px',this.props.align)}
                  className="md m-1 mr-2">aA</div>
                <div onClick={()=>this.props.changeStyle('32px',this.props.align)}
                  className="lg m-1 mr-2">AA</div>
                <div onClick={()=>this.props.changeStyle(this.props.fontSize,'center')} 
                  className="middle m-1 mr-2">三</div>
                <div onClick={()=>this.props.changeStyle(this.props.fontSize,'left')} 
                  className="left m-1 mr-2">←</div>
                <div onClick={()=>this.props.changeStyle(this.props.fontSize,'right')} 
                  className="right m-1 mr-2">→</div>
            </div>
        )
    }
}
export default Options
```

- TextArea.js
```javascript
import React, { Component } from "react";

class TextArea extends Component{
    render(){
        return (
            <div>
                <textarea 
                  style={{fontSize:this.props.fontSize, textAlign:this.props.align}}
                  placeholder="write something funny here..."
                  className="w-56 h-40 p-2 bg-teal-100 resize-none outline-none">
                </textarea>
            </div>
        )
    }
}
export default TextArea
```
