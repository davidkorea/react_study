
# Blog Next + Egg

- frontend，博客页面展示
- middle，数据查询接口
- backend，博客发布后台




# frontend

#### 1. 创建nextapp项目
`npx create-next-app blog1`, `cd blog1`, `yarn dev`

#### 2. 清理无用代码 pages/index.js，
```javascript
import Head from 'next/head'

const Home = () => (
    <Head>
      <title>Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
)
export default Home
```

#### 3. 安装支持import css的包
next默认不支持导入css样式文件 
1. `cnpm install --save @zeit/next-css`
2. 项目根目录下，创建配置文件`next.config.js`
```javascript
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
  require.extensions['.css']=file=>{}
}

module.exports = withCss({})
```

#### 4. 设置按需加载ant design 
1. 安装antd库， `cnpm install --save antd`

2. 安装按需加载库`cnpm install --save babel-plugin-import`
3. 设置antd按需加载，项目根目录建立`.babelrc`文件
```
{
  "presets":["next/babel"],  //Next.js的总配置文件，相当于继承了它本身的所有配置
  "plugins":[     //增加新的插件，这个插件就是让antd可以按需引入，包括CSS
      [
          "import",
          {
              "libraryName":"antd"
          }
      ]
  ]
}
```

4. 设置全局引入 antd css，创建pages/_app.js
```javascript
// pages/_app.js

import App from 'next/app'   // 引入App
import 'antd/dist/antd.css'

export default App
```
5. 重启服务，否则按需加载的配置`.babelrc`无法生效
```
yong@MacBookPro blog1 % yarn dev
yarn run v1.22.0
$ next dev
[ wait ]  starting the development server ...
[ info ]  waiting on http://localhost:3000 ...
Warning: Built-in CSS support is being disabled due to custom CSS configuration being detected.
See here for more info: https://err.sh/next.js/built-in-css-disabled

> Using external babel configuration
> Location: "/Users/yong/Desktop/blog_next_egg/frontend/blog1/.babelrc"
[ ready ] compiled successfully - ready on http://localhost:3000
[ event ] build page: /next/dist/pages/_error
[ wait ]  compiling ...
[ ready ] compiled successfully - ready on http://localhost:3000
[ event ] build page: /
[ wait ]  compiling ...
[ ready ] compiled successfully - ready on http://localhost:3000
```

6. 测试antd引入是否成功
```javascript
import Head from 'next/head'
import {Button} from 'antd'

const Home = () => (
    <div>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button>Click</Button>           // 添加一个antd的按钮，查看样式正常
    </div>
)

export default Home
```

<img width="240"  src="https://user-images.githubusercontent.com/26485327/79198458-16a69000-7e66-11ea-9b6e-86ee3c3d0982.png">
































