
# router & link

- 所有在pages目录下的js文件，都会被next自动路由
  - 使用时，无需import，直接填写文件路径即可，如`<Link href='page1'><a>page1</a><Link>`
  - 该href中的路径回显示为浏览器中的url
- 由于文件名直接作为url路径，而一般url都是小写字母，所以pages下面的**页面文件用小写字母命名**

# 1. Link
- 从next/link 中引入Link
- Link标签下必须嵌套 一个a标签
- a标签无需href参数，而**Link标签需要href参数**
- 如需引入响应路径的页面组件，因为next自动将pages目录下的页面组件路由好了

```javascript
import Link from 'next/link'

function Index(){
  return (
     <div>
      <Link href="/page1/"><a>page1</a></Link>
      <Link href="/page2/"><a>page2</a></Link>
    </div>
  )
}

export default Index
```


# 2. Router.push

