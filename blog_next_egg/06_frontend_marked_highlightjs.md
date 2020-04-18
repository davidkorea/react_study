# marked + highlight.js

`react-markdown`不是很好用，配置项太少了 [react-markdown](https://github.com/davidkorea/react_study/blob/master/blog_next_egg/react-markdown.md)

# 1. install

```
cnpm install --save markedyarn add highlight.js
cnpm install --save highlight.js
```

# 2. usage

```javascript
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'


const Detail = (propsData) => {

  const renderer = new marked.Renderer()  // 渲染器没有锚链接，不能用于生成目录！！！！
  marked.setOptions({
    renderer:renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    highlight: (code)=>{
      return hljs.highlightAuto(code).value
    }
  })
  
  let blog = propsData.data[0]      // 用于解析目录，以及显示标题、时间等信息
  let blog_content = marked(propsData.data[0].article_content)  // 解析后的文本不能再用于生成目录

  return (
  
    <div className="content" dangerouslySetInnerHTML={{__html:blog}}></div>
  )
}
```
- 添加解析后的markdown文本时，需要再div的dangerouslySetInnerHTML属性中使用，而 不能直接在标签中间插入，否则无法正常显示解析后的文本

- renderer: 这个是必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
- gfm：启动类似Github样式的Markdown,填写true或者false
- pedatic：只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
- sanitize: 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
- tables： 支持Github形式的表格，必须打开gfm选项
- breaks: 支持Github换行符，必须打开gfm选项，填写true或者false
- smartLists：优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
- highlight: 高亮显示规则 ，这里我们将使用highlight.js来完成


# 3. markdwon css

由markdown被解析后，代码块会生成pre标签，因此要对pre的css样式进行设置

```css
.content img {
    /* width: 100%; 设置100%后，所有图片都被拉伸，低像素图片导致模糊！！！ */   
    border: 1px solid #f3f3f3;
}

pre {
    display: block;
    background-color: #f3f3f3;
    padding: .5rem !important;
    overflow-y: auto;
    font-weight: 300;
    font-family: Menlo, monospace;
    border-radius: .3rem;
}

pre {
    background-color: #283646 !important;
}

pre>code {
    border: 0px !important;
    background-color: #283646 !important;
    color: #FFF;
}

code {
    display: inline-block;
    background-color: #f3f3f3;
    border: 1px solid #fdb9cc;
    border-radius: 3px;
    font-size: 12px;
    padding-left: 5px;
    padding-right: 5px;
    color: #4f4f4f;
    margin: 0px 3px;
}
```

# 4. markdown目录解析
1. `markdown-navbar`，若使用此包解析，需要使用未进行marked转化的raw text！！！！！
2. tocify？？？ 麻烦


