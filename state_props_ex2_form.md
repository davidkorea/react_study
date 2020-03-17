
# state_props_ex2_form

### 关于表单提交！！
- 放置于`<form></form>`标签内的<button type="">按钮，默认就是type="submit"
  - 因此<button>按钮的onClick事件的处理函数需要先`e.preventDefault`来取消默认的向form的action的url提交http请求的动作
  - 再来处理setState
  - react中<button>标签~~没有onSubmit函数~~，而是使用onClick函数
  - jquery也是通过<button id="btn">标签中的id属性先获取到该元素
    - 表单内的输入值也是，先根据<input id="name" name="name">标签的id属性获取到该元素，再获取该元素的`value`属性，即可获取到输入框的输入值
  
- 而未放置在表单内部的按钮，onClick事件的处理函数可以直接setState
