

# 动态加载评论

<img width="200" src="https://user-images.githubusercontent.com/26485327/76190184-5ea71700-6217-11ea-8d5b-93bfe4bc86d6.png">
<img width="200" src="https://user-images.githubusercontent.com/26485327/76190082-230c4d00-6217-11ea-8fe0-9a42e568ab29.gif">


#### - App.js
```javascript
import React, {Component} from 'react'
import Page from './Page'
import Comment from './Comment'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            idx: 3,
            dataList: [
                {name:'david', comment:'very good'},
                {name:'joyce', comment:'wow awesome!!!'}, 
                {name:'Mathew', comment:'can you send iot to me ?'},
                {name:'Honol', comment:'interesting'}, 
                {name:'Hawai', comment:'how to get the code'},
                {name:'John', comment:'lol'},
            ],
            dataListSlice:[]
        }
    }

    handleClick(){
        console.log(this.state.dataList.slice(0,this.state.idx));
        
        this.setState({
            idx: this.state.idx + 2,
            dataListSlice: this.state.dataList.slice(0,this.state.idx)
        })
    }

    render(){
        return (
            <div className='flex items-center justify-center h-screen bg-gray-100'>
                <Page length={this.state.dataList.length}>
                    {this.state.dataListSlice.map((v,i)=>(
                        <Comment name={v.name} comment={v.comment} key={i}/>
                    ))}

                    <div onClick={()=>this.handleClick()} 
                    className="loadmore select-none text-center font-light text-sm text-gray-600 mt-2 border-t-2">
                        {this.state.idx > this.state.dataList.length ? 'No more comments' : 'Load more'}      
                    </div>
                </Page>
            </div>
        )
    }
}
export default App
```


#### - Page.js


```javascript
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
```
```css
// Page.css

.page {
    width: 320px;
    height: 600px;
}

.pic {
    width: 280px;
    background-image: url('./banner.png');
    background-size: 100% 100%;
}

.article，.comment {
    width: 280px;
}
```

#### - Comment.js
```javascript

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
```





