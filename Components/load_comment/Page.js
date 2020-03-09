import React, { Component, Children } from "react";
import './Page.css'

class Page extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="page p-4 flex flex-col justify-start items-center bg-gray-200 rounded-lg shadow-lg">
                <div className="pic h-40 m-1 shadow-lg rounded"></div>
                <div className="article h-40 m-1 p-2 break-all text-md font-thin border-b-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Consequatur doloribus natus labore omnis commodi beatae, 
                    sit dolorem ullam! Dicta nam dolorem numquam natus 
                    labore omnis commodi beatae dolorem.
                </div>
                <div className="comment h-56 flex flex-col">
                    <div className="mt-2 font-bold text-gray-800">Comment ({this.props.length})</div>
                    <div className="list overflow-scroll">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Page