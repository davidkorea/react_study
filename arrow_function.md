# ES6箭头函数

## 示例
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






