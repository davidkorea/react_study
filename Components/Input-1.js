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
