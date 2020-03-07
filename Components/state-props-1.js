// 状态上传，方法下放
// ==========================================================================================

import React,{ Component } from "react";
import Title from './Title'
import Button from './Button'

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
    render(){
        return (
            <div className="frame w-64 h-56 bg-teal-300 flex flex-col justify-center items-center">
                <Title themeColor={this.state.themeColor}></Title>
                <Button handleClick={(color)=>this.handleClick(color)}></Button>
            </div>
        )
    }
}
export default Frame

// ==========================================================================================
// 以下是 Button.js

import React, { Component } from "react";

class Button extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <button 
                onClick={()=>this.props.handleClick('red')}
                className="w-12 m-1 shadow-lg border-2 bg-gray-400"
                >Red</button>
                <button 
                onClick={()=>this.props.handleClick('blue')}
                className="w-12 m-1 shadow-lg border-2 bg-gray-400"
                >Blue</button>
            </div>
        )
    }
}
export default Button

// ==========================================================================================
// 以下是 Title.js

import React, { Component } from "react";

class Title extends Component{
    render(){
        return (
            <div 
            style={{color:this.props.themeColor}}
            className="m-6 text-3xl font-bold"
            >Title</div>
        )
    }
}

export default Title



