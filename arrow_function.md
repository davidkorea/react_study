# ES6箭头函数


## 2. 作用域

### 2.1 react组件中的箭头函数

```javascript

class Demo extends Component{
  constructor(props){
    super(props)
    this.state = {
      text: ''
    }
  }
  
  handleClick(){
    this.setState({
      text: 'hi'
    })
  }
  
  render(){
    return (
        <button onClick={ ()=>this.handleClick() }> // 箭头函数中的this指向Demo
          {this.state.text}
        </button>  
    )
  }
}
```

- **箭头函数在哪个对象中使用，箭头函数中的this就指向哪个对象，此处就是Demo类**
- 如果此处不使用箭头函数，那么`<div onClick={function(){this.handleClick()}}></div>`里面的this会指向`<div>`标签
  - 因为在jsx语法中，html的`<div>`标签会被转换为`React.createElement`元素，因此会丢失this作用域
  - 不使用箭头函数，也想正常使用this的话，需要在constructor里面设置`this.handleClick.bind(this)`





### 2.2 示例
创建一个对象obj，包含一个属性name和一个方法f。在函数方法中使用setTimeout()函数，在100ms后显示该obj的name属性的值

#### 1. ES5
```javascript
obj = {
  name: 1,
  f1: function(){
    setTimeout(function(){
      console.log(this.name)
    }, 100)
  },
  f2: function(){
    var me = this
    setTimeout(function(){
      console.log(me.name)
    }, 100)
  }
};

obj.f1();   // 空
obj.f2();   // 1
```
- 由于setTimeout函数是window调用的`window.setTimeout()`，因此在这个setTimeout函数内部打印this.name是打印不出obj对象的name属性
- 可以在调用setTimeout函数之前，将obj对象的this赋值给另一个变量`me`，再在setTimeout函数中打印`me.name`才可以打印出obj对象的name属性的值


#### 2. ES6 箭头函数
**this在哪个对象中被调用，this就代指哪个对象**

```javascript
obj = {
  name: 2
  f: function(){
    setTimeout(
      ()=>{
        console.log(this.name)
      }, 100)
  }
};
obj.f();    // 2
```
- 即使在`window.setTimeout`函数里面调用this，this依然指向当前被调用的对象obj




## 1. 示例
1. 多参数，单代码
```javascript
var add = function(a, b){
  return a + b
}
```

```javascript
var add = (a, b) => {
  return a + b
}
```
```javascript
var add = (a, b) => a + b
```
- 由于函数体只有单句代码，因此可以省略`return`关键字以及函数体花括号`{}`

2. 单参数，单代码
```javascript
var square = function(a){
  return a * a
}
```


```javascript
var square = (a) => a * a
```
```javascript
var square = a => a * a
```
- 单一参数，可以省略参数的括号`()`，多参数时需要使用括号






