import React,{ Component } from "react";

class Comment extends Component{
    render(){
        return (
            <div className="item mt-2 flex">
                <img src={"https://i.pravatar.cc/100?u=%s"+Math.random()} 
                className=" border-orange-200 border-2 w-8 h-8 rounded-full" />
                <div className="main ml-3 ">
                {/* <div className="name text-gray-800">david</div> */}
                <div className="name text-gray-800 text-sm">{this.props.name}</div>
                    <div className="content truncate w-56 flex-wrap break-alltext-gray-800 text-xs font-light">
                    {/* looking for funding added 905 packages from 610 contributors and audited 9438 packages in 31.842s */}
                    {this.props.comment}
                    </div>
                </div>
            </div>
        )
    }
}
export default Comment