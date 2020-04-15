

# marked + highlight.js

`react-markdown`不是很好用，配置项太少了

1. install

```
cnpm install --save markedyarn add highlight.js
cnpm install --save highlight.js
```

2. usage

```javascript
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'


const Detail = (propsData) => {

  const renderer = new marked.Renderer()
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
  
  let blog = marked(propsData.data[0].article_content)


  return (
  
    <div className="content"dangerouslySetInnerHTML={{__html:blog}}></div>
  )
}
```
