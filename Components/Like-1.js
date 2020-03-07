import React, { Component } from "react";

class Like extends Component{
    constructor(props){
        super(props)
        this.state = {
            num:Math.floor(Math.random()*10),
            like: false
        }
    }

    handleClick(){
        this.setState({
            like: !this.state.like
        })
    }

    render(){
        return (
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
        )
    }
}

export default Like
