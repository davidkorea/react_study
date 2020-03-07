# React获取原生对象

- input控件不直接显示输入内容，而是以react的方式，控件触发onChange事件后，有onChangeHandler函数去改变this.state的状态。状态发生变化后react会自动触发render函数去重新渲染页面

- 因此需要给input控件绑定`onChange`事件，该事件调用函数`onChange={(e)=>this.handleChange(e)}`，参数e是自动返回的参数对象，可以在这个对象中找到input的原生html对象
- `handleChange(e)`函数在拿到参数e后，通过`e.target.value`将输入框的输入内容取出。取出后将该输入内容赋值给状态`this.state.text`，当状态变更后，react会自动触发render函数重新渲染页面
- 因此需要在渲染的时候，给input控件传递参数value用于在输入框中显示内容`<input value={this.state.text}>`
  - 此处即为不同支出，这里input输入框显示的内容时经过状态处理后的内容，是一个受控控件，state设置什么，input就显示什么
  - 当时需要实时显示键盘输入，就将state设置为从input控件中获取的value值，再通过input的value属性将该值显示在输入框中
  - 如果需要特殊处理，那么把`this.state.text`设置为什么值，那么输入框就显示什么值
