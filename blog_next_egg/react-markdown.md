
# react-markdown

- marked + highlight.js 
- [rexxars/react-markdown](https://github.com/rexxars/react-markdown)
- [parksben/markdown-navbar](https://github.com/parksben/markdown-navbar)

1. `cnpm install --save react-markdown`

2. `cnpm install --save markdown-navbar`

3. Usage

```javascript
import ReactMarkdown from 'react-markdown'
import MarkdownNav from 'markdown-navbar'
import 'markdown-navbar/dist/narbar.css'
import { Affix } from 'antd'



let text = ' # P01:课程介绍和环境搭建\n - hi \n -hey \n' 
    
<div className="content">
    <ReactMarkdown
        source={text}
        escapeHtml={false}
    ></ReactMarkdown>
</div>

<Affix offsetTop={1}>
  <div className="navbar">
      <div className="nav-title">Chapter</div>
      <MarkdownNav
          className="nav-item"
          source={text}
      ></MarkdownNav>
  </div>
</Affix>
```
