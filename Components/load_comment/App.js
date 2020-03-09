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
                    {/* <Comment></Comment>
                    <Comment></Comment>
                    <Comment></Comment> */}
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